import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateJobDto {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    price?: number;
}
