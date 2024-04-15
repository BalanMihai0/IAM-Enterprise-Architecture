import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class NewBookingDTO{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    requester: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    job: number;
}