import { useState } from "react";
import { Dimensions, KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-paper";
import {Color, initializeFonts, TextStyle} from "@front-end/shared/utils";

const width = Dimensions.get("window").width;

// export interface InputPasswordProps {
//   title: string;
//   placeholder: string;
// }

export const InputPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  initializeFonts();
  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };
  return (
    <KeyboardAvoidingView enabled>
      <TextInput
        label="Password"
        placeholder="Please enter password"
        placeholderTextColor={Color.grey_100}
        mode="outlined"
        value={password}
        outlineColor={Color.primary_100}
        activeOutlineColor={Color.primary_100}
        onChangeText={(password) => setPassword(password)}
        style={{
          ...TextStyle.bodyLarge,
          color: Color.green_100,
          width: (327 / 375) * width,
          backgroundColor: Color.white_100,
        }}
        secureTextEntry={passwordVisibility}
        right={
          <TextInput.Icon
            icon={rightIcon}
            onPress={() => handlePasswordVisibility()}
          />
        }
        autoCorrect={false}
      />
    </KeyboardAvoidingView>
  );
};
