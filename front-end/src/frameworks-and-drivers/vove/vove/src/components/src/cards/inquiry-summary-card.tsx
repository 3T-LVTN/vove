import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Color,
  customSize,
  ScreenSize,
  TextStyle,
} from '@front-end/shared/utils';
import { StatusLabel } from '../status/status-label';
import { formatDate } from './time-format';

export interface InquirySummaryCardProps {
  readonly index: number;
  readonly title: string;
  readonly time: string;
  readonly status: number;
  readonly navigation: any;
  readonly list: any[];
}

export const InquirySummaryCard = (props: InquirySummaryCardProps) => {
  const vnTime = formatDate(props.time)
  return (
    <Pressable
      onPress={() => {
        props.navigation.navigate('InquiryDetail', { index: props.index, list: props.list });
      }}
      style={{ width: '99%', alignSelf: 'center' }}
    >
      <View style={styles.container}>
        <View style={styles.line}>
          <Text style={{ ...TextStyle.bodySmall, color: Color.dark_80 }}>
            {vnTime}
          </Text>
          <StatusLabel status={props.status} />
        </View>
        <View style={{ height: customSize(14) }} />
        <View style={styles.line}>
          <Text style={TextStyle.h3}>{props.title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: customSize(15),
    paddingVertical: customSize(15),
    height: (117 / 375) * ScreenSize.width,
    borderWidth: 1,
    backgroundColor: Color.white_100,
    borderColor: Color.dark_40,
    marginTop: (12 / 375) * ScreenSize.width,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
