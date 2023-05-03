import React, {useState} from "react";
import {KeyboardAvoidingView, Text} from "react-native";
import {TextInput} from "react-native-paper";
import {Color, ScreenSize, TextStyle} from "@front-end/shared/utils";

export interface InputPasswordProps {
  readonly allowOutput: boolean;
  readonly title: string;
  readonly output?: React.Dispatch<React.SetStateAction<string>>
}

export const InputPassword = (props: InputPasswordProps) => {
  const {title, allowOutput} = props;
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };
  const handleInput = (text: string) => {
    setPassword(text)
    if (allowOutput && props.output) props.output(text)
  }

  return (
    <KeyboardAvoidingView enabled>
      <TextInput
        label={
          <Text style={{...TextStyle.h3, color: Color.dark_100}}>
            {title}
          </Text>
        }
        placeholder="Please enter your password"
        placeholderTextColor={Color.grey_100}
        mode="flat"
        value={password}
        activeUnderlineColor={Color.grey_100}
        outlineColor={Color.primary_100}
        activeOutlineColor={Color.primary_100}
        onChangeText={(password) => handleInput(password)}
        style={{
          ...TextStyle.h3,
          fontWeight: "400",
          color: Color.green_100,
          width: (327 / 375) * ScreenSize.width,
          backgroundColor: Color.white_100,
        }}
        secureTextEntry={passwordVisibility}
        right={
          <TextInput.Icon
            name={rightIcon}
            onPress={() => handlePasswordVisibility()}
          />
        }
        autoCorrect={false}
      />
    </KeyboardAvoidingView>
  );
};
