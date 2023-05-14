import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async createUser(CreateUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findUSerByEmail(CreateUserDto.email).catch(() => undefined)

    if (user) {
      throw new BadGatewayException('email registered in system')
    }


    const saltOrRounds = 10;
    const passwordHashed = await hash(CreateUserDto.password, saltOrRounds);

    return this.userRepository.save({
      ...CreateUserDto,
      typeUser: UserType.User,
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

  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new NotFoundException(`UserId: ${userId}  Not Found`)
    }

    return user;
  }

  async findUSerByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email
      }
    })

    if (!user) {
      throw new NotFoundException(`Email: ${email}  Not Found`)
    }
    return user
  }
}
