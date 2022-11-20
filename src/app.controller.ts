import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ReportType } from './data';
import { AppService } from './app.service';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReporDto,
} from './dtos/report.dto';

@Controller('expense/:type')
export class AppController {
  constructor(private readonly appSvc: AppService) {}

  @Get()
  getAllReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): ReportResponseDto[] {
    return this.appSvc.getAllReport(type);
  }

  @Get(':id')
  getReportById(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): ReportResponseDto {
    return this.appSvc.getReportById(id, type);
  }

  @Post()
  createReport(
    @Body()
    body: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appSvc.createReport(body, reportType);
  }

  @Put(':id')
  updateReport(
    @Body()
    body: UpdateReporDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    return this.appSvc.updateReport(body, type, id);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): boolean {
    return this.appSvc.deleteReport(type, id);
  }
}
