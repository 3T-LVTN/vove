import axios from "axios";

export const postSendFeedback = (
    status: number,
    lat: number,
    lng: number,
    token: any
  ) => {
    return axios.post(
      '/feedback',
      {
        status: status,
        address: {
            lat: lat,
            lng: lng
        }
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };