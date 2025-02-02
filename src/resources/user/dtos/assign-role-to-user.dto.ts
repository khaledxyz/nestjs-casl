import { Transform } from "class-transformer";
import { IsInt } from "class-validator";

export class AssignRoleToUserDto {
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    roleId: number;
}