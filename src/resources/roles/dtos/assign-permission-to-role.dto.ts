import { Transform } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsOptional, IsString, Min, MinLength } from "class-validator";

export class AssignPermissionToRoleDto {
    @IsArray()
    @ArrayNotEmpty()
    @Transform(({ value }) => value.map(Number))
    permissionIds: number[];
}