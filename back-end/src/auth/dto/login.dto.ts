import { IsNotEmpty, IsPhoneNumber} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  password: string;
}
