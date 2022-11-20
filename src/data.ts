export interface Data {
  report: Report[];
}

export interface Report {
  id: string;
  source: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
  type: ReportType;
}

export enum ReportType {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export const data: Data = {
  report: [
    {
      id: 'uuid',
      source: 'Salary',
      amount: 213,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
  ],
};
