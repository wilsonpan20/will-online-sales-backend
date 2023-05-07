import { Controller, Param, Post, UsePipes, ValidationPipe, Body, Get } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { Roles } from '../decorators/role.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { UserId } from '../decorators/user-id.decorator';
import { ReturnAddressDto } from './dtos/returnAddress.dto';
@Roles(UserType.User, UserType.Admin)
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

  @Get()
  @UsePipes(ValidationPipe)
  async findAddressByUserId(@UserId() userId: number): Promise<ReturnAddressDto[]> {
    return (await this.addressService.findAddressByUserId(userId)).map((address) => new ReturnAddressDto(address)
    )
  }

}
