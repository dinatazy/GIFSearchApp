import React, { useState } from 'react';
import { Image } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';


const GifItem = ({ item }) => {

  const styles = StyleSheet.create({

    container: {
      flex: 1,
      marginBottom: 5,
      marginHorizontal: 5
    },

    gif: {
      height: 100,
      width: null,
    }

  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.gif}
        resizeMode='contain'
        source={{ uri: item.images.downsized.url }}
      />
    </View>
  );
};

export { GifItem };