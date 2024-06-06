import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express'; // Import Response from express
import { Roles } from '../auth/roles/roles.decorator';

@Controller('health')
@Roles("*")
export class HealthController {
  @Get()
  check(@Res() res: Response): void { 
    res.status(200).send('OK'); 
  }
}