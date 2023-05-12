export interface InquiryCommentViewModel {
  timestamp: string;
  content: string;
  byUser: boolean;
}
export interface InquiryViewModel {
  id: string;
  timestamp: string;
  title: string;
  status: string;
  address: string;
  content: string;
  comments: InquiryCommentViewModel[];
}
