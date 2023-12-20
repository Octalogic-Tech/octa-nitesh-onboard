import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class HealthController {
  @Get()
  check(): string {
    return 'OK';
  }
}
