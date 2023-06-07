import {
  ButtonType,
  Color,
  customSize,
  ScreenSize,
  TextStyle,
  TrackingPlaceStatusType,
} from '@front-end/shared/utils';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { ButtonIcon } from '../buttons/button-icon';
import { useState } from 'react';
import { InputText } from '../inputs/input-text';
import { postUpdateTrackingplace, postDeleteTrackingplace } from '../../../services'
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TrackingPlaceStatusProps {
  readonly id?: string;
  readonly placeName: string;
  title: string;
  readonly status: TrackingPlaceStatusType;
  readonly address?: {
    lat: number,
    lng: number
  }
  readonly navigation: any;
  readonly readonly?: boolean;
  readonly handleRefresh?: any;
}

export const TrackingSummaryCard = (props: TrackingPlaceStatusProps) => {
  const [isUpdating, setUpdatingStatus] = useState(false)
  const [isDeleting, setDeletingStatus] = useState(false)
  const [newName, setNewName] = useState(props.title)

  async function handleUpdate() {
    if (isUpdating) {
      if (newName == '') props.navigation.navigate('ActionFailed', {
        title: 'Điều chỉnh thất bại',
        message: 'Tên vị trí không được bỏ trống'
      })
      else {
        try {
          const token = await AsyncStorage.getItem('userToken')
          await postUpdateTrackingplace(newName, props.id!, JSON.parse(token!))
          props.title = newName
          setUpdatingStatus(false)
          props.navigation.navigate('ActionSuccess', {
            title: 'Điều chỉnh thành công',
            message: 'Tên vị trí của bạn đã được cập nhật'
          })
          props.handleRefresh(true)
        } catch (err) {
          Alert.alert('Thông tin đăng nhập đã hết hạn, xin vui lòng đăng nhập lại');
        }
      }
    }
    else if (isDeleting) setDeletingStatus(false)
    else setUpdatingStatus(true)
  }

  async function handleDelete() {
    if (isDeleting) {
      try {
        const token = await AsyncStorage.getItem('userToken')
        await postDeleteTrackingplace(props.id!, JSON.parse(token!))
        setDeletingStatus(false)
        props.navigation.navigate('ActionSuccess', {
          title: 'Xóa thành công',
          message: 'Vị trí theo dõi của bạn đã được xóa'
        })
        props.handleRefresh(true)
      } catch (err) {
        Alert.alert('Thông tin đăng nhập đã hết hạn, xin vui lòng đăng nhập lại');
      }
    }
    else if (isUpdating) {
      setUpdatingStatus(false)
      setNewName(props.title)
    }
    else setDeletingStatus(true)
  }

  return (
    <Pressable
      onPress={() => {
        props.address ? props.navigation.navigate('PlaceDetail', { title: props.title, placeName: props.placeName, address: props.address, status: props.status })
        : props.navigation.navigate('UserProfile')
      }}
      style={{ width: '100%' }}
    >
      <View
        style={{
          ...styles.container,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={
            props.status === TrackingPlaceStatusType.SAFE
              ? styles.statusCircleGood
              : props.status === TrackingPlaceStatusType.NORMAL
              ? styles.statusCircleLowRisk
              : props.status === TrackingPlaceStatusType.LOW_RISK
              ? styles.statusCircleHighRisk
              : styles.statusCircleEpidemic
          }
        ></View>
        <View style={{ width: '60%', paddingLeft: 8 }}>
          { isUpdating?
          <>
          <View style={{ marginTop: -ScreenSize.width * 0.07 }} />
          <InputText
          title=''
          placeholder={'Vui lòng nhập tên hiển thị mới'}
          text={newName}
          output={setNewName}
          customWidth={ScreenSize.width * 0.5}
          />
          </>
          :
          <>
            <Text style={{ ...TextStyle.h3, color: Color.dark_80 }}>
              {props.title}
            </Text>
            <Text style={{ ...TextStyle.bodySmall, color: Color.dark_80 }}>
            {props.placeName}
          </Text>
          </>
          }
          
        </View>
        <View style={{ height: customSize(14) }} />
        <View
          style={{
            height: '100%',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          {props.readonly ? null : <><ButtonIcon
          onPress={() => handleUpdate()}
          iconName={isUpdating? 'check' : isDeleting? 'cancel' : 'cog-outline'}
          customSize={0.7}
          type={isDeleting? ButtonType.RED : undefined}
          />
           <View style={{ paddingTop: ScreenSize.height * 0.01 }} />
          <ButtonIcon
          onPress={() => handleDelete()}
          iconName={isUpdating? 'cancel' : isDeleting? 'check' : 'delete'}
          customSize={0.7}
          type={isUpdating? ButtonType.RED : undefined}
          />
          </>
          }
          
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
    height: (90 / 375) * ScreenSize.width,
    backgroundColor: Color.white_100,
    borderWidth: 1,
    borderColor: Color.dark_40,
    marginTop: (12 / 375) * ScreenSize.width,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // elevation: 5,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusCircleGood: {
    backgroundColor: Color.primary_100,
    borderRadius: 20,
    height: (40 / 375) * ScreenSize.width,
    width: (40 / 375) * ScreenSize.width,
  },
  statusCircleHighRisk: {
    backgroundColor: Color.orange_20,
    borderRadius: 20,
    height: (40 / 375) * ScreenSize.width,
    width: (40 / 375) * ScreenSize.width,
  },
  statusCircleLowRisk: {
    backgroundColor: Color.yellow_40,
    borderRadius: 20,
    height: (40 / 375) * ScreenSize.width,
    width: (40 / 375) * ScreenSize.width,
  },
  statusCircleEpidemic: {
    backgroundColor: Color.red_100,
    borderRadius: 20,
    height: (40 / 375) * ScreenSize.width,
    width: (40 / 375) * ScreenSize.width,
  },
});
