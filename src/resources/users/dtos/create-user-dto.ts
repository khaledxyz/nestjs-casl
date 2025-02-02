import { Transform } from "class-transformer"
import { IsEmail, IsEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    name: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    @MaxLength(255)
    password: string
}