import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import {
  ButtonType,
  Color,
  ScreenSize,
  TextStyle,
} from '@front-end/shared/utils';
import { ButtonFullWidth } from '@front-end/frameworks-and-drivers/vove/vove/src/components';

export function ActionFailed({route, navigation}: any) {
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
          source={require('../../images/failed.png')}
          style={{
            width: ScreenSize.width * 0.7,
            height: ScreenSize.width * 0.7,
          }}
        ></Image>
        <View style={{ padding: ScreenSize.height * 0.02 }}></View>
        <Text style={{ ...TextStyle.h2, color: Color.dark_80, textAlign: 'center' }}>
          { title }
        </Text>
        <View style={{ padding: ScreenSize.height * 0.01 }}></View>
        <Text style={{ ...TextStyle.h3, color: Color.dark_80, textAlign: 'center' }}>
          { message }
        </Text>
      </View>

      <View style={{ paddingBottom: ScreenSize.height * 0.1 }}>
        <ButtonFullWidth
          type={ButtonType.RED}
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
  },
});

export default ActionFailed;
