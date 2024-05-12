import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8) // Adjust the minimum length as needed
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, { message: 'Password too weak. It must contain at least 8 characters including a lowercase and uppercase letter, a digit and a special character.' })
    newPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, { message: 'Password too weak. It must contain at least 8 characters including a lowercase and uppercase letter, a digit and a special character.' })
    confirmPassword: string;
}
