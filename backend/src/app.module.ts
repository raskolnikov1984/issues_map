import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CasesModule } from './cases/cases.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, AuthModule, CasesModule],
})
export class AppModule {}
