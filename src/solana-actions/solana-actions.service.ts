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
        description: '👋 Welcome to Wings, Search flights using blinks.',
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
                  required: true,
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
        value: `✈️ ${city.name}, - 📍 ${city.location} (${city.iata})`,
      }));

      console.log(`this are codes :`, departureCityCodes);
      console.log(`this is account :`, userAccount);

      const payload: ActionGetResponse = {
        type: 'action',
        icon: 'https://i.ibb.co/qDFWWq3/wings-high-resolution-logo.png',
        title: 'Wings',
        description:
          '👉 Please Select your depature city airport.\n👉 Fill in  your destination city.',
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
                  required: true,
                },
                {
                  label: 'Destination city (e.g london)',
                  name: 'destinationCity', // name template literal
                  required: true,
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
        value: `✈️ ${city.name}, - 📍 ${city.location} (${city.iata})`,
      }));

      console.log(`this are codes :`, destinationCodes);
      console.log(`this is account :`, userAccount);

      const payload: ActionGetResponse = {
        type: 'action',
        icon: 'https://i.ibb.co/qDFWWq3/wings-high-resolution-logo.png',
        title: 'Wings',
        description: `Depature: ${departureCityCode}\n\n👉 Please Select your destination city airport.\n👉 Pick a departure date.`,
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
                  required: true,
                },
                {
                  label: 'Pick depature date',
                  name: 'departureDate', // name template literal
                  type: 'date',
                  required: true,
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
  getFlightsAction = async (
    departureCity?: string,
    userAccount?: string,
    departureCityCode?: string,
    destinationCity?: string,
    destinationCityCode?: string,
    departureDate?: string,
  ) => {
    function convertDateTime(inputDateTime) {
      // Parse the input datetime string
      const dt = new Date(inputDateTime);
      // Array of day names
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      // Array of month names
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      // Get the day of the week
      const dayOfWeek = days[dt.getUTCDay()];

      // Get the month name
      const monthName = months[dt.getUTCMonth()];

      // Get the day of the month
      const dayOfMonth = dt.getUTCDate();

      // Get the hour, minute, and AM/PM
      let hour = dt.getUTCHours();
      let minute: any = dt.getUTCMinutes();
      const ampm = hour >= 12 ? 'pm' : 'am';
      hour = hour % 12;
      hour = hour ? hour : 12; // Handle midnight
      minute = minute < 10 ? '0' + minute : minute;

      // Combine all parts to form the desired format
      const formattedDateTime = `${dayOfWeek}, ${monthName} ${dayOfMonth} - ${hour}:${minute}${ampm}`;

      return formattedDateTime;
    }
    try {
      console.log(baseURL);
      const onewayFlights =
        await this.flightService.searchAvailableOneWayFlight({
          departureCityCode,
          destinationCityCode,
          departureDate,
        });

      console.log(`these are one way flight :`, onewayFlights);

      const formattedFlights = onewayFlights.completeFlights.map((flight) => {
        const leg = flight.legs[0];

        // Extract information from the flight leg
        const id = flight.id;
        const cityFrom = leg.origin.city || '';
        const cityTo = leg.destination.city || '';
        const countryFrom = leg.origin.country || '';
        const countryTo = leg.destination.country || '';
        const cityFromCode = leg.origin.displayCode || '';
        const cityToCode = leg.destination.displayCode || '';
        const oneWayStops = leg?.stopCount;
        const routeDepartureTime = leg?.departure || '';
        const routeArrivalTime = leg?.arrival || '';
        const Price = flight.price['raw'] || '';
        const carriers = {
          name1: leg?.carriers.marketing[0]?.name || '',
          logo1: leg?.carriers.marketing[0]?.logoUrl || '',
          name2: leg?.carriers.marketing[0]?.name || '',
          logo2: leg?.carriers.marketing[0]?.logoUrl || '',
        };

        // Format and return the desired object
        return {
          label: `${cityFrom}, ${countryFrom}(${cityFromCode}) - ${cityTo}, ${countryTo}(${cityToCode})\n\n🔄 Stops: ${oneWayStops}\n🕛 Depature: ${convertDateTime(routeDepartureTime)}\n🕛 Arrival: ${convertDateTime(routeArrivalTime)}\n\n 🛫 ${carriers.name1}\n💰 Price: $${Price}\n`,
          value: `(${id})(${Price})${cityFrom}, ${countryFrom}(${cityFromCode}) - ${cityTo}, ${countryTo}(${cityToCode}\n🔄 Stops: ${oneWayStops}\n🕛 Depature: ${convertDateTime(routeDepartureTime)}\n🕛 Arrival: ${convertDateTime(routeArrivalTime)}\n\n 🛫 ${carriers.name1}\n💰 Price: $${Price}\n`,
        };
      });

      const payload: ActionGetResponse = {
        type: 'action',
        icon: 'https://i.ibb.co/qDFWWq3/wings-high-resolution-logo.png',
        title: 'Wings',
        description: `=>Depature: ${departureCityCode}.\n=>Destination: ${destinationCityCode}.\n=>Depature date: 📆 ${departureDate}.\n\n➤Available flights 👇.`,
        label: `Destination City`,
        disabled: false,
        links: {
          actions: [
            {
              href: `${baseURL}/solana-action?depatureCity=${departureCity}&userAccount=${userAccount}&destinationCity=${destinationCity}&departureCityCode=${departureCityCode}&destinationCityCode=${destinationCityCode}&departureDate=${departureDate}&token=${onewayFlights.token}&selectedFlight={selectedFlight}&stage=4`,
              label: `Next`, // button text
              parameters: [
                {
                  label: 'Select any available flight',
                  name: 'selectedFlight',
                  type: 'checkbox',
                  options: [...formattedFlights],
                  required: true,
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

  getUserDetailsAction = async (
    departureCity?: string,
    userAccount?: string,
    departureCityCode?: string,
    destinationCity?: string,
    destinationCityCode?: string,
    departureDate?: string,
    token?: string,
    selectedFlight?: string,
  ) => {
    function extractAndRemoveIdAndPrice(text) {
      // Define regex patterns for ID and price
      const idPattern = /\(\d{5,}(-\d+)+\)/;
      const pricePattern = /\$\d+/;

      // Search for the ID and price patterns
      const idMatch = text.match(idPattern);
      const priceMatch = text.match(pricePattern);

      // Extract the ID and price if they are found
      const extractedId = idMatch ? idMatch[0].replace(/[()]/g, '') : null;
      const extractedPrice = priceMatch ? priceMatch[0].replace('$', '') : null;

      // Remove the ID and price from the original text
      let remainingText = text;
      if (idMatch) {
        remainingText = remainingText.replace(idPattern, '').trim();
      }
      if (priceMatch) {
        remainingText = remainingText.replace(pricePattern, '').trim();
      }

      // Return the extracted ID, price, and the remaining text
      return {
        id: extractedId,
        price: extractedPrice,
        remainingText: remainingText,
      };
    }

    // // Example usage
    const text =
      '(11348-2409091445--30686-0-13681-2409091545)(103)Enugu, Nigeria(ENU) - Lagos, Nigeria(LOS🔄 Stops: 0🕛 Depature: Mon, Sep 9 - 1:45pm🕛 Arrival: Mon, Sep 9 - 2:45pm 🛫 United Nigeria Airlines💰 Price: $103';

    const result = extractAndRemoveIdAndPrice(text);
    console.log('ID:', result.id);
    console.log('Price:', result.price);
    console.log('Remaining Text:', result.remainingText);

    try {
      const saperated = extractAndRemoveIdAndPrice(selectedFlight);

      console.log(baseURL);
      const payload: ActionGetResponse = {
        type: 'action',
        icon: 'https://i.ibb.co/qDFWWq3/wings-high-resolution-logo.png',
        title: 'Wings',
        description: `📝 Flight details: ${saperated.remainingText}`,
        label: `Destination City`,
        disabled: false,
        links: {
          actions: [
            {
              href: `${baseURL}/solana-action?depatureCity=${departureCity}&userAccount=${userAccount}&destinationCity=${destinationCity}&departureCityCode=${departureCityCode}&destinationCityCode=${destinationCityCode}&departureDate=${departureDate}&token=${token}&selectedFlight=${selectedFlight}&id=${saperated.id}&price=${saperated.price}&firstName={firstName}&lastName={lastName}&email={email}&stage=5`,
              label: `Book $${saperated.price}`, // button text
              parameters: [
                {
                  label: 'First Name',
                  name: 'firstName', // name template literal
                  required: true,
                },
                {
                  label: 'Last Name',
                  name: 'lastName', // name template literal
                  required: true,
                },
                {
                  label: 'Email',
                  name: 'email', // name template literal
                  required: true,
                  type: 'email',
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
      const token = data.token;
      const selectedFlight = data.selectedFlight;
      const firstName = data.firstName;
      const lastName = data.lastName;
      const email = data.email;
      const price = data.price;

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
      if (stage === '5') {
        console.log('ENDDDDDDDD');
        const transaction = new Transaction();

        // Transfer 10% of the funds to the default SOL address
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: account,
            toPubkey: ADMIN_WALLET,
            lamports: LAMPORTS_PER_SOL * price,
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
              href: `${baseURL}/solana-action/next-action?depatureCity=${depatureCity}&user=${account}}&stage=${stage}&departureCityCode=${departureCityCode}&destinationCity=${destinationCity}&destinationCityCode=${destinationCityCode}&departureDate=${departureDate}&token=${token}&selectedFlight=${selectedFlight}&firstName=${firstName}&lastName=${lastName}&email=${email}`,
            },
          },
          message: `next stage`,
        };
        //   console.log('Payload:', payload);
        //   console.log('Transaction:', transaction);
        return payload;
      }

      const transaction = new Transaction();

      // Transfer 10% of the funds to the default SOL address
      //   transaction.add(
      //     SystemProgram.transfer({
      //       fromPubkey: account,
      //       toPubkey: ADMIN_WALLET,
      //       lamports: 0,
      //     }),
      //   );

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
            href: `${baseURL}/solana-action/next-action?depatureCity=${depatureCity}&user=${account}}&stage=${stage}&departureCityCode=${departureCityCode}&destinationCity=${destinationCity}&destinationCityCode=${destinationCityCode}&departureDate=${departureDate}&token=${token}&selectedFlight=${selectedFlight}&firstName=${firstName}&lastName=${lastName}&email=${email}`,
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
