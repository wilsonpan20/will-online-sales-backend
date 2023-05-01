import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async createUser(CreateUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;
    const passwordHashed = await hash(CreateUserDto.password, saltOrRounds);

    return this.userRepository.save({
      ...CreateUserDto,
      typeUser: 2,
      password: passwordHashed,
    });
  }
  async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {

    return this.userRepository.findOne({
      where: {
        id: userId
      },
      relations: {
        addresses: {
          city: {
            state: true
          }
        }
      }

    })

  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUSerById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    })
    if (!user) {
      throw new NotFoundException(`UserId: ${userId}  Not Found`)
    }
    return user
  }
}
