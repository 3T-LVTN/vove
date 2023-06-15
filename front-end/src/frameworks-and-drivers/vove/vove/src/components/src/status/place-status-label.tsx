import { StyleSheet, Text, View } from 'react-native';
import {
  Color,
  TextStyle,
  TrackingPlaceStatusType,
} from '@front-end/shared/utils';

export interface PlaceStatusLabelProps {
  readonly status: TrackingPlaceStatusType;
}
export const PlaceStatusLabel = (props: PlaceStatusLabelProps) => {
  const { status } = props;
  const STATUS_DATA = [
    {
      color: Color.primary_80,
      text: 'Tốt',
    },
    {
      color: Color.yellow_80,
      text: 'Thấp',
    },
    {
      color: Color.orange_80,
      text: 'Vừa',
    },
    {
      color: Color.red_80,
      text: 'Cao',
    },
  ];
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: STATUS_DATA[status].color,
      }}
    >
      <Text style={{ ...TextStyle.label, color: 'white' }}>
        {STATUS_DATA[status].text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingHorizontal: 5,
    backgroundColor: Color.white_100,
    paddingVertical: 3,
    marginVertical: 15,
  },
});
