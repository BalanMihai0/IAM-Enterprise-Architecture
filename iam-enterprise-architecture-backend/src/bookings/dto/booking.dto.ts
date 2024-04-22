import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsISO8601, IsNotEmpty, IsNumber } from "class-validator";

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
    @IsISO8601()
    @IsNotEmpty()
    startDate:Date;

    @ApiProperty()
    @IsISO8601()
    @IsNotEmpty()
    endDate:Date;
}