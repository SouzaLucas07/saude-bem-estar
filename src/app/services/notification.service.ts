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
  
  private notifications: Notification[] = [];
  private intervalId: any;

  constructor() {
    this.startHydrationReminders();
  }

  /**
   * Mostra uma notificação
   */
  show(notification: Notification): void {
    this.notifications.push(notification);
    this.notificationsSubject.next(notification);
    
    // Auto-remover após duração
    if (notification.duration) {
      setTimeout(() => {
        this.remove(notification.id);
      }, notification.duration);
    }
  }

  /**
   * Remove uma notificação específica
   */
  remove(id: string): void {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }

  /**
   * Limpa todas as notificações
   */
  clearAll(): void {
    this.notifications = [];
  }

  /**
   * Notificação de sucesso
   */
  success(message: string, title: string = 'Sucesso'): void {
    this.show({
      id: this.generateId(),
      title,
      message,
      type: 'success',
      duration: 3000
    });
  }

  /**
   * Notificação de erro
   */
  error(message: string, title: string = 'Erro'): void {
    this.show({
      id: this.generateId(),
      title,
      message,
      type: 'error',
      duration: 5000
    });
  }

  /**
   * Notificação de informação
   */
  info(message: string, title: string = 'Informação'): void {
    this.show({
      id: this.generateId(),
      title,
      message,
      type: 'info',
      duration: 3000
    });
  }

  /**
   * Notificação de aviso
   */
  warning(message: string, title: string = 'Atenção'): void {
    this.show({
      id: this.generateId(),
      title,
      message,
      type: 'warning',
      duration: 4000
    });
  }

  /**
   * Gera ID único para notificação
   */
  private generateId(): string {
    return Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Inicia lembretes automáticos de hidratação
   */
  private startHydrationReminders(): void {
    // Verifica a cada hora se deve enviar lembrete
    this.intervalId = setInterval(() => {
      const hour = new Date().getHours();
      const minutes = new Date().getMinutes();
      
      // Envia lembretes entre 8h e 22h, a cada 2 horas
      if (hour >= 8 && hour <= 22 && minutes === 0) {
        this.info(
          'Não se esqueça de beber água! Mantenha-se hidratado durante o dia.',
          '💧 Lembrete de Hidratação'
        );
      }
      
      // Lembrete especial ao meio-dia
      if (hour === 12 && minutes === 0) {
        this.info(
          'Hora do almoço! Aproveite para beber um copo de água antes ou depois da refeição.',
          '🥗 Hora da Hidratação'
        );
      }
      
      // Lembrete no final da tarde
      if (hour === 17 && minutes === 0) {
        this.info(
          'Última chance de atingir sua meta de água hoje! Beba mais um copo.',
          '🌅 Meta de Hidratação'
        );
      }
    }, 60000); // Verifica a cada minuto
  }

  /**
   * Para os lembretes automáticos
   */
  stopReminders(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Reinicia os lembretes
   */
  restartReminders(): void {
    this.stopReminders();
    this.startHydrationReminders();
  }

  /**
   * Obtém todas as notificações ativas
   */
  getNotifications(): Notification[] {
    return [...this.notifications];
  }
}