import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { PhotoModule } from './photo/photo.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [UserModule, AuthModule, EventModule, PhotoModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Chemin vers le dossier public
      serveRoot: '/public', // Préfixe dans l'URL
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}