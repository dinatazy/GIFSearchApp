import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, FlatList } from 'react-native';
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

  }, [])

  const fetchGifs = async (q) => {
    const params = {
      q,
      api_key: 'BvFV6zTeyxB9U8Y4SZsxL0Hn3MmHkuXq'
    }
    await dispatch(getSearchResults(params));
  }

  const getResults = (text) => {
    fetchGifs(text);
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
          contentContainerStyle={styles.listContainer}
          data={gifList}
          renderItem={(item) => renderGifItem(item)}
          keyExtractor={(item) => item.id}
          numColumns={2}
          // onEndReached={() => incrementPage()}
          //ListFooterComponent={renderFooter()}
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
