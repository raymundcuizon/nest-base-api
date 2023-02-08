import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { AuthConfiguration } from './auth.configuration';
import { CongnitoAuthGuard } from './congito.guard';
import { JwtStrategy } from './jwt.strategy';
import { DbClientsProvider } from "../dynamoDB/db-clients.provider";


@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
],
  providers: [
    DbClientsProvider,
    AuthConfiguration,
    JwtStrategy,
    CongnitoAuthGuard,
    AuthService, 
    AuthResolver]
})
export class AuthModule {}
