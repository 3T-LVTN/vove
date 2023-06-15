import { IsNotEmpty } from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty()
  // 0 - bad, 1 - average, 2 - good
  status: number;

  @IsNotEmpty()
  address: {
    lat: number;
    lng: number;
  };
}
