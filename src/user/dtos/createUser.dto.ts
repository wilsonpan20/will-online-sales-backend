import { IsString, IsEmail } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;

  @IsString()
  cpf: string;
}
