import React from 'react';
import { SearchBar } from 'react-native-elements';
import { WHITE, WHITE_2 } from '../../constants/style';

const styles = {
  containerStyle: {
    backgroundColor: WHITE,
  },
  inputStyle: {
    borderRadius: 50,
    backgroundColor: WHITE_2,
  },
};


const SearchInput = (props) => {
  const {
 onChangeText, value, showLoadingIcon, placeholder 
} = props;
  const clearIcon = value.length === 0 ? null : { name: 'clear' };
  const loading = !!showLoadingIcon;

  return (
    <SearchBar
      lightTheme
      showLoadingIcon={loading}
      placeholder={placeholder}
      icon={{ name: 'search' }}
      clearIcon={clearIcon}
      containerStyle={styles.containerStyle}
      inputStyle={styles.inputStyle}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

export { SearchInput };
