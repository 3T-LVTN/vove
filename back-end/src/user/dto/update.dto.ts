import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  address: {
    lat: number;
    lng: number;
  };

  @IsNotEmpty()
  avatar: string;

  @IsNotEmpty()
  @IsOptional()
  addressName: string;
}
