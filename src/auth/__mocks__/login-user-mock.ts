import { LoginDto } from "../dtos/login.dto";
import { userEntityMock } from "../../user/__mocks___/user.mock";


export const loginUserMock: LoginDto = {
  email: userEntityMock.email,
  password: '12345678'

}