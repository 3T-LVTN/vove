import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  lat: number;

  @IsNotEmpty()
  @IsOptional()
  lng: number;

  @IsNotEmpty()
  avatar: string;
}
