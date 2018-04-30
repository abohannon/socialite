import React from 'react';
import { Button as RNEButton } from 'react-native-elements';
import { PURPLE } from '../../constants/style';

const styles = {
  buttonStyle: {
    borderRadius: 50,
    marginBottom: 0,
  },
  containerViewStyle: {
    marginLeft: 0,
    marginRight: 0,
  },
};

const primaryProps = {
  backgroundColor: PURPLE,

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

