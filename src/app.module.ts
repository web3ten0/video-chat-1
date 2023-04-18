import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChatSpacesModule } from './chat-spaces/chat-spaces.module';
import { AuthController } from './auth/auth.controller';
import { HomeController } from './home/home.controller';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { InvitationsModule } from './invitations/invitations.module';
import * as ConnectPgSimple from 'connect-pg-simple';
import * as pg from 'pg';
import * as session from 'express-session';
import * as passport from 'passport';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    ChatSpacesModule,
    AuthModule,
    PassportModule,
    InvitationsModule,
  ],
  controllers: [AppController, AuthController, HomeController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const sessionConfig = session({
      store: new (ConnectPgSimple(session))({
        pool: new pg.Pool({ connectionString: process.env.DATABASE_URL }),
        tableName: 'Session',
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1週間
        sameSite: true,
        httpOnly: false,
      },
    });
    consumer
      .apply(sessionConfig, passport.initialize(), passport.session())
      .forRoutes('*');
  }
}
