import { useState } from 'react';
import { KeyboardTypeOptions, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Color, ScreenSize, TextStyle } from '@front-end/shared/utils';

interface InputTextProps {
  readonly title: string
  readonly placeholder: string
  readonly text: string
  readonly output: React.Dispatch<React.SetStateAction<string>>
  readonly rightIcon?: any
  readonly keyboardType?: KeyboardTypeOptions
  readonly multiline?: boolean
}

export const InputText = (props: InputTextProps) => {
  const [text, setText] = useState(props.text)

  function handleChange(text: string) {
    setText(text)
    props.output(text)
  }

  return (
    <TextInput
      label={<Text style={{ ...TextStyle.h3, color: Color.dark_100 }}>{props.title}</Text>}
      placeholder={props.placeholder}
      value={text}
      activeUnderlineColor={Color.grey_100}
      onChangeText={handleChange}
      keyboardType={props.keyboardType}
      multiline={props.multiline}
      style={{
        ...TextStyle.h3,
        fontWeight: '400',
        width: (310 / 375) * ScreenSize.width,
        backgroundColor: 'transparent',
      }}
      right={<TextInput.Icon name={props.rightIcon}/> || null}
    />
  );
};