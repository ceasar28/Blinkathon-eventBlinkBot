import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import type { Response } from 'express';
import { SolanaActionService } from './solana-actions.service';
import { ACTIONS_CORS_HEADERS, ActionPostRequest } from '@solana/actions';
import { PublicKey } from '@solana/web3.js';

@Controller('solana-action')
export class SolanaActionController {
  constructor(private readonly solanaActionService: SolanaActionService) {}

  @Get()
  // @Header('headers', `${ACTIONS_CORS_HEADERS}`)
  async getFlightDepatureCityAction() {
    try {
      // console.log(req.headers['host']);
      // const baseUrl = `${req['protocol']}://${req.headers['host']}`;
      // console.log(baseUrl);
      return await this.solanaActionService.getFlightDepatureCityAction();
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  // @Header('headers', `${ACTIONS_CORS_HEADERS}`)
  async postFlightDepatureCityAction(
    @Query('depatureCity') depatureCity: string,
    @Body() bodyData: ActionPostRequest,
  ) {
    try {
      console.log({ ...bodyData, depatureCity });

      return await this.solanaActionService.postFlightDepatureCityAction({
        ...bodyData,
        depatureCity,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Post('next-action')
  // @Header('headers', `${ACTIONS_CORS_HEADERS}`)
  async postNextAction(@Body() bodyData: ActionPostRequest) {
    try {
      console.log(`this is the body :`, { ...bodyData });
      // Validate the client-provided input

      //   const responsePayload =
      return await this.solanaActionService.postFlightDepatureCityAction({
        account: '7eBmtW8CG1zJ6mEYbTpbLRtjD1BLHdQdU5Jc8Uip42eE',
        depatureCity: 'london',
      });
      //   if (responsePayload) {
      //     res.set(ACTIONS_CORS_HEADERS);
      //     console.log(responsePayload);
      //     return res.json(responsePayload);
      //   }
      return;
    } catch (error) {
      console.log(error);
    }
  }
}
