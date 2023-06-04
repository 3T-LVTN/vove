import React, { useState } from 'react';
import { KeyboardAvoidingView, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Color, ScreenSize, TextStyle } from '@front-end/shared/utils';

interface InputPasswordProps {
  readonly title: string
  readonly text: string
  readonly output: React.Dispatch<React.SetStateAction<string>>
}

export const InputPassword = (props: InputPasswordProps) => {
  const [text, setText] = useState(props.text)
  const [passwordVisibility, setPasswordVisibility] = useState(true)

  function handleChange(text: string) {
    setText(text);
    props.output(text);
  }

  return (
    <KeyboardAvoidingView enabled>
      <TextInput
        label={<Text style={{ ...TextStyle.h3, color: Color.dark_100 }}>{props.title}</Text>}
        placeholder="Vui lòng nhập mật khẩu"
        value={text}
        activeUnderlineColor={Color.grey_100}
        onChangeText={handleChange}
        style={{
          ...TextStyle.h3,
          fontWeight: '400',
          color: Color.green_100,
          width: (327 / 375) * ScreenSize.width,
          backgroundColor: Color.white_100,
        }}
        secureTextEntry={passwordVisibility}
        right={<TextInput.Icon name={passwordVisibility ? 'eye' : 'eye-off'} onPress={() => setPasswordVisibility(!passwordVisibility)}/>
        }
      />
    </KeyboardAvoidingView>
  );
};
