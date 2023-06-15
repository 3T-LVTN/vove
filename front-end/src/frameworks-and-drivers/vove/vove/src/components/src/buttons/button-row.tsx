import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Color,
  ScreenSize,
  TextStyle,
  customSize,
} from '@front-end/shared/utils';

interface ButtonMember {
  readonly name: string;
  readonly width: number;
}

interface ButtonRowProps {
  readonly list: ButtonMember[];
  readonly callBack: React.Dispatch<React.SetStateAction<number>>;
}

export const ButtonRow = (props: ButtonRowProps) => {
  const [selected, setSelected] = useState(0)

  function handlePress(index: number) {
    setSelected(index)
    props.callBack(index)
  }

  return (
    <View style={{ flexDirection: 'row' }}>
        {
            props.list.map((item, index) => (
                <Pressable key={index} onPress={() => handlePress(index)}>
                    <View style={{
                        ...styles.buttonGroup,
                        width: customSize(item.width),
                        backgroundColor: index == selected ? Color.primary_100 : Color.white_100,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderLeftWidth: index == 0 ? 1 : 0,
                        borderRightWidth: 1,
                        borderTopLeftRadius: index == 0 ? ScreenSize.width * 0.01 : 0,
                        borderBottomLeftRadius: index == 0 ? ScreenSize.width * 0.01 : 0,
                        borderTopRightRadius: index == props.list.length - 1 ? ScreenSize.width * 0.01 : 0,
                        borderBottomRightRadius: index == props.list.length - 1 ? ScreenSize.width * 0.01 : 0
                    }}
                    >
                        <Text style={{
                            ...TextStyle.h4,
                            color: index == selected ? Color.white_100 : Color.primary_100,
                        }}>{item.name}
                        </Text>
                    </View>
                </Pressable>
            ))
        }
  </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    height: customSize(24),
    borderColor: Color.primary_100,
  },
});
