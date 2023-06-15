import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  Color,
  ScreenSize,
  TextStyle,
} from '@front-end/shared/utils';
import { ButtonFullWidth } from '@front-end/frameworks-and-drivers/vove/vove/src/components';

export function ActionSuccess({route, navigation}: any) {
  const { title, message } = route.params
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.container,
          paddingTop: ScreenSize.height * 0.03,
          justifyContent: 'center',
        }}
      >
        <Image
          source={require('../../images/success.png')}
          style={{
            width: ScreenSize.width * 0.6,
            height: ScreenSize.width * 0.45,
          }}
        ></Image>
        <View style={{ padding: ScreenSize.height * 0.02 }}></View>
        <Text style={TextStyle.h2}>{ title }</Text>
        <View style={{ padding: ScreenSize.height * 0.01 }}></View>
        <Text style={TextStyle.h3}>{ message }</Text>
      </View>

      <View style={{ paddingBottom: ScreenSize.height * 0.1 }}>
        <ButtonFullWidth
          content="Quay lại"
          onPress={() => navigation.goBack()}
        ></ButtonFullWidth>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white_100,
    alignItems: 'center',
    paddingHorizontal: ScreenSize.width*0.03
  },
});

export default ActionSuccess;
