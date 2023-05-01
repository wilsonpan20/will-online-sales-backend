import { AddressEntity } from "../entities/address.entity";


export class ReturnAddressDto {
  complement: string
  numberAddress: number
  cep: string

  constructor(address: AddressEntity) {
    this.complement = address.comprement
    this.numberAddress = address.numberAddress
    this.cep = address.cep
  }
}