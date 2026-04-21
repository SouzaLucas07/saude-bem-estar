export interface HydrationRecord {
  date: string;
  amount: number;
  timestamp: Date;
}

export interface DailyHydration {
  date: string;
  total: number;
  goal: number;
  records: HydrationRecord[];
}