import React from 'react';
import { Card as RNECard } from 'react-native-elements';

const Card = props => (
  <RNECard>
    {props.children}
  </RNECard>
);

export { Card };

