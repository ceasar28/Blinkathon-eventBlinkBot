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
    @Query('stage') stage: string,
    @Query('departureCityCode') departureCityCode: string,
    @Query('destinationCity') destinationCity: string,
    @Query('destinationCityCode') destinationCityCode: string,
    @Query('departureDate') departureDate: string,
    @Body()
    bodyData: ActionPostRequest,
  ) {
    try {
      console.log({ ...bodyData, depatureCity, stage });

      return await this.solanaActionService.postAction({
        ...bodyData,
        depatureCity,
        stage,
        departureCityCode,
        destinationCity,
        destinationCityCode,
        departureDate,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Post('next-action')
  async postNextAction(
    @Query('depatureCity') depatureCity: string,
    @Query('user') user: string,
    @Query('stage') stage: string,
    @Query('departureCityCode') departureCityCode: string,
    @Query('destinationCity') destinationCity: string,
    @Query('destinationCityCode') destinationCityCode: string,
    @Query('departureDate') departureDate: string,
    @Body() bodyData: ActionPostRequest,
  ) {
    try {
      console.log(`this is the body :`, { ...bodyData });
      // Validate the client-provided input

      //   const responsePayload =
      if (stage === '1') {
        return await this.solanaActionService.getFlightDestinationCityAction(
          depatureCity!,
          user!,
        );
      } else if (stage === '2') {
        return await this.solanaActionService.getFlightDepartureDateAction(
          depatureCity!,
          user!,
          departureCityCode!,
          destinationCity!,
        );
      }

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

  //   @Post('destination')
  //   async postDestinationAction(
  //     @Query('depatureCity') depatureCity: string,
  //     @Query('user') user: string,
  //     @Query('sessionId') sessionId: string,
  //     @Body() bodyData: ActionPostRequest,
  //   ) {
  //     try {
  //       console.log(`this is the body :`, { ...bodyData });
  //       // Validate the client-provided input

  //       //   const responsePayload =
  //       return await this.solanaActionService.getFlightDestinationCityAction(
  //         depatureCity!,
  //         user!,
  //       );
  //       //   if (responsePayload) {
  //       //     res.set(ACTIONS_CORS_HEADERS);
  //       //     console.log(responsePayload);
  //       //     return res.json(responsePayload);
  //       //   }
  //       return;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
}
