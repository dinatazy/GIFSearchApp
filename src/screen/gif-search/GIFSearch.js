import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';
import { Header } from '../../component/header/Header'
import { SearchBar } from '../../component/search-bar/SearchBar'
import { GifItem } from '../../component/gif-item/GifItem'
import { getSearchResults } from '../../redux/action/Search'
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce'

const GIFSearch = ({ navigation }) => {

  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { gifList } = useSelector((state) => state.search);
  const [offset, setOffset] = useState(0)
  const [countPerPage] = useState(20)
  const [totalCount, setTotalCount] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
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
      debouncedFetchGifs(searchText);
    }
  }, [searchText])

  const debouncedFetchGifs = useCallback(debounce((q, offset = 0) => {
    fetchGifs(q, offset)
  }, 500), [])

  const fetchGifs = async (q, offset) => {
    const params = {
      q,
      offset,
      limit: countPerPage,
      api_key: 'BvFV6zTeyxB9U8Y4SZsxL0Hn3MmHkuXq'
    }
    try {
      offset == 0 ? setIsLoading(true) : setIsLoadingMore(true)
      const response = await dispatch(getSearchResults(params)).unwrap();
      offset == 0 ? setIsLoading(false) : setIsLoadingMore(false)
      if (response.ok) {
        let { total_count } = response.pagination
        setTotalCount(total_count)
      }
    } catch (err) {
      // error
      offset == 0 ? setIsLoading(false) : setIsLoadingMore(false)
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
    await fetchGifs(searchText, offset);
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

  const renderEmptyList = () => {
    if (gifList.length == 0 && !isLoading) {
      return (
        <View style={styles.emptyList}>
          <Text style={styles.emptyListText}>No search results</Text>
        </View>
      )
    }
  }

  const renderLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color="black"
          />
        </View>
      )
    }
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
    },

    emptyList: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    emptyListText: {
      fontSize: 15,
    },

    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },

  });

  return (
    <View style={styles.container}>
      {renderSearchBar()}
      {renderGifs()}
      {renderEmptyList()}
      {renderLoading()}
    </View>
  )
}

export { GIFSearch }
