import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userEntityMock: UserEntity = {
  cpf: '1234546666',
  createdAt: new Date(),
  email: 'emailmock@.com.br',
  id: 43242,
  name: 'nameMock',
  password: '12131234545',
  phone: '32323232323',
  typeUser: UserType.User,
  updatedAt: new Date()



}