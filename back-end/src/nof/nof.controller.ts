import { Controller, UseGuards, Req, Get } from '@nestjs/common';

import { NofService } from './nof.service';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';

@UseGuards(JwtAuthGuard)
@Controller('nof')
export class NofController {
  constructor(private readonly nofService: NofService) {}

  @Get()
  async getNof(@Req() req) {
    return this.nofService.getNof(req.user);
  }
}
