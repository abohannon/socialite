import React from 'react';
import { Button as RNEButton } from 'react-native-elements';

const styles = {
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
};

const primaryProps = {
  backgroundColor: '#03a9fa',
};

const Button = (props) => {
  const {
    onPress, icon, children, ...rest
  } = props;
  return (
    <RNEButton
      icon={icon}
      title={children}
      {...styles}
      {...primaryProps}
      {...rest}
      onPress={() => onPress()}
    />
  );
};

export { Button };

