import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new Subject<Notification>();
  notifications$ = this.notificationsSubject.asObservable();

  private intervalId: any;

  constructor() {
    this.startHydrationReminders();
  }

  show(notification: Notification): void {
    this.notificationsSubject.next(notification);
    
    if (notification.duration) {
      setTimeout(() => {
        this.clear(notification.id);
      }, notification.duration);
    }
  }

  clear(id: string): void {
    // Implementation for clearing specific notification
  }

  success(message: string, title: string = 'Sucesso'): void {
    this.show({
      id: Date.now().toString(),
      title,
      message,
      type: 'success',
      duration: 3000
    });
  }

  error(message: string, title: string = 'Erro'): void {
    this.show({
      id: Date.now().toString(),
      title,
      message,
      type: 'error',
      duration: 5000
    });
  }

  info(message: string, title: string = 'Informação'): void {
    this.show({
      id: Date.now().toString(),
      title,
      message,
      type: 'info',
      duration: 3000
    });
  }

  private startHydrationReminders(): void {
    // Simulate notifications every 2 hours
    this.intervalId = setInterval(() => {
      const hour = new Date().getHours();
      if (hour >= 8 && hour <= 22) {
        this.info('Hora de beber água!', '💧 Lembrete de Hidratação');
      }
    }, 2 * 60 * 60 * 1000);
  }

  stopReminders(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}