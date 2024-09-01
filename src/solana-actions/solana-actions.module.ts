import { Module } from '@nestjs/common';
import { SolanaActionController } from './solana-actions.controller';
import { SolanaActionService } from './solana-actions.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SolanaActionController],
  providers: [SolanaActionService],
  exports: [SolanaActionService],
})
export class SolanaActionsModule {}
