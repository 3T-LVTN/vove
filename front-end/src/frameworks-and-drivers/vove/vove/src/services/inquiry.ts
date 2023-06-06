import axios from "axios";

export const postCreateInquiry = (
    title: string,
    message: string,
    token: any
  ) => {
    return axios.post(
      '/inquiry',
      {
        title: title,
        message: message,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
  
export const postCloseInquiry = (id: string, token: any) => {
    return axios.post(
        '/inquiry/close',
        {
        id: id,
        },
        {
        headers: { Authorization: `Bearer ${token}` },
        }
    );
    };
  
export const postCommentInquiry = (id: string, message: string, token: any) => {
    return axios.post(
      '/inquiry/comment',
      {
        id: id,
        message: message,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };