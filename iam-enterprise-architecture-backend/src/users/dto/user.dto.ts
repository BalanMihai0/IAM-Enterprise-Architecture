import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class NewUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/, {
    message:
      'Full name must contain at least two words starting from capital letters',
  })
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  //plain psw
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/, {
    message:
      'Password too weak. It must be at least 8 characters long and include a lowercase and uppercase letter, a digit, and a special character.',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/, {
    message:
      'Password too weak. It must be at least 8 characters long and include a lowercase and uppercase letter, a digit, and a special character.',
  })
  confirmPassword: string;
}
