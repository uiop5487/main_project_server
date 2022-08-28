import {
  ConflictException,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersServices {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findEmail({ email }) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne({ userId }) {
    return this.usersRepository.findOne({
      where: { id: userId },
    });
  }

  async create({ createUserInput, hashedPassword: password }) {
    const email = await this.usersRepository.findOne({
      where: { email: createUserInput.email },
    });

    if (email) throw new ConflictException('이미 등록된 이메일입니다.');

    const result = await this.usersRepository.save({
      ...createUserInput,
      password,
    });
    console.log(result);
    return result;
  }

  async update({ userEmail, updateUserInput }) {
    const user = await this.usersRepository.findOne({
      where: { email: userEmail },
    });

    if (updateUserInput.email !== undefined) {
      const emails = await this.usersRepository.findOne({
        where: { email: updateUserInput.email },
      });

      if (emails) throw new ConflictException('이미 등록된 이메일입니다.');
    }

    const result = this.usersRepository.save({
      ...user,
      id: user.id,
      ...updateUserInput,
    });
    return result;
  }

  async delete({ email: userEmail }) {
    const result = await this.usersRepository.softDelete({ email: userEmail });
    return result.affected ? true : false;
  }

  async updatePwd({ user, hashedPassword }) {
    this.usersRepository.save({
      ...user,
      id: user.id,
      password: hashedPassword,
    });
  }
}
