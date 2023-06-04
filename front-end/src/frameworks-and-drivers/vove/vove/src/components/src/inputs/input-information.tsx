import { TextInput } from 'react-native-paper';
import { Text } from 'react-native';
import { Color, TextStyle, ScreenSize } from '@front-end/shared/utils';

interface InputInformationProps {
  readonly title: string;
  readonly information: string;
}

export const InputInformation = (props: InputInformationProps) => {
  return (
    <TextInput
      multiline={true}
      label={
        <Text style={{ ...TextStyle.bodyLarge, color: Color.dark_100 }}>
          {props.title}
        </Text>
      }
      value={props.information}
      underlineColor={Color.white_100}
      editable={false}
      style={{
        ...TextStyle.h3,
        width: (327 / 375) * ScreenSize.width,
        backgroundColor: Color.white_100,
      }}
    />
  );
};
