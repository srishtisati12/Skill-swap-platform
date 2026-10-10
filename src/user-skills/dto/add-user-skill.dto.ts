import { IsIn, IsMongoId } from 'class-validator';

export class AddUserSkillDto {
  @IsMongoId()
  skillId: string;

  @IsIn(['TEACH', 'LEARN'])
  type: string;
}