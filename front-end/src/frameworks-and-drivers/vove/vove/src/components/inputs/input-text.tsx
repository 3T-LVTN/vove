import * as React from "react";
import { TextInput } from "react-native-paper";
import {Color, InitializeFonts, TextStyle, ScreenSize} from "@front-end/shared/utils";


export interface InputTextProps {
  title: string;
  placeholder: string;
}

export const InputText = (props: InputTextProps) => {
  const [text, setText] = React.useState("");
  InitializeFonts();
  return (
    <TextInput
      label={props.title}
      placeholder={props.placeholder}
      placeholderTextColor={Color.grey_100}
      mode="outlined"
      value={text}
      outlineColor={Color.primary_100}
      activeOutlineColor={Color.primary_100}
      onChangeText={(text) => setText(text)}
      style={{
        ...TextStyle.bodyLarge,
        width: (327 / 375) * ScreenSize.width,
        backgroundColor: Color.white_100,
      }}
    />
  );
};
