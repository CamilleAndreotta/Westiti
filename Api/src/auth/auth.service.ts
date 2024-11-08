import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private userService: UserService,
    @Inject(JwtService)
    private jwtService: JwtService,
  ) {}

  async signUp(registerDto: RegisterDto) {
    if (
      !registerDto.email.match(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i)
    ) {
      throw new UnauthorizedException({ message: 'Email invalide' });
    }

    const user = await this.userService.findByEmail(registerDto.email);
    if (user) {
      throw new UnauthorizedException({ message: 'Email existant' });
    }

    if (
      registerDto.password.match(/[a-z]/g) === null ||
      registerDto.password.match(/[A-Z]/g) === null ||
      registerDto.password.match(/[0-9]/g) === null ||
      registerDto.password.match(/[^a-zA-Z\d]/g) === null
    ) {
      throw new UnauthorizedException({ message: 'Mot de passe faible' });
    }

    if (registerDto.password.length < 12) {
      throw new UnauthorizedException({ message: 'Mot de passe trop court' });
    }

    const userDto: CreateUserDto = {
      email: registerDto.email,
      password: registerDto.password,
      name: registerDto.name,
    };
    return this.userService.create(userDto);
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException({ message: 'Email inexistant' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException({ message: 'Mot de passe incorrect' });
    }

    const payload = { id: user.id, email: user.email };
    return {
      id: user.id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
