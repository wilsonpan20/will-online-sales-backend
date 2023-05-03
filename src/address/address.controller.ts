import { Controller, Param, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { Roles } from 'src/decorators/role.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

@Controller('address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService


  ) { }
  @Roles(UserType.User)
  @Post('/:userId')
  @UsePipes(ValidationPipe)

  async createAddress(@Body() createAddressDto: CreateAddressDto, @Param('userId') userId: number): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDto, userId)
  }

}
