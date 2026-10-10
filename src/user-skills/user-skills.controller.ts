import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserSkillsService } from './user-skills.service';
import { AddUserSkillDto } from './dto/add-user-skill.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('users/me/skills')
export class UserSkillsController {
  constructor(private readonly userSkillsService: UserSkillsService) {}

  @Post()
  addSkill(@Req() req: any, @Body() dto: AddUserSkillDto) {
    return this.userSkillsService.addSkill(req.user.sub, dto);
  }

  @Delete(':id')
  removeSkill(@Req() req: any, @Param('id') id: string) {
    return this.userSkillsService.removeSkill(req.user.sub, id);
  }
}