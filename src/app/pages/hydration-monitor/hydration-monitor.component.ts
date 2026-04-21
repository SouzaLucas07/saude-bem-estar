import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterGlassComponent } from '../../components/water-glass/water-glass.component';
import { StorageService } from '../../services/storage.service';
import { NotificationService } from '../../services/notification.service';

interface HydrationRecord {
  date: string;
  amount: number;
  timestamp: Date;
}

interface DailyHydration {
  date: string;
  total: number;
  goal: number;
  records: HydrationRecord[];
}

@Component({
  selector: 'app-hydration-monitor',
  standalone: true,
  imports: [CommonModule, WaterGlassComponent],
  template: `
    <div class="hydration-container">
      <div class="hero-section">
        <h2>💧 Monitor de Hidratação</h2>
        <p>Registre sua ingestão de água e mantenha-se hidratado</p>
      </div>

      <div class="hydration-grid">
        <!-- Meta Diária -->
        <div class="goal-card">
          <h3>🎯 Meta Diária</h3>
          <div class="goal-input">
            <input 
              type="number" 
              [value]="dailyGoal / 1000" 
              (change)="updateGoal($event)"
              step="0.1">
            <span>litros</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" [style.width]="dailyPercentage + '%'">
              <span class="progress-text" *ngIf="dailyPercentage > 30">{{ dailyPercentage }}%</span>
            </div>
          </div>
          <div class="progress-stats">
            <span>💧 {{ dailyTotal }} ml</span>
            <span>🎯 {{ dailyGoal }} ml</span>
          </div>
        </div>

        <!-- Copo Virtual -->
        <div class="water-card">
          <h3>🥤 Registrar Consumo</h3>
          <div class="water-options">
            <button *ngFor="let amount of waterAmounts" 
                    class="water-btn"
                    (click)="addWater(amount)">
              {{ amount }} ml
            </button>
          </div>
          <div class="custom-water">
            <input type="number" #customAmount placeholder="Outro valor" step="50">
            <button (click)="addWater(customAmount.valueAsNumber)" class="water-btn custom">
              Adicionar
            </button>
          </div>
          <div class="water-glass-container">
            <app-water-glass 
              [amount]="200"
              [currentTotal]="dailyTotal"
              [goal]="dailyGoal"
              (drink)="addWater($event)">
            </app-water-glass>
          </div>
        </div>

        <!-- Gráfico Semanal (CSS puro) -->
        <div class="chart-card">
          <h3>📊 Consumo Semanal</h3>
          <div class="weekly-chart">
            <div *ngFor="let day of weeklyData" class="chart-bar-container">
              <div class="chart-bar-label">{{ day.label }}</div>
              <div class="chart-bar-wrapper">
                <div class="chart-bar" [style.height]="getBarHeight(day.value) + '%'">
                  <span class="chart-bar-value">{{ day.value }} ml</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Histórico -->
        <div class="history-card">
          <h3>📋 Registros de Hoje</h3>
          <div class="records-list">
            <div *ngFor="let record of todayRecords" class="record-item">
              <span class="record-time">{{ record.timestamp | date:'HH:mm' }}</span>
              <span class="record-amount">{{ record.amount }} ml</span>
              <button class="delete-btn" (click)="removeRecord(record)">🗑️</button>
            </div>
            <div *ngIf="todayRecords.length === 0" class="empty-state">
              Nenhum registro hoje. Comece a beber água!
            </div>
          </div>
        </div>

        <!-- Dicas de Hidratação -->
        <div class="tips-card">
          <h3>💡 Dicas de Hidratação</h3>
          <div class="tip-item" *ngFor="let tip of hydrationTips">
            <span class="tip-icon">{{ tip.icon }}</span>
            <span class="tip-text">{{ tip.text }}</span>
          </div>
        </div>

        <!-- Total Semanal -->
        <div class="total-card">
          <h3>📈 Resumo da Semana</h3>
          <div class="total-stats">
            <div class="total-stat">
              <span class="total-label">Total da semana</span>
              <span class="total-value">{{ weeklyTotal }} ml</span>
            </div>
            <div class="total-stat">
              <span class="total-label">Média diária</span>
              <span class="total-value">{{ weeklyAverage }} ml</span>
            </div>
            <div class="total-stat">
              <span class="total-label">Melhor dia</span>
              <span class="total-value">{{ bestDay }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hydration-container {
      max-width: 1400px;
      margin: 2rem auto;
      padding: 0 2rem;
      animation: fadeIn 0.5s ease-in;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .hero-section {
      text-align: center;
      margin-bottom: 2rem;
    }
    .hero-section h2 {
      color: #2c5f2d;
      font-size: 2rem;
    }
    .hero-section p {
      color: #666;
    }
    .hydration-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
    .goal-card, .water-card, .chart-card, .history-card, .tips-card, .total-card {
      background: white;
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    .goal-card:hover, .water-card:hover, .chart-card:hover, .history-card:hover, .tips-card:hover, .total-card:hover {
      transform: translateY(-5px);
    }
    h3 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: #2c5f2d;
    }
    .goal-input {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .goal-input input {
      flex: 1;
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 1rem;
    }
    .progress-bar {
      height: 40px;
      background: #e0e0e0;
      border-radius: 20px;
      overflow: hidden;
      margin: 1rem 0;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #4A90E2, #357ABD);
      transition: width 0.5s ease;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 15px;
      color: white;
      font-weight: bold;
      font-size: 0.9rem;
    }
    .progress-stats {
      display: flex;
      justify-content: space-between;
      color: #666;
      font-weight: bold;
    }
    .water-options {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .water-btn {
      padding: 0.75rem;
      background: #4A90E2;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: bold;
    }
    .water-btn:hover {
      background: #357ABD;
      transform: scale(1.05);
    }
    .custom-water {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .custom-water input {
      flex: 1;
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 1rem;
    }
    .water-btn.custom {
      background: #98FB98;
      color: #2c5f2d;
    }
    .water-glass-container {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }
    .weekly-chart {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      height: 250px;
      gap: 10px;
    }
    .chart-bar-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .chart-bar-label {
      font-size: 0.8rem;
      font-weight: bold;
      color: #666;
      text-align: center;
    }
    .chart-bar-wrapper {
      width: 100%;
      height: 180px;
      display: flex;
      align-items: flex-end;
      background: #f5f5f5;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }
    .chart-bar {
      width: 100%;
      background: linear-gradient(0deg, #4A90E2, #357ABD);
      transition: height 0.5s ease;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      position: relative;
      min-height: 30px;
    }
    .chart-bar-value {
      position: absolute;
      top: -25px;
      font-size: 0.7rem;
      font-weight: bold;
      color: #4A90E2;
      white-space: nowrap;
    }
    .records-list {
      max-height: 300px;
      overflow-y: auto;
    }
    .record-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      background: #f5f5f5;
      border-radius: 10px;
      transition: transform 0.3s ease;
    }
    .record-item:hover {
      transform: translateX(5px);
    }
    .record-time {
      font-weight: bold;
      color: #4A90E2;
    }
    .record-amount {
      font-weight: bold;
      color: #333;
    }
    .delete-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }
    .delete-btn:hover {
      transform: scale(1.1);
    }
    .empty-state {
      text-align: center;
      padding: 2rem;
      color: #999;
    }
    .tip-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      background: #f5f5f5;
      border-radius: 10px;
      transition: transform 0.3s ease;
    }
    .tip-item:hover {
      transform: translateX(5px);
    }
    .tip-icon {
      font-size: 1.5rem;
    }
    .tip-text {
      flex: 1;
      color: #555;
    }
    .total-stats {
      display: grid;
      gap: 1rem;
    }
    .total-stat {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: linear-gradient(135deg, #f5f5f5, #e8f5e9);
      border-radius: 10px;
    }
    .total-label {
      font-weight: 600;
      color: #666;
    }
    .total-value {
      font-size: 1.2rem;
      font-weight: bold;
      color: #4CAF50;
    }
    @media (max-width: 768px) {
      .hydration-grid {
        grid-template-columns: 1fr;
      }
      .water-options {
        grid-template-columns: repeat(2, 1fr);
      }
      .weekly-chart {
        height: 200px;
      }
      .chart-bar-wrapper {
        height: 140px;
      }
    }
  `]
})
export class HydrationMonitorComponent implements OnInit, OnDestroy {
  dailyGoal: number = 2500;
  dailyTotal: number = 0;
  todayRecords: HydrationRecord[] = [];
  waterAmounts = [200, 300, 500, 1000];
  weeklyData: { label: string; value: number }[] = [];
  
  hydrationTips = [
    { icon: '⏰', text: 'Beba água ao acordar para ativar o metabolismo' },
    { icon: '🍽️', text: 'Beba 1 copo antes de cada refeição' },
    { icon: '📱', text: 'Use lembretes no celular para não esquecer' },
    { icon: '🍋', text: 'Adicione limão ou hortelã para variar o sabor' },
    { icon: '🏃', text: 'Beba água antes, durante e após exercícios' }
  ];
  
  private updateInterval: any;

  constructor(
    private storage: StorageService,
    private notification: NotificationService
  ) {}

  async ngOnInit() {
    await this.loadTodayData();
    await this.loadWeeklyData();
    this.startAutoUpdate();
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  async loadTodayData() {
    const today = new Date().toISOString().split('T')[0];
    const data = await this.storage.get<DailyHydration>('hydration', today);
    
    if (data) {
      this.dailyTotal = data.total;
      this.todayRecords = data.records.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      this.dailyGoal = data.goal;
    } else {
      this.dailyTotal = 0;
      this.todayRecords = [];
    }
  }

  async loadWeeklyData() {
    const weekly: { label: string; value: number }[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const label = date.toLocaleDateString('pt-BR', { weekday: 'short' });
      
      const data = await this.storage.get<DailyHydration>('hydration', dateStr);
      weekly.push({ label, value: data?.total || 0 });
    }
    
    this.weeklyData = weekly;
  }

  async addWater(amount: number) {
    if (!amount || isNaN(amount) || amount <= 0) {
      this.notification.error('Por favor, insira um valor válido');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const record: HydrationRecord = {
      date: today,
      amount,
      timestamp: new Date()
    };
    
    this.dailyTotal += amount;
    this.todayRecords.unshift(record);
    
    const dailyData: DailyHydration = {
      date: today,
      total: this.dailyTotal,
      goal: this.dailyGoal,
      records: this.todayRecords
    };
    
    await this.storage.set('hydration', today, dailyData);
    await this.loadWeeklyData();
    
    this.notification.success(`+${amount}ml de água registrado!`);
    
    if (this.dailyTotal >= this.dailyGoal) {
      this.notification.success('🎉 Parabéns! Você atingiu sua meta diária de hidratação!');
    }
  }

  async removeRecord(record: HydrationRecord) {
    this.dailyTotal -= record.amount;
    this.todayRecords = this.todayRecords.filter(r => r.timestamp !== record.timestamp);
    
    const today = new Date().toISOString().split('T')[0];
    const dailyData: DailyHydration = {
      date: today,
      total: this.dailyTotal,
      goal: this.dailyGoal,
      records: this.todayRecords
    };
    
    await this.storage.set('hydration', today, dailyData);
    await this.loadWeeklyData();
    this.notification.info('Registro removido');
  }

  async updateGoal(event: any) {
    const newGoal = parseFloat(event.target.value) * 1000;
    if (newGoal > 0 && newGoal <= 10000) {
      this.dailyGoal = newGoal;
      const today = new Date().toISOString().split('T')[0];
      const data = await this.storage.get<DailyHydration>('hydration', today);
      if (data) {
        data.goal = newGoal;
        await this.storage.set('hydration', today, data);
      }
      this.notification.success(`Meta atualizada para ${newGoal}ml`);
    } else {
      this.notification.error('Meta deve ser entre 0 e 10 litros');
    }
  }

  get dailyPercentage(): number {
    return Math.min((this.dailyTotal / this.dailyGoal) * 100, 100);
  }

  getBarHeight(value: number): number {
    const maxValue = Math.max(...this.weeklyData.map(d => d.value), 100);
    return (value / maxValue) * 100;
  }

  get weeklyTotal(): number {
    return this.weeklyData.reduce((sum, day) => sum + day.value, 0);
  }

  get weeklyAverage(): number {
    return Math.round(this.weeklyTotal / 7);
  }

  get bestDay(): string {
    if (this.weeklyData.length === 0) return 'Nenhum';
    const best = this.weeklyData.reduce((max, day) => 
      day.value > max.value ? day : max, this.weeklyData[0]);
    return `${best.label} (${best.value} ml)`;
  }

  private startAutoUpdate() {
    this.updateInterval = setInterval(() => {
      this.loadTodayData();
      this.loadWeeklyData();
    }, 60000);
  }
}