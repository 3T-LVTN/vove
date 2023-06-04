import { IsNotEmpty } from 'class-validator';

export class CreateTrackingPlaceDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  lng: number;
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
