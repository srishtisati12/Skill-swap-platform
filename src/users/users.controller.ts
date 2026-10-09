import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMyProfile(@Req() request: any) {
    return this.usersService.findUserById(request.user.sub);
  }

  @Patch('me')
  updateMyProfile(
    @Req() request: any,
    @Body() data: UpdateUserDto,
  ) {
    return this.usersService.updateUser(
      request.user.sub,
      data,
    );
  }
}