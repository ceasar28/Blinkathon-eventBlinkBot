import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { DatabaseModule } from './database/database.module';
import { TicketModule } from './ticket/ticket.module';
import { SolanaActionsModule } from './solana-actions/solana-actions.module';

@Module({
  imports: [BotModule, DatabaseModule, TicketModule, SolanaActionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
