import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET') || 'supersecret',
                signOptions: { expiresIn: '1h' },
            }),
        }),
        forwardRef(() => UsersModule), // Use forwardRef here too
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService], // Export AuthService so UsersModule can use it
})
export class AuthModule { }