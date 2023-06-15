import { IsNotEmpty } from 'class-validator';

export class CreateTrackingPlaceDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  address: {
    lat: number;
    lng: number;
  };

  @IsNotEmpty()
  addressName: string;
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
