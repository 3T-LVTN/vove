import * as React from 'react';
import {KeyboardTypeOptions, StyleSheet, Text, View} from 'react-native';
import {Searchbar, TextInput} from 'react-native-paper';
import { Color, ScreenSize, TextStyle } from '@front-end/shared/utils';
import {SearchBar} from "react-native-screens";
import {white} from "react-native-paper/lib/typescript/styles/colors";

export interface SearchBarProps {
  readonly placeholder: string;
  readonly onPress?: any;
}

export const VoveSearchBar = (props: SearchBarProps) => {
  const { placeholder, onPress, } = props;
  const [text, setText] = React.useState('');
  const [filledFlag, setFilledFlag] = React.useState(false);
  const handleInput = (text: string) => {
    setText(text);
  };

  return (
    <View style={styles.search}>
      <Searchbar
        placeholder={placeholder}
        placeholderTextColor={Color.grey_100}
        value={text}
        theme={{mode: "adaptive", colors: {primary: Color.primary_100, text: Color.grey_100}, roundness: 25}}
        onChangeText={(text) => handleInput(text)}
        inputStyle={TextStyle.bodyLarge}
        style={{
          borderColor: Color.primary_100,
          borderWidth: 1,
        }}
      >
      </Searchbar>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 0.9 * ScreenSize.width,
    paddingVertical: (13 / 812) * ScreenSize.height,
  },
});
