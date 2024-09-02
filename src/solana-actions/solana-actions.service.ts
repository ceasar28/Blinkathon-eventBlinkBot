import { Injectable } from '@nestjs/common';
import {
  ActionGetResponse,
  ActionPostResponse,
  //createPostResponse,
} from '@solana/actions';
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { DatabaseService } from 'src/database/database.service';
import { FlightSearchService } from 'src/flight-search/flight-search.service';

const ADMIN_WALLET = new PublicKey(process.env.ADMIN_WALLET);
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://eventblink.xyz'
    : 'http://localhost:3001';

@Injectable()
export class SolanaActionService {
  constructor(
    private readonly database: DatabaseService,
    private readonly flightService: FlightSearchService,
  ) {}

  //   getAction = async (eventId?: string) => {
  //     try {
  //       console.log(baseURL);

  //       const eventTicket = await this.database.event.findFirst({
  //         where: { id: +eventId || 6 },
  //       });

  //       if (eventTicket) {
  //         const payload: ActionGetResponse = {
  //           icon: eventTicket?.media
  //             ? `${baseURL}/bot/${eventTicket.media}`
  //             : `https://i.ibb.co/PxqQCTQ/eventblinkbot-high-resolution-logo.jpg`,
  //           title: eventTicket?.eventName,
  //           description: eventTicket?.description,
  //           label: `Buy Ticket  (${eventTicket?.price} SOL)`,
  //           disabled: false,
  //           links: {
  //             actions: [
  //               {
  //                 href: `${baseURL}/solana-action?event=${eventTicket?.id}&email={Email}&name={Name}`,
  //                 label: `Buy Ticket  (${eventTicket?.price ? eventTicket.price : 0} SOL)`, // button text
  //                 parameters: [
  //                   {
  //                     name: 'Name', // name template literal
  //                     label: 'Enter you name', // placeholder for the input
  //                   },
  //                   {
  //                     name: 'Email', // name template literal
  //                     label: 'Enter your email address', // placeholder for the input
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         };
  //         return payload;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  // to get users departure city

  getFlightDepatureCityAction = async () => {
    try {
      console.log(baseURL);

      const payload: ActionGetResponse = {
        type: 'action',
        icon: 'https://i.ibb.co/qDFWWq3/wings-high-resolution-logo.png',
        title: 'Wings',
        description: 'Welcome to Wings, Search flights using blinks.',
        label: `Depature City`,
        disabled: false,
        links: {
          actions: [
            {
              href: `${baseURL}/solana-action?depatureCity={depatureCity}&stage=1`,
              label: `Next`, // button text
              parameters: [
                {
                  name: 'depatureCity', // name template literal
                  label: 'Depature city (e.g Milan)', // placeholder for the input
                },
              ],
            },
          ],
        },
      };
      return payload;
    } catch (error) {
      console.log(error);
    }
  };

  // to get users destination city
  getFlightDestinationCityAction = async (
    departureCity?: string,
    userAccount?: string,
  ) => {
    try {
      console.log(baseURL);
      let departureCityCodes =
        await this.flightService.searchAirport(departureCity);

      if (!departureCity) {
        departureCityCodes = [];
      }

      // use a fucntion to get the code from the parenthesis
      const formattedCityCode = departureCityCodes.map((city) => ({
        label: `${city.name}, --> ${city.location}`,
        value: `${city.name}, - ${city.location} (${city.iata})`,
      }));

      console.log(`this are codes :`, departureCityCodes);
      console.log(`this is account :`, userAccount);

      const payload: ActionGetResponse = {
        type: 'action',
        icon: 'https://i.ibb.co/qDFWWq3/wings-high-resolution-logo.png',
        title: 'Wings',
        description:
          '* Please Select your depature city airport.\n* Fill in  your destination city.',
        label: `Destination City`,
        disabled: false,
        links: {
          actions: [
            {
              href: `${baseURL}/solana-action?depatureCity=${departureCity}&userAccount=${userAccount}&departureCityCode={departureCityCode}&destinationCity={destinationCity}&stage=2`,
              label: `Next`, // button text
              parameters: [
                {
                  label: 'Select your depature city Airport',
                  name: 'departureCityCode',
                  type: 'checkbox',
                  options: [...formattedCityCode],
                },
                {
                  label: 'Destination city (e.g london)',
                  name: 'destinationCity', // name template literal
                },
              ],
            },
          ],
        },
      };
      return payload;
    } catch (error) {
      console.log(error);
    }
  };

  // to get users departure date
  getFlightDepartureDateAction = async (
    departureCity?: string,
    userAccount?: string,
    departureCityCode?: string,
    destinationCity?: string,
  ) => {
    try {
      console.log(baseURL);
      let destinationCodes =
        await this.flightService.searchAirport(destinationCity);

      if (!departureCity) {
        destinationCodes = [];
      }

      // use a fucntion to get the code from the parenthesis
      const formattedCityCode = destinationCodes.map((city) => ({
        label: `${city.name}, --> ${city.location}`,
        value: `${city.name}, - ${city.location} (${city.iata})`,
      }));

      console.log(`this are codes :`, destinationCodes);
      console.log(`this is account :`, userAccount);

      const payload: ActionGetResponse = {
        type: 'action',
        icon: 'https://i.ibb.co/qDFWWq3/wings-high-resolution-logo.png',
        title: 'Wings',
        description: `Depature: ${departureCityCode}\n\n*Please Select your destination city airport.\n*Pick a departure date.`,
        label: `Destination City`,
        disabled: false,
        links: {
          actions: [
            {
              href: `${baseURL}/solana-action?depatureCity=${departureCity}&userAccount=${userAccount}&destinationCity=${destinationCity}&departureCityCode=${departureCityCode}&destinationCityCode={destinationCityCode}&departureDate={departureDate}&stage=3`,
              label: `Next`, // button text
              parameters: [
                {
                  label: 'Select your destination city Airport',
                  name: 'destinationCityCode',
                  type: 'checkbox',
                  options: [...formattedCityCode],
                },
                {
                  label: 'Pick depature date',
                  name: 'departureDate', // name template literal
                  type: 'date',
                },
              ],
            },
          ],
        },
      };
      return payload;
    } catch (error) {
      console.log(error);
    }
  };

  postAction = async (data: any) => {
    try {
      console.log(baseURL);
      console.log(data);
      const depatureCity = data.depatureCity;
      const account: PublicKey = new PublicKey(data.account);
      const stage = data.stage;
      const departureCityCode = data.departureCityCode;
      const destinationCity = data.destinationCity;
      const destinationCityCode = data.destinationCityCode;
      const departureDate = data.departureDate;

      // check if user exist
      const userExist = await this.database.user.findFirst({
        where: { userAccount: `${account}` },
      });

      if (!userExist) {
        await this.database.user.create({
          data: {
            userAccount: `${account}`,
          },
        });
      }

      const connection = new Connection(
        process.env.SOLANA_RPC! || clusterApiUrl('devnet'),
      );

      // // Ensure the receiving account will be rent exempt
      // const minimumBalance = await connection.getMinimumBalanceForRentExemption(
      //   0, // Note: simple accounts that just store native SOL have `0` bytes of data
      // );

      const transaction = new Transaction();

      // Transfer 10% of the funds to the default SOL address
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: account,
          toPubkey: ADMIN_WALLET,
          lamports: LAMPORTS_PER_SOL * 0,
        }),
      );

      // Set the end user as the fee payer
      transaction.feePayer = account;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;

      const payload: ActionPostResponse = {
        transaction: transaction
          .serialize({
            requireAllSignatures: false,
            verifySignatures: true,
          })
          .toString('base64'),
        links: {
          next: {
            type: 'post',
            href: `${baseURL}/solana-action/next-action?depatureCity=${depatureCity}&user=${account}}&stage=${stage}&departureCityCode=${departureCityCode}&destinationCity=${destinationCity}&destinationCityCode=${destinationCityCode}$departureDate=${departureDate}`,
          },
        },
        message: `next stage`,
      };
      //   console.log('Payload:', payload);
      //   console.log('Transaction:', transaction);
      return payload;
    } catch (error) {
      console.log(error);
    }
  };
}
