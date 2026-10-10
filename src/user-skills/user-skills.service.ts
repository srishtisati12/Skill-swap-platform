
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSkill } from './schemas/user-skill.schema';
import { AddUserSkillDto } from './dto/add-user-skill.dto';

@Injectable()
export class UserSkillsService {
  constructor(
    @InjectModel(UserSkill.name)
    private userSkillModel: Model<UserSkill>,
  ) {}

  async addSkill(userId: string, dto: AddUserSkillDto) {
    const existingSkill = await this.userSkillModel.findOne({
      userId,
      skillId: dto.skillId,
      type: dto.type,
    });

    if (existingSkill) {
      throw new ConflictException(
        'You have already added this skill with the same type',
      );
    }

    return this.userSkillModel.create({
      userId,
      skillId: dto.skillId,
      type: dto.type,
    });
  }

  async removeSkill(userId: string, id: string) {
    const result = await this.userSkillModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!result) {
      throw new NotFoundException('User skill not found');
    }

    return { message: 'Skill removed successfully' };
  }
}