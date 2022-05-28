import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Header as HeaderRNE } from '@rneui/themed';

const Header = ({ title }) => {

  return (
    <HeaderRNE
      containerStyle={styles.headerContainer}
      leftComponent={<View />}
      rightComponent={<View />}
      centerComponent={{ text: title, style: styles.heading }}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#246EE9',
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export { Header };