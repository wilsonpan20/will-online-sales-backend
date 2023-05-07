import { ReturCityDto } from "../../city/dtos/returnCity.dto";
import { AddressEntity } from "../entities/address.entity";


export class ReturnAddressDto {
  complement: string
  numberAddress: number
  cep: string
  city?: ReturCityDto

  constructor(address: AddressEntity) {
    this.complement = address.complement
    this.numberAddress = address.numberAddress
    this.cep = address.cep
    this.city = address.city ? new ReturCityDto(address.city) : undefined
  }
}