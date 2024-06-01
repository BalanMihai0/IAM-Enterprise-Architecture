import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express'; // Import Response from express

@Controller('health')
export class HealthController {
  @Get()
  check(@Res() res: Response): void { 
    res.status(200).send('OK'); 
  }
}