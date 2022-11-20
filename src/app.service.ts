import { Injectable } from '@nestjs/common';
import { data, Report, ReportType } from './data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from './dtos/report.dto';

interface ReportData {
  amount: number;
  source: string;
}

interface UpdateReportData {
  amount?: number;
  source?: string;
}

@Injectable()
export class AppService {
  getAllReport(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((a) => a.type === type)
      .map((a) => new ReportResponseDto(a));
  }

  getReportById(id: string, type: ReportType): ReportResponseDto {
    const report = data.report.find((a) => a.type === type && a.id === id);
    if (!report) return;
    return new ReportResponseDto(report);
  }

  createReport(body: ReportData, type: ReportType): ReportResponseDto {
    const report: Report = {
      id: uuid(),
      type,
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
    };

    data.report.push(report);

    return new ReportResponseDto(report);
  }

  updateReport(
    body: UpdateReportData,
    type: ReportType,
    id: string,
  ): ReportResponseDto {
    const idx = data.report
      .filter((a) => a.type === type)
      .findIndex((a) => a.id === id);

    data.report[idx] = {
      ...data.report[idx],
      ...body,
    };

    return new ReportResponseDto(data.report[idx]);
  }

  deleteReport(type: ReportType, id: string): boolean {
    const idx = data.report
      .filter((a) => a.type === type)
      .findIndex((a) => a.id === id);
    if (idx > -1) {
      data.report.splice(idx, 1);
      return true;
    }
    return false;
  }
}
