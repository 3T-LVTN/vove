import { IsNotEmpty } from 'class-validator';

export class CreateInquiryDto {  
  @IsNotEmpty()
  title: string;
  // status: 0 = WAITING, 1 = OPENING, 2 = CLOSED
  @IsNotEmpty()
  message: string;
}

export class CloseInquiryDto {  
  @IsNotEmpty()
  id: string;
}

export class CommentInquiryDto {  
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  message: string;
}