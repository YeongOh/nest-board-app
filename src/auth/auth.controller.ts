import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  signUp(@Body() AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.createUser(AuthCredentialsDto);
  }

  @Post('signin')
  signIn(
    @Body() AuthCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(AuthCredentialsDto);
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@GetUser() req) {
    console.log(req);
  }
}
