import axios from "axios";

export const postSendFeedback = (
    status: number,
    address: {
      lat: number,
      lng: number
    },
    token: any
  ) => {
    return axios.post(
      '/feedback',
      {
        status: status,
        address: address
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
  };