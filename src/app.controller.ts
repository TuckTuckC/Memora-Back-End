// Import required decorators and types from NestJS and Express
import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';

// Use @Controller() decorator to mark the class as a NestJS controller
@Controller()
export class AppController {
  // Use @Get() decorator to specify that this method should handle HTTP GET requests
  @Get()
  // Define a method to handle those GET requests. The method name 'logRequest' is arbitrary.
  logRequest(@Req() request: Request): any {
    // @Req() decorator injects the Express Request object
    console.log('Received a GET request'); // Log the type of request received
    return { message: 'Check your console for GET!' }; // Send a response back to the client
  }

  // Use @Post() decorator to specify that this method should handle HTTP POST requests
  @Post()
  // Define another method to handle POST requests.
  logPostRequest(@Body() data: any, @Req() request: Request): any {
    // @Body() decorator extracts the request payload (or "body")
    // @Req() decorator injects the Express Request object again, just like in logRequest()

    console.log('Received a POST request'); // Log that a POST request was received
    console.log(`Request Data: ${JSON.stringify(data)}`); // Log the actual payload sent with the POST request
    return { message: data }; // Send a response back to the client
  }
  @Post('send-notification')
  async sendNotification(@Body() data: any, token: string) {
    const serverKey =
      'AAAAp3m6xPA:APA91bFnjHpvkHB0y5cCbAO9hTf66DYjvZFFdqY03ToUofoSsFew6NDnIR1XxvLNqWBp369HOaScDY10FmVSPtsiu1y-akzJHyEQagDWQrQaYpbh93ZYNp80R4fGqVtb8EasxSYtUxn4';
    const message = {
      token: token,
      notification: {
        title: 'Yessir',
        body: 'How about that!',
      },
    };

    const config = {
      headers: {
        Authorization: `Bearer ${serverKey}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        'https://fcm.googleapis.com/v1/projects/memora-fbbcf/messages:send',
        message,
        config,
      );
      console.log('Notification sent successfully', response.data);
    } catch (error) {
      console.log('Error sending notification', error);
    }
  }
}
