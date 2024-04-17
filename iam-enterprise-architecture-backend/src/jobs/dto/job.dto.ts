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
    
    @ApiProperty()
    @IsNotEmpty()
    @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
        message: "$property must be formatted as yyyy-mm-dd"
    })    
    startDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
        message: "$property must be formatted as yyyy-mm-dd"
    })    
    endDate: Date;
}