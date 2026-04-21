import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MoodDay {
  date: Date;
  mood: 'happy' | 'neutral' | 'sad' | 'angry' | null;
}

@Component({
  selector: 'app-mood-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mood-calendar">
      <div class="calendar-header">
        <button (click)="previousMonth()" class="nav-btn">◀</button>
        <h3>{{ currentMonthName }} {{ currentYear }}</h3>
        <button (click)="nextMonth()" class="nav-btn">▶</button>
      </div>
      <div class="calendar-weekdays">
        <div *ngFor="let day of weekDays">{{ day }}</div>
      </div>
      <div class="calendar-days">
        <div 
          *ngFor="let day of calendarDays" 
          class="calendar-day"
          [class.empty]="!day"
          [class.happy]="day && day.mood === 'happy'"
          [class.neutral]="day && day.mood === 'neutral'"
          [class.sad]="day && day.mood === 'sad'"
          [class.angry]="day && day.mood === 'angry'"
        >
          <ng-container *ngIf="day">
            <span class="day-number">{{ day.date.getDate() }}</span>
            <span class="mood-icon" *ngIf="day.mood">
              {{ getMoodIcon(day.mood) }}
            </span>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mood-calendar {
      background: white;
      border-radius: 15px;
      padding: 1rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .nav-btn {
      background: #4CAF50;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      color: white;
      font-weight: bold;
    }
    .nav-btn:hover {
      background: #45a049;
      transform: scale(1.05);
    }
    .calendar-weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: #666;
    }
    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 5px;
    }
    .calendar-day {
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      transition: all 0.3s ease;
      position: relative;
      background: #f5f5f5;
      min-height: 60px;
    }
    .calendar-day.empty {
      opacity: 0.3;
      background: #e0e0e0;
    }
    .calendar-day.happy {
      background: linear-gradient(135deg, #FFD700, #FFA500);
    }
    .calendar-day.neutral {
      background: linear-gradient(135deg, #D3D3D3, #A9A9A9);
    }
    .calendar-day.sad {
      background: linear-gradient(135deg, #87CEEB, #4682B4);
    }
    .calendar-day.angry {
      background: linear-gradient(135deg, #FF6B6B, #DC143C);
    }
    .day-number {
      font-size: 1rem;
      font-weight: bold;
      color: #333;
    }
    .calendar-day.happy .day-number,
    .calendar-day.angry .day-number {
      color: white;
    }
    .mood-icon {
      font-size: 1.2rem;
      position: absolute;
      bottom: 5px;
    }
    @media (max-width: 768px) {
      .mood-calendar {
        padding: 0.5rem;
      }
      .day-number {
        font-size: 0.8rem;
      }
      .mood-icon {
        font-size: 1rem;
      }
      .calendar-day {
        min-height: 45px;
      }
    }
  `]
})
export class MoodCalendarComponent {
  @Input() set moods(moods: Map<string, string>) {
    this.updateCalendar(moods);
  }

  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  currentMonth = this.currentDate.getMonth();
  weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  calendarDays: (MoodDay | null)[] = [];

  get currentMonthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString('pt-BR', { month: 'long' });
  }

  private updateCalendar(moods: Map<string, string>): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startOffset = firstDay.getDay();
    const daysArray: (MoodDay | null)[] = [];

    // Empty days before month starts
    for (let i = 0; i < startOffset; i++) {
      daysArray.push(null);
    }

    // Days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      const dateKey = date.toISOString().split('T')[0];
      const mood = moods.get(dateKey) as any;
      daysArray.push({ date, mood: mood || null });
    }

    this.calendarDays = daysArray;
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.updateCalendar(new Map());
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.updateCalendar(new Map());
  }

  getMoodIcon(mood: string): string {
    const icons: Record<string, string> = {
      happy: '😊',
      neutral: '😐',
      sad: '😢',
      angry: '😠'
    };
    return icons[mood] || '❓';
  }
}