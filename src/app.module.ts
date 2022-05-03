import { Module } from '@nestjs/common';
import { AppointmentModule } from './domain/appointment/appointment.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './config/jwt.config';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    AppointmentModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
