import { IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;
}