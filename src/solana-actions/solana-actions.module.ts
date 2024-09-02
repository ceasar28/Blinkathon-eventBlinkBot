import { Module } from '@nestjs/common';
import { SolanaActionController } from './solana-actions.controller';
import { SolanaActionService } from './solana-actions.service';
import { DatabaseModule } from 'src/database/database.module';
import { FlightSearchModule } from 'src/flight-search/flight-search.module';

@Module({
  imports: [DatabaseModule, FlightSearchModule],
  controllers: [SolanaActionController],
  providers: [SolanaActionService],
  exports: [SolanaActionService],
})
export class SolanaActionsModule {}
