import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';
import { Header } from '../../component/header/Header'
import { SearchBar } from '../../component/search-bar/SearchBar'
import { getSearchResults } from '../../redux/action/Search'
import { useDispatch, useSelector } from 'react-redux';

const GIFSearch = ({ navigation }) => {

  const { theme } = useTheme();
  const dispatch = useDispatch();

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
    fetchGifs();
  }, [])

  const fetchGifs = async () => {
    const params = {
      q: 'hi',
      api_key: 'BvFV6zTeyxB9U8Y4SZsxL0Hn3MmHkuXq'
    }
    console.log('before calling api')
    await dispatch(getSearchResults(params));
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    }
  });

  return (
    <View style={styles.container}>
      <SearchBar />
    </View>
  )


}

export { GIFSearch }
