import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-paper";
import {Color, ScreenSize, TextStyle} from "@front-end/shared/utils";

export interface InputPasswordProps {
  allowOutput: boolean;
  title: string;
  output?: React.Dispatch<React.SetStateAction<string>>
}

export const InputPassword = (props: InputPasswordProps) => {
  const { title, allowOutput } = props;
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
        label={title}
        placeholder="Enter password"
        placeholderTextColor={Color.grey_100}
        mode="outlined"
        value={password}
        outlineColor={Color.primary_100}
        activeOutlineColor={Color.primary_100}
        onChangeText={(password) => handleInput(password)}
        style={{
          ...TextStyle.bodyLarge,
          color: Color.primary_100,
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
