import React, { useState } from 'react';
import { SearchBar as SearchBarComponent } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';

const SearchBar = ({ getResults }) => {

  const { theme } = useTheme();
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
    getResults(search)
  };

  const styles = StyleSheet.create({

    container: {
      margin: 10,
    },

    searchbarContainer: {
      padding: 0,
      backgroundColor: 'white',
      borderTopWidth: 0,
      borderBottomWidth: 0,
    },

    searchbarInputContainer: {
      backgroundColor: theme.colors.primary,
      height: 40,
    }

  });

  return (
    <View style={styles.container}>
      <SearchBarComponent
        containerStyle={styles.searchbarContainer}
        inputContainerStyle={styles.searchbarInputContainer}
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        round
      />
    </View>
  );
};

export { SearchBar };