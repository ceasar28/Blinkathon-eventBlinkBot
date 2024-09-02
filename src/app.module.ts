import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SolanaActionsModule } from './solana-actions/solana-actions.module';
import { FlightSearchModule } from './flight-search/flight-search.module';

@Module({
  imports: [DatabaseModule, SolanaActionsModule, FlightSearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
