import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Platform, Text, View } from 'react-native';
import { Color, ScreenSize, TextStyle } from '@front-end/shared/utils';
import DateTimePicker from '@react-native-community/datetimepicker';

export interface InputDateProps {
  readonly title: string;
  readonly output: React.Dispatch<React.SetStateAction<any>>;
}

export const InputDate = (props: InputDateProps) => {
  const { title } = props;

  const [date, setDate] = useState(new Date());
  const [dateShow, setDateShow] = useState(false);
  const [dateText, setDateText] = useState(new Date());
  const dateChange = (selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDateShow(Platform.OS === 'ios');
    setDate(currentDate);

    const tempDate = new Date(currentDate);
    const printDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setDateText(new Date(printDate));
    props.output(selectedDate);
  };

  return (
    <View>
      <TextInput
        label={
          <Text style={{ ...TextStyle.h3, color: Color.dark_100 }}>
            {title}
          </Text>
        }
        mode="flat"
        value={dateText.toLocaleString()}
        activeUnderlineColor={Color.grey_100}
        outlineColor={Color.white_100}
        activeOutlineColor={Color.white_100}
        editable={false}
        style={{
          ...TextStyle.h3,
          fontWeight: '400',
          width: (327 / 375) * ScreenSize.width,
          backgroundColor: 'transparent',
        }}
        right={
          <TextInput.Icon
            name="calendar-month"
            onPress={() => setDateShow(!dateShow)}
          />
        }
      />
      {dateShow && (
        <DateTimePicker
          value={date}
          onChange={dateChange}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          themeVariant="light"
        />
      )}
    </View>
  );
};
