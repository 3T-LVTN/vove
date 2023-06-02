import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

export async function fetchData() {
    try {
      const token = await AsyncStorage.getItem('userToken')
      const res = await getProfile(JSON.parse(token));
      AsyncStorage.setItem('phone', res.data[0].phone)
      AsyncStorage.setItem('name', res.data[0].name)
      if (res.data[0].address) AsyncStorage.setItem('address', res.data[0].address)
      AsyncStorage.setItem('trackingPlaces', JSON.stringify(res.data[0].trackingPlaces))
      AsyncStorage.setItem('inquiries', JSON.stringify(res.data[0].inquiries))
    } catch (err) {
      Alert.alert('Your credentials are expired, please re-login your account!')
    }
  }

export const getProfile = (token:any) => {
    return axios.get("profile", 
    { 
        headers: {"Authorization" : `Bearer ${token}`}
    })
}

export const postUpdateProfile = (name:string, address:string, token:any) => {
    return axios.post("profile", 
    {
        name: name, 
        address: address
    },
    { 
        headers: {"Authorization" : `Bearer ${token}`}
    });
}

export const postCreateTrackingplace = (title:string, address:string, token:any) => {
    return axios.post("/profile/create-trackingplace", 
    {
        title: title, 
        address: address
    },
    { 
        headers: {"Authorization" : `Bearer ${token}`}
    });
}

export const postUpdateTrackingplace = (title:string, id:string, token:any) => {
    return axios.post("/profile/update-trackingplace", 
    {
        title: title, 
        id: id
    },
    { 
        headers: {"Authorization" : `Bearer ${token}`}
    });
}

export const postDeleteTrackingplace = (id:string, token:any) => {
    return axios.post("/profile/delete-trackingplace", 
    {
        id: id
    },
    { 
        headers: {"Authorization" : `Bearer ${token}`}
    });
}

export const postCreateInquiry = (title:string, message:string, token:any) => {
    return axios.post("/profile/create-inquiry", 
    {
        title: title, 
        message: message
    },
    { 
        headers: {"Authorization" : `Bearer ${token}`}
    });
}

export const postCloseInquiry = (id:string, token:any) => {
    return axios.post("/profile/close-inquiry", 
    {
        id: id
    },
    { 
        headers: {"Authorization" : `Bearer ${token}`}
    });
}

export const postCommentInquiry = (id:string, message:string, token:any) => {
    return axios.post("/profile/comment-inquiry", 
    {
        id: id, 
        message: message
    },
    { 
        headers: {"Authorization" : `Bearer ${token}`}
    });
}

// export const postSignUp = (phone:string, name:string, password:string) => {
//     return axios.post("auth/sign-up", 
//     {
//         phone: phone, 
//         name: name,
//         password: password
//     });
// }