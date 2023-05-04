import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {ButtonType, Color, ScreenSize, TextStyle} from "@front-end/shared/utils";
import {ButtonFullWidth} from "@front-end/frameworks-and-drivers/vove/vove/src/components";

export interface SignupSucceedProps {
  readonly navigation: any
}

export function SignupSucceed(props: SignupSucceedProps) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <View style={{...styles.container, paddingTop: ScreenSize.height * 0.03, justifyContent: 'center'}}>
        <Image
          source={require("../../images/success.png")}
          style={{width: ScreenSize.width * 0.6, height: ScreenSize.width * 0.45}}
        ></Image>
        <View style={{padding: ScreenSize.height * 0.02}}></View>
        <Text style={TextStyle.h2}>Sign Up Succeed!</Text>
        <View style={{padding: ScreenSize.height * 0.01}}></View>
        <Text style={TextStyle.h3}>Please log in to use Vove</Text>
      </View>

      <View style={{paddingBottom: ScreenSize.height * 0.1}}>
        <ButtonFullWidth content='Log In'
                         onPress={() => navigation.goBack(navigation.popToTop())}></ButtonFullWidth>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white_100,
    alignItems: 'center',
  },
});

export default SignupSucceed;
