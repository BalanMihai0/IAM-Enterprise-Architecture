import { Controller, Get, Res } from '@nestjs/common';
import { Roles } from '../auth/roles/roles.decorator';
import { Response } from 'express'; // Import Response from express

@Controller('health')

export class HealthController {

  @Get()
  @Roles('*')
  check(@Res() res: Response): void { 
    res.status(200).send('OK'); 
  }

} 