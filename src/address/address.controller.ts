import { Controller, Param, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { Roles } from '../decorators/role.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { UserId } from '../decorators/user-id.decorator';
@Roles(UserType.User)
@Controller('address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService


  ) { }

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @UserId() userId: number): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDto, userId)
  }

}
