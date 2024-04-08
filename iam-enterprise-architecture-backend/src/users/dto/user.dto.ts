import { ApiProperty } from "@nestjs/swagger";

export class NewUserDto {
    @ApiProperty()
    fullName: string;
    @ApiProperty()
    email: string;
    //plain psw
    @ApiProperty()
    password: string;
}