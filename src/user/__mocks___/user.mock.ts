import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userEntityMock: UserEntity = {
  cpf: '1234546666',
  createdAt: new Date(),
  email: 'emailmock@.com.br',
  id: 43242,
  name: 'nameMock',
  password: '$2b$10$WeLzVQS9z9wln2dIYK6u/OIR9dGF4uarnj9/LuXqo2B5vleR3XHVW',
  phone: '32323232323',
  typeUser: UserType.User,
  updatedAt: new Date()



}