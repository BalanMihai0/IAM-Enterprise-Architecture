import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class NewBookingDTO{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    requester: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    job: number;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    startDate:Date;


    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    endDate:Date;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    creationDate:Date;

}