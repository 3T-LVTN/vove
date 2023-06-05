import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { InquiryList, InquiryDetail, NewInquiry } from '../screens';
import { HeaderStyle } from './header.style';

export const InquiryStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={HeaderStyle as any} initialRouteName="InquiryList">
      <Stack.Screen
        name="InquiryList"
        component={InquiryList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InquiryDetail"
        component={InquiryDetail}
        options={{ title: 'Chi tiết yêu cầu' }}
      />
      <Stack.Screen
        name="NewInquiry"
        component={NewInquiry}
        options={{ title: 'Tạo yêu cầu mới' }}
      />
    </Stack.Navigator>
  );
};
