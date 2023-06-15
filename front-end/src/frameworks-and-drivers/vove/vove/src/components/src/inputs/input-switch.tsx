import { Color } from '@front-end/shared/utils';
import { Switch } from 'react-native';
import React, { useState } from 'react';

export interface InputSwitchProps {
  readonly onChangeValue?: any;
  readonly defaultValue: boolean;
}

export const InputSwitch = (props: InputSwitchProps) => {
  // TODO: Check binding later
  const [value, setValue] = useState(props.defaultValue);
  const toggleSwitch = () => setValue((previousState) => !previousState);

  return (
    <Switch
      trackColor={{ false: Color.grey_60, true: Color.primary_60 }}
      thumbColor={value ? Color.primary_100 : Color.grey_100}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={value}
    />
  );
};
