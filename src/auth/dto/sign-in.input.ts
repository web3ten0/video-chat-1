import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
export class SignInInput {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
