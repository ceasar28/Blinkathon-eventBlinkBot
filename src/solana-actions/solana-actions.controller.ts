import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SolanaActionService } from './solana-actions.service';
import { ActionPostRequest } from '@solana/actions';

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
  async postNextAction(
    @Query('depatureCity') depatureCity: string,
    @Query('user') user: string,
    @Query('sessionId') sessionId: string,
    @Body() bodyData: ActionPostRequest,
  ) {
    try {
      console.log(`this is the body :`, { ...bodyData });
      // Validate the client-provided input

      //   const responsePayload =
      return await this.solanaActionService.getFlightDestinationCityAction(
        depatureCity!,
        user!,
        sessionId!,
      );
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
