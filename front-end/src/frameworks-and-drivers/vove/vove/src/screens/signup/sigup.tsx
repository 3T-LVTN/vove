import React from "react";
import {Button, StyleSheet, View, Text} from "react-native";

export interface SignupProps {
  readonly navigation: any;
}

export function Signup(props: SignupProps) {
  return (
    <View style={styles.center}>
      <Text>Sign Up</Text>
      <Button
        title="Next"
        onPress={() => props.navigation.navigate("InsertOtpSignup")}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Signup;
//
//
// import React, { useState } from "react";
// import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
// import { Color, ScreenSize, TextStyle, ButtonType } from '../../utils'
// import { StepBar, ButtonFullWidth, InputText, ButtonSmall, InputInformation, InputDate } from '../../components';
// // Service
// import * as Cache from '../../services/Cache'
// import * as POST from '../../services/POST'
//
// const filterTab = [{gender: 'Nam'}, {gender: 'Nữ'}, {gender: 'Khác'}]
//
// export function SignUp2({ navigation, route }) {
//   const [name, setName] = useState('')
//   const [gender, setGender] = useState('Nam')
//   const [genderEnum, setEnum] = useState(0)
//   const [dob, setDob] = useState(new Date())
//   const [identityNumber, setId] = useState('')
//   const [phoneNumber, setTel] = useState('')
//   const [email, setMail] = useState('')
//
//   const handleGender = (gender) => {
//     setGender(gender)
//     setEnum(gender == 'Nam' ? 0 : gender == 'Nữ' ? 1 : 2)
//   }
//
//   const handleSubmit = () => {
//     Cache.rm('DangKy')
//     if (name == '' || dob == null || identityNumber == '' || phoneNumber == '') {
//       Alert.alert('Bạn chưa nhập đủ thông tin')
//       return
//     }
//     const userCheckData = {
//       role: route.params.role,
//       tel: phoneNumber,
//     }
//     const data = {
//       name: name,
//       image: "https://staymana.s3.ap-southeast-1.amazonaws.com/sample-avatar.jpg",
//       gender: genderEnum,
//       dob: dob,
//       identityNumber: identityNumber,
//       email: email,
//     }
//     POST.checkExist(userCheckData).then(res => {
//       if (res) Alert.alert('Tài khoản này đã tồn tại')
//       else {
//         Cache.set('DangKy', data)
//         Cache.merge('DangKy', userCheckData)
//         navigation.navigate("SignUp3", { phoneNumber: '+84' + phoneNumber })
//       }
//     })
//   }
//
//   return (
//     <View style={styles.container}>
//       <StepBar step={1}></StepBar>
//       <ScrollView style={{backgroundColor: Color.white_100}}>
//         <View style={styles.container}>
//
//           <View style={{...styles.container, paddingTop: ScreenSize.height * 0.03, alignItems: 'flex-start'}}>
//             <Text style={TextStyle.h2}>Nhập thông tin cá nhân của bạn</Text>
//             <View style={{padding: ScreenSize.height * 0.01}}></View>
//             <InputText allowOutput={true} output={setName} title="Họ và tên" placeholder="Nhập họ tên" rightIcon={name==''? '' : 'check-circle-outline'}></InputText>
//             <InputInformation title='Giới tính' information='.'></InputInformation>
//             <View style={{flexDirection: 'row', marginTop: -ScreenSize.height * 0.04}}>
//               {
//                 filterTab.map((e, index) => (
//                   <ButtonSmall key={index} type={gender == e.gender ? ButtonType.DEFAULT : ButtonType.OUTLINE} content={e.gender} onPress={() => handleGender(e.gender)}></ButtonSmall>
//                 ))
//               }
//             </View>
//
//             <InputDate output={setDob} title='Ngày sinh'/>
//             <InputText allowOutput={true} output={setId} title="Mã số CCCD" placeholder="Nhập CCCD" rightIcon={identityNumber==''? '' : 'check-circle-outline'} keyboardType="numeric"></InputText>
//             <InputText allowOutput={true} output={setTel} title="Số điện thoại" placeholder="Nhập số điện thoại" rightIcon={phoneNumber==''? '' : 'check-circle-outline'} keyboardType="numeric"></InputText>
//             <InputText allowOutput={true} output={setMail} title="Email" placeholder="Nhập email" rightIcon={email==''? '' : 'check-circle-outline'}></InputText>
//           </View>
//         </View>
//         <View style={{marginTop: ScreenSize.height * 0.2}}></View>
//       </ScrollView>
//       <View style={{paddingBottom: ScreenSize.height * 0.1, alignItems: 'center', paddingTop: ScreenSize.height * 0.05}}>
//         <ButtonFullWidth content='Tiếp theo' onPress={() => handleSubmit()}></ButtonFullWidth>
//       </View>
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Color.white_100,
//     alignItems: 'center',
//   },
// });
