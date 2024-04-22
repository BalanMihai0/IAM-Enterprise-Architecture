import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsISO8601, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class NewJobDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    location: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;
}