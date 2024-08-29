import { Injectable } from '@nestjs/common';
import puppeteer, { Puppeteer } from 'puppeteer';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://eventblink.xyz'
    : 'http://localhost:3001';
@Injectable()
export class TicketService {
  generateTicketShot = async () => {
    try {
      // create a dynamic HTML string for the certificate
      const html = await this.ticketTemplate();
      // Use Puppeteer to generate the PNG
      // const browser = await puppeteer.launch({
      //   headless: "new",
      // });

      const browser = await puppeteer.launch({
        executablePath:
          process.env.NODE_ENV === 'production'
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
        timeout: 60000, // Set a higher timeout value
      });
      const page = await browser.newPage();

      await page.setContent(html);
      //   await page.addStyleTag({ content: css });

      // Adjust the viewport size if necessary
      await page.setViewport({ width: 1172, height: 698 });
      //{ width: 900, height: 850 }
      // {width: 1080, height: 1024}
      /*  
      take a screenshot and save it as a PNG, 
      use clip to crop the image if needed 
    */
      const screenshot = await page.screenshot();

      // close the browser
      await browser.close();

      console.log(screenshot);
      // returns the screenshot
      return screenshot;
    } catch (error) {
      console.log(error);
    }
  };

  generateReviewShot = async (data: any) => {
    try {
      const html = await this.eventDetailsTemplate(data);

      // Use Puppeteer to generate the PNG
      // const browser = await puppeteer.launch({
      //   headless: "new",
      // });

      const browser = await puppeteer.launch({
        executablePath:
          process.env.NODE_ENV === 'production'
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
        timeout: 60000, // Set a higher timeout value
      });
      const page = await browser.newPage();

      await page.setContent(html);
      //   await page.addStyleTag({ content: css });

      // Adjust the viewport size if necessary
      //{ width: 1172, height: 698 }
      await page.setViewport({ width: 900, height: 850 });
      //{ width: 900, height: 850 }
      // {width: 1080, height: 1024}
      /*  
      take a screenshot and save it as a PNG, 
      use clip to crop the image if needed 
    */
      const screenshot = await page.screenshot();

      // close the browser
      await browser.close();

      console.log(screenshot);
      // returns the screenshot
      return screenshot;
    } catch (error) {
      console.log(error);
    }
  };

  generateMediaShot = async (data: any) => {
    try {
      const html = await this.eventMediaTemplate(data);
      // Use Puppeteer to generate the PNG
      // const browser = await puppeteer.launch({
      //   headless: "new",
      // });

      const browser = await puppeteer.launch({
        executablePath:
          process.env.NODE_ENV === 'production'
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
        timeout: 60000, // Set a higher timeout value
      });
      const page = await browser.newPage();

      await page.setContent(html);
      //   await page.addStyleTag({ content: css });

      // Adjust the viewport size if necessary
      //{ width: 1172, height: 698 }
      await page.setViewport({ width: 900, height: 850 });
      //{ width: 900, height: 850 }
      // {width: 1080, height: 1024}
      /*  
      take a screenshot and save it as a PNG, 
      use clip to crop the image if needed 
    */
      const screenshot = await page.screenshot();

      // close the browser
      await browser.close();

      console.log(screenshot);
      // returns the screenshot
      return screenshot;
    } catch (error) {
      console.log(error);
    }
  };

  ticketTemplate = async () => {
    try {
      const ticketHTML = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Ticket</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f7f7f7;
        }

        .ticket {
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 600px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .ticket h1 {
            font-size: 20px;
            margin-bottom: 10px;
        }

        .ticket p {
            margin: 5px 0;
            font-size: 16px;
        }

        .ticket .header,
        .ticket .details {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .ticket .header img {
            width: 200px;
        }

        .ticket .qr-code img {
            width: 150px;
            height: 150px;
        }

        .ticket .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #999;
        }
    </style>
</head>

<body>
    <div class="ticket">
        <div class="header">
            <h1>This is your ticket</h1>
            <!-- <img src="https://i.ibb.co/PxqQCTQ/eventblinkbot-high-resolution-logo.jpg" alt="Google Developer Groups"> -->
            <p>EventBlink Bot</p>
        </div>
        <div class="details">
            <div>
                <p><strong>Google Developer Groups - GDG Enugu</strong></p>
                <p>Google I/O Extended: Enugu Chapter</p>
                <p>Hotel Sylvia Independence Avenue, Enugu</p>
                <p><strong>JUL 13, 2024, 9:00 AM (WAT)</strong></p>
                <p><strong>ISSUED TO</strong>: Emmanuel Ekete</p>
                <p><strong>ORDER NUMBER</strong>: GOOGE241069761</p>
                <p><strong>TICKET</strong>: Google I/O Extended FREE</p>
                <p><strong>Registered</strong>: JUN 26, 2024</p>
            </div>
            <div class="qr-code">
                <img src="https://i.ibb.co/PxqQCTQ/eventblinkbot-high-resolution-logo.jpg" alt="QR Code">
            </div>
        </div>
        <div class="footer">
            &copy; 2024 EventBlink Bot - All Rights Reserved.
        </div>
    </div>
</body>

</html>`;
      return ticketHTML;
    } catch (error) {
      console.log(error);
    }
  };

  eventMediaTemplate = async (data: any) => {
    function formatDate(inputDate) {
      // Define an array of month names
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      // Split the input date into day, month, and year
      const [day, month, year] = inputDate.split('/').map(Number);

      // Convert month from number (1-12) to index (0-11)
      const monthName = months[month - 1];

      // Return the formatted date
      return `${day} ${monthName} ${year}`;
    }
    const eventName = data.eventName || '';
    const eventDescription = data.description || '';
    const eventLocation = data.location || '';
    const startDate = data.startDate ? formatDate(data.startDate.trim()) : '';
    const eventTime = data.startTime || '';
    const endDate = data.endDate ? formatDate(data.endDate.trim()) : '';
    const eventEndTime = data.endTime || '';
    const organizerContacts = data.contacts || '';
    const organizerEmail = data.email || '';
    const ticketPrice = data.price || '0';
    const ticketCategory = data.category || '';
    const numberOfTickets = data.numberOfTickets || '';
    const eventImage = data.media
      ? `${baseURL}/bot/${data.media}`
      : 'https://i.ibb.co/PxqQCTQ/eventblinkbot-high-resolution-logo.jpg';
    const organizerWallet = data.walletAddress || '';
    try {
      const mediaTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mad Lads Event</title>
    <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@700&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #1977c4;
            font-family: Arial, sans-serif;
            color: rgb(0, 0, 0);
            padding: 20px;
            box-sizing: border-box;
        }

        .container {
            text-align: center;
            position: relative;
            padding: 20px;
            width: 100%;
            max-width: 700px;
            height: auto;
            min-height: 600px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
        }

        .title {
            font-size: 4em;
            font-weight: bolder;
            text-transform: uppercase;
            line-height: 1.2;
            margin: 0;
            padding: 10px 0 5px;
            flex-shrink: 0;
            font-family: 'Bodoni Moda', serif;
            /* Use the imported font here */
        }

        .description {
            font-size: 2.5em;
            margin: 10px 0 20px;
            padding: 0 20px;
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            word-wrap: break-word;
        }

        .bottom-info {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 10px 20px;
            box-sizing: border-box;
            font-size: 1.2em;
            flex-shrink: 0;
        }

        .location,
        .date {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .location {
            align-items: flex-start;
        }

        .date {
            align-items: flex-end;
        }

        .footer {
            font-size: 0.9em;
            padding: 10px;
            color: #ffffff;
            background-color: #1977c4;
            text-align: center;
        }

        /* Adjustments for viewport width of 900px */
        @media (max-width: 900px) {
            .title {
                font-size: 4em;
            }

            .description {
                font-size: 1.2em;
            }

            .bottom-info {
                flex-direction: column;
                align-items: center;
            }

            .location,
            .date {
                align-items: center;
                margin: 10px 0;
            }
        }

        /* Further adjustments for smaller devices */
        @media (max-width: 768px) {
            .title {
                font-size: 2.5em;
            }

            .description {
                font-size: 1em;
            }

            .bottom-info {
                font-size: 1em;
            }
        }

        @media (max-width: 480px) {
            .title {
                font-size: 2em;
            }

            .description {
                font-size: 0.9em;
            }

            .bottom-info {
                font-size: 0.9em;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="title">${eventName}</div>
        <div class="description">${eventDescription}</div>
        <div class="bottom-info">
            <div class="location">
                <div><strong>Location:</strong> <span id="location">📍 ${eventLocation}</span></div>
            </div>
            <div class="date">
                <div><strong>Start Date:</strong> <span id="start-date">${startDate} at ${eventTime}</span></div>
                <div><strong>End Date:</strong> <span id="end-date">${endDate} at ${eventEndTime}</span></div>
            </div>
        </div>
        <div class="footer">
            &copy; 2024 EventBlink Bot - All Rights Reserved.
        </div>
    </div>
</body>

</html>`;
      return mediaTemplate;
    } catch (error) {
      console.log(error);
    }
  };
  eventDetailsTemplate = async (data: any) => {
    function formatDate(inputDate) {
      // Define an array of month names
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      // Split the input date into day, month, and year
      const [day, month, year] = inputDate.split('/').map(Number);

      // Convert month from number (1-12) to index (0-11)
      const monthName = months[month - 1];

      // Return the formatted date
      return `${day} ${monthName} ${year}`;
    }
    const eventName = data.eventName || '';
    const eventDescription = data.description || '';
    const eventLocation = data.location || '';
    const startDate = data.startDate ? formatDate(data.startDate.trim()) : '';
    const eventTime = data.startTime || '';
    const endDate = data.endDate ? formatDate(data.endDate.trim()) : '';
    const eventEndTime = data.endTime || '';
    const organizerContacts = data.contacts || '';
    const organizerEmail = data.email || '';
    const ticketPrice = data.price || '0';
    const ticketCategory = data.category || '';
    const numberOfTickets = data.numberOfTickets || '';
    const eventImage = data.media
      ? `${baseURL}/bot/${data.media}`
      : 'https://i.ibb.co/PxqQCTQ/eventblinkbot-high-resolution-logo.jpg';
    const organizerWallet = data.walletAddress || '';
    try {
      const eventDetailHTML = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Ticket</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #9ecbf0;
        }

        .ticket {
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 750px;
            /* Default width */
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 500px;
            /* Minimum height */
            overflow: auto;
            /* Allows scrolling if content overflows */
        }

        .ticket h1 {
            font-size: 24px;
            margin-bottom: 10px;
        }

        .ticket p {
            margin: 5px 0;
            font-size: 14px;
            word-wrap: break-word;
            /* Ensures text wraps within container */
        }

        .ticket .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin: 0px;
        }

        .ticket .header h1 {
            font-size: 24px;
            margin: 0px;
        }

        .ticket .trade {
            font-size: 12px;
            color: #999;
            margin-top: 5px;
        }

        .ticket .details {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-top: 5px;
            font-size: 14px;
            flex-wrap: wrap;
            /* Allows wrapping of content if necessary */
        }

        .ticket .details div {
            flex: 1;
            overflow: hidden;
            /* Hide overflow content */
        }

        .ticket .qr-code {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-top: 10px;
            /* Margin added to separate QR code from text */
        }

        .ticket .qr-code img {
            width: 200px;
            height: 200px;
            border: 1px solid #ccc;
        }

        .label {
            font-weight: bold;
            color: #555;
        }

        .value {
            display: block;
            color: #333;
            margin-top: 1px;
        }

        .ticket .footer {
            text-align: center;
            margin-top: 10px;
            font-size: 14px;
            color: #999;
            width: 100%;
        }
    </style>
</head>

<body>
    <div class="ticket">
        <div class="header">
            <h1>Event Details</h1>
            <p class="trade">EventBlink Bot</p>
        </div>
        <div class="details">
            <div>
                <p><span class="label">EVENT NAME:</span><span class="value">${eventName}</span></p>
                <p><span class="label">EVENT DESCRIPTION:</span><span class="value">${eventDescription}</span></p>
                <p><span class="label">LOCATION:</span><span class="value">📍 ${eventLocation}</span></p>
                <p><span class="label">START DATE:</span><span class="value">${startDate} at ${eventTime}</span></p>
                <p><span class="label">END DATE:</span><span class="value">${endDate} at ${eventEndTime}</span></p>
                <p><span class="label">CONTACT:</span><span class="value">${organizerContacts}</span></p>
                <p><span class="label">EMAIL:</span><span class="value">✉️ ${organizerEmail}</span></p>
                <p><span class="label">TICKET CATEGORY:</span><span class="value">${ticketCategory}</span></p>
                <p><span class="label">PRICE:</span><span class="value">${ticketPrice} SOL</span></p>
                <p><span class="label">NUMBER OF TICKETS:</span><span class="value">${numberOfTickets} 🎟️</span></p>
                <p><span class="label">WALLET ADDRESS:</span><span
                        class="value">${organizerWallet}</span></p>
                <p><span class="label">VALID UNTIL:</span><span class="value">${endDate} at ${eventEndTime}</span></p>
            </div>
            <div class="qr-code">
                <img src=${eventImage} alt="Event media">
            </div>
        </div>
        <div class="footer">
            &copy; 2024 EventBlink Bot - All Rights Reserved.
        </div>
    </div>
</body>

</html>`;

      return eventDetailHTML;
    } catch (error) {
      console.log(error);
    }
  };
}
