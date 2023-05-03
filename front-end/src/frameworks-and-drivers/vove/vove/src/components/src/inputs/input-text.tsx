import * as React from "react";
import {KeyboardTypeOptions, Text} from "react-native";
import {TextInput} from "react-native-paper";
import {Color, ScreenSize, TextStyle} from "@front-end/shared/utils";

export interface InputTextProps {
  readonly title: string;
  readonly placeholder: string;
  readonly rightIcon: any;
  readonly onPress?: any;
  readonly defaultValue?: string;
  readonly output: React.Dispatch<React.SetStateAction<string>>;
  readonly allowOutput: boolean;
  unit?: any;
  readonly?: boolean;
  readonly keyboardType: KeyboardTypeOptions;
}

export const InputText = (props: InputTextProps) => {
  const {title, placeholder, rightIcon, onPress, defaultValue, allowOutput} = props;
  const [text, setText] = React.useState('');
  const [filledFlag, setFilledFlag] = React.useState(false);
  const handleInput = (text: string) => {
    setText(text)
    if (allowOutput) props.output(text)
  }

  return (
    <TextInput
      label={
        <Text style={{...TextStyle.h3, color: Color.dark_100}}>{title}</Text>
      }
      placeholder={placeholder}
      placeholderTextColor={Color.grey_100}
      mode="flat"
      defaultValue={props.unit && defaultValue && defaultValue + " " + props.unit || defaultValue}
      value={props.unit && (filledFlag && text + " " + props.unit) || text}
      activeUnderlineColor={Color.grey_100}
      outlineColor={Color.white_100}
      activeOutlineColor={Color.white_100}
      onChangeText={(text) => handleInput(text)}
      onFocus={() => {
        setFilledFlag(false);
        props.unit && setText("");
      }}
      onEndEditing={() => {
        if (text === "") {
          setFilledFlag(false);
        } else {
          setFilledFlag(true);
        }
      }}
      editable={!props.readonly}
      keyboardType={props.keyboardType}
      style={{
        ...TextStyle.h3,
        fontWeight: "400",
        width: (327 / 375) * ScreenSize.width,
        backgroundColor: 'transparent',
      }}
      right={<TextInput.Icon name={rightIcon} onPress={onPress}/>}
    />
  );
};
