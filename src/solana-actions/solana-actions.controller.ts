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
  async postAction(
    @Query('depatureCity') depatureCity: string,
    @Query('stage') stage: string,
    @Query('departureCityCode') departureCityCode: string,
    @Query('destinationCity') destinationCity: string,
    @Query('destinationCityCode') destinationCityCode: string,
    @Query('departureDate') departureDate: string,
    @Query('token') token: string,
    @Query('selectedFlight') selectedFlight: string,
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
    @Query('email') email: string,
    @Query('id') id: string,
    @Query('price') price: string,
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
        token,
        selectedFlight,
        firstName,
        lastName,
        email,
        id,
        price,
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
    @Query('token') token: string,
    @Query('selectedFlight') selectedFlight: string,
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
      } else if (stage === '3') {
        return await this.solanaActionService.getFlightsAction(
          depatureCity!,
          user!,
          departureCityCode!,
          destinationCity!,
          destinationCityCode!,
          departureDate!,
        );
      } else if (stage === '4') {
        return await this.solanaActionService.getUserDetailsAction(
          depatureCity!,
          user!,
          departureCityCode!,
          destinationCity!,
          destinationCityCode!,
          departureDate!,
          token!,
          selectedFlight!,
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
