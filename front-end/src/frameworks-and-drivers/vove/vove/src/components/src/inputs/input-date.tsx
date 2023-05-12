import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Platform, Text, View } from 'react-native';
import { Color, ScreenSize, TextStyle } from '@front-end/shared/utils';
import DateTimePicker from '@react-native-community/datetimepicker';

export interface InputDateProps {
  readonly title?: string;
  readonly output: React.Dispatch<React.SetStateAction<any>>;
}

export const InputDate = (props: InputDateProps) => {
  const { title } = props;

  const [date, setDate] = useState(new Date());
  const [dateShow, setDateShow] = useState(false);
  const [dateText, setDateText] = useState('12/05/2023');

  // TODO: fix dateChange with type conflict
  const dateChange = (selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDateShow(Platform.OS === 'ios');
    setDate(currentDate);

    const tempDate = new Date(currentDate);
    const printDate =
      tempDate.getDate().toLocaleString() +
      '/' +
      (tempDate.getMonth() + 1).toLocaleString() +
      '/' +
      tempDate.getFullYear().toLocaleString();
    setDateText(printDate)
    props.output(selectedDate);
  };

  return (
    <View>
      <TextInput
        mode="outlined"
        editable={false}
        value={dateText}
        outlineColor={Color.primary_100}
        style={{
          ...TextStyle.h3,
          fontWeight: '400',
          width: (327 / 375) * ScreenSize.width,
          backgroundColor: Color.white_100,
          borderRadius: 10
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
