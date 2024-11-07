import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'Inscription réussie' })
  @ApiForbiddenResponse({
    description:
      'Email invalide | Email existant | Mot de passe trop court | Mot de passe sans minuscule | Mot de passe sans majuscule | Mot de passe sans chiffre',
  })
  create(@Body() registerDto: RegisterDto) {
    return this.authService.signUp(registerDto);
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'Authentification réussie' })
  @ApiForbiddenResponse({
    description: 'Email inexistant | Mot de passe incorrect',
  })
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }
}
