import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { Text } from 'react-native';
import { Color, TextStyle, ScreenSize } from '@front-end/shared/utils';

export interface InputInformationProps {
  readonly title: string;
  readonly information: string;
  readonly width?: any;
}

export const InputInformation = (props: InputInformationProps) => {
  const { title, information } = props;
  return (
    <TextInput
      multiline={true}
      label={
        <Text style={{ ...TextStyle.bodyLarge, color: Color.dark_100 }}>
          {title}
        </Text>
      }
      mode="flat"
      value={information}
      activeUnderlineColor={Color.white_100}
      underlineColor={Color.white_100}
      outlineColor={Color.white_100}
      activeOutlineColor={Color.white_100}
      editable={false}
      style={{
        ...TextStyle.h3,
        width: props.width ? props.width : (327 / 375) * ScreenSize.width,
        backgroundColor: Color.white_100,
      }}
    />
  );
};
