import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { DatabaseModule } from './database/database.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [BotModule, DatabaseModule, TicketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
