import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';
import { Header } from '../../component/header/Header'
import { SearchBar } from '../../component/search-bar/SearchBar'
import { GifItem } from '../../component/gif-item/GifItem'
import { getSearchResults } from '../../redux/action/Search'
import { useDispatch, useSelector } from 'react-redux';

const GIFSearch = ({ navigation }) => {

  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { gifList } = useSelector((state) => state.search);
  const [offset, setOffset] = useState(0)
  const [countPerPage, setCountPerPage] = useState(20)
  const [totalCount, setTotalCount] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: ({ navigation }) => (
        <Header
          title='GIF Search'
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (offset > 0) {
      loadMoreGifs();
    }
  }, [offset])

  useEffect(() => {
    if (searchText.length >= 3) {
      fetchGifs(searchText, offset);
    }
  }, [searchText])

  const fetchGifs = async (q, offset) => {
    const params = {
      q,
      offset,
      limit: countPerPage,
      api_key: 'BvFV6zTeyxB9U8Y4SZsxL0Hn3MmHkuXq'
    }
    try {
      const response = await dispatch(getSearchResults(params)).unwrap();
      if (response.ok) {
        let { total_count } = response.pagination
        setTotalCount(total_count)
      }
    } catch (err) {
      // error
    }
  }

  const getResults = (text) => {
    setSearchText(text);
    setOffset(0);
  }

  // setting the next page number
  const incrementPage = () => {
    if (!isLoadingMore && totalCount > offset) {
      setOffset(offset + countPerPage);
    }
  }

  const loadMoreGifs = async () => {
    setIsLoadingMore(true);
    await fetchGifs(searchText, offset);
    setIsLoadingMore(false);
  }

  const renderFooter = () => {
    if (isLoadingMore) {
      return (
        <ActivityIndicator style={styles.loadMore} size="small" color={'black'} />
      )
    }
  }
  const renderGifItem = ({ item }) => {

    return (
      <GifItem item={item} />
    )
  }

  const renderGifs = () => {
    if (gifList.length > 0) {
      return (
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={gifList}
          renderItem={(item) => renderGifItem(item)}
          keyExtractor={(item) => item.id}
          numColumns={2}
          onEndReached={() => incrementPage()}
          ListFooterComponent={renderFooter()}
          extraData={gifList}
        />
      )
    }
  }

  const renderSearchBar = () => {
    return (
      <SearchBar getResults={getResults} />
    )
  }

  const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    },

    contentContainer: {
      paddingBottom: 60
    },

    loadMore: {
      alignSelf: 'center'
    }

  });

  return (
    <View style={styles.container}>
      {renderSearchBar()}
      {renderGifs()}
    </View>
  )
}

export { GIFSearch }
