import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';
import { Header } from '../../component/header/Header'

const GIFSearch = ({navigation}) => {

  const { theme } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: ({ navigation }) => (
        <Header
          title='GIF Search'
        />
      ),
    });
  }, [navigation]);



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    }
  });

  return (
    <View style={styles.container}>
      
    </View>
  )


}

export { GIFSearch }
