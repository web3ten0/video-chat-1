import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  username: string;

  @IsString()
  @MaxLength(200)
  bio: string;

  @IsString()
  @MaxLength(500)
  picture: string;
}
