import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create.dto';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';

@UseGuards(JwtAuthGuard)
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async createFeedback(@Body() dto: CreateFeedbackDto, @Req() req) {
    return this.feedbackService.createFeedback(dto, req.user);
  }
}
