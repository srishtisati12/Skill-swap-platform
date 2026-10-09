import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createUser(data: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: data.email,
    });

    if (existingUser) {
      throw new ConflictException('User Already Exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.userModel.create({
      id: randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      bio: data.bio,
      location: data.location,
      profileImage: data.profileImage,
      passwordHash: hashedPassword,
      role: 'USER',
    });
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findUserById(id: string) {
    const user = await this.userModel.findOne({ id });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const user = await this.userModel.findOneAndUpdate(
      { id },
      { $set: data },
      { new: true },
    );

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }
}