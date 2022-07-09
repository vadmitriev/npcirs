import { UserDto } from 'src/modules/users/dto/user.dto';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';
import { User } from '../users/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: User })
  @ApiOperation({ summary: 'Login' })
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  @ApiOperation({ summary: 'SignUp' })
  @ApiBody({ type: User })
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}
