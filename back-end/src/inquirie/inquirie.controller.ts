import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { InquirieService } from './inquirie.service';
import {
  CreateInquiryDto,
  CloseInquiryDto,
  CommentInquiryDto,
} from './dto/inquiry.dto';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';

@UseGuards(JwtAuthGuard)
@Controller('inquiry')
export class InquirieController {
  constructor(private readonly inquirieService: InquirieService) {}

  @Post()
  async createInquiry(@Body() dto: CreateInquiryDto, @Req() req) {
    return this.inquirieService.createInquiry(dto, req.user);
  }

  @Post('/close')
  async closeInquiry(@Body() dto: CloseInquiryDto, @Req() req) {
    return this.inquirieService.closeInquiry(dto, req.user);
  }

  @Post('/comment')
  async commentInquiry(@Body() dto: CommentInquiryDto, @Req() req) {
    return this.inquirieService.commentInquiry(dto, req.user);
  }
}
