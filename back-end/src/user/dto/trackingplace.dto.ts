import { IsNotEmpty } from 'class-validator';

export class CreateTrackingPlaceDto {  
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  address: string;
}

export class UpdateTrackingPlaceDto {
  @IsNotEmpty()
  id: string;
  
  @IsNotEmpty()
  title: string;
}

export class DeleteTrackingPlaceDto {
  @IsNotEmpty()
  id: string;
}

