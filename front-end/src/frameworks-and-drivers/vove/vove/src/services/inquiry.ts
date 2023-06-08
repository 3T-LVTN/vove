import axios from "axios";

export const postCreateInquiry = (
    title: string,
    message: string,
    token: any
  ) => {
    return axios.post(
      'https://api.vove-managed.com/inquiry',
      {
        title: title,
        message: message,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
  
export const postCloseInquiry = (id: string, title: string, token: any) => {
    return axios.post(
        'https://api.vove-managed.com/inquiry/close',
        {
        id: id,
        title: title
        },
        {
        headers: { Authorization: `Bearer ${token}` },
        }
    );
    };
  
export const postCommentInquiry = (id: string, message: string, token: any) => {
    return axios.post(
      'https://api.vove-managed.com/inquiry/comment',
      {
        id: id,
        message: message,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };