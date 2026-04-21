import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { NotificationService } from '../../services/notification.service';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-workout-tracker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="workout-container">
      <div class="hero-section">
        <h2>💪 Registro de Treinos</h2>
        <p>Monitore seus exercícios e acompanhe seu progresso</p>
      </div>

      <div class="workout-grid">
        <div class="create-workout">
          <h3>➕ Novo Treino</h3>
          <form [formGroup]="workoutForm" (ngSubmit)="addWorkout()">
            <div class="form-group">
              <input type="text" formControlName="name" placeholder="Nome do exercício">
            </div>
            <div class="form-group">
              <select formControlName="category">
                <option value="cardio">🏃‍♂️ Cardio</option>
                <option value="strength">💪 Força</option>
                <option value="flexibility">🧘 Flexibilidade</option>
              </select>
            </div>
            <div class="form-group">
              <input type="number" formControlName="duration" placeholder="Duração (minutos)">
            </div>
            <div class="form-group">
              <input type="number" formControlName="caloriesPerMinute" placeholder="Calorias/minuto">
            </div>
            <button type="submit" class="btn-primary">Registrar Treino</button>
          </form>
        </div>

        <div class="workout-history">
          <h3>📋 Histórico de Treinos</h3>
          <div class="workout-list">
            <div *ngFor="let workout of workouts" class="workout-item">
              <div class="workout-info">
                <span class="workout-name">{{ workout.name }}</span>
                <span class="workout-category">{{ getCategoryIcon(workout.category) }}</span>
                <span class="workout-duration">⏱️ {{ workout.duration }} min</span>
                <span class="workout-calories">🔥 {{ workout.caloriesPerMinute * workout.duration }} kcal</span>
              </div>
              <div class="workout-date">{{ workout.date | date:'dd/MM/yyyy HH:mm' }}</div>
            </div>
          </div>
          <div class="total-stats">
            <h4>📊 Estatísticas</h4>
            <p>Total de treinos: {{ workouts.length }}</p>
            <p>Total de calorias: {{ totalCalories }} kcal</p>
            <p>Tempo total: {{ totalDuration }} minutos</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .workout-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 2rem;
    }
    .hero-section {
      text-align: center;
      margin-bottom: 2rem;
    }
    .hero-section h2 {
      color: #2c5f2d;
      font-size: 2rem;
    }
    .workout-grid {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 2rem;
    }
    .create-workout, .workout-history {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .form-group input, .form-group select {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 1rem;
    }
    .btn-primary {
      width: 100%;
      padding: 0.75rem;
      background: linear-gradient(135deg, #4CAF50, #45a049);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
    }
    .workout-list {
      max-height: 400px;
      overflow-y: auto;
    }
    .workout-item {
      padding: 1rem;
      margin-bottom: 1rem;
      background: #f5f5f5;
      border-radius: 10px;
      transition: transform 0.3s ease;
    }
    .workout-item:hover {
      transform: translateX(5px);
    }
    .workout-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .workout-name {
      font-weight: bold;
      color: #333;
    }
    .workout-date {
      font-size: 0.8rem;
      color: #999;
      margin-top: 0.5rem;
    }
    .total-stats {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 2px solid #e0e0e0;
    }
    @media (max-width: 768px) {
      .workout-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class WorkoutTrackerComponent implements OnInit {
  workoutForm: FormGroup;
  workouts: Workout[] = [];

  // Propriedades computadas
  get totalCalories(): number {
    return this.workouts.reduce((total, workout) => {
      return total + (workout.caloriesPerMinute * workout.duration);
    }, 0);
  }

  get totalDuration(): number {
    return this.workouts.reduce((total, workout) => {
      return total + workout.duration;
    }, 0);
  }

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private notification: NotificationService
  ) {
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      category: ['cardio', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      caloriesPerMinute: ['', [Validators.required, Validators.min(1)]]
    });
  }

  async ngOnInit() {
    await this.loadWorkouts();
  }

  async loadWorkouts() {
    try {
      const stored = await this.storage.getAll<Workout>('workouts');
      this.workouts = stored.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error('Erro ao carregar treinos:', error);
      this.notification.error('Erro ao carregar histórico de treinos');
    }
  }

  async addWorkout() {
    if (this.workoutForm.valid) {
      const formValue = this.workoutForm.value;
      
      const newWorkout: Workout = {
        id: Date.now().toString(),
        name: formValue.name,
        category: formValue.category,
        duration: Number(formValue.duration),
        caloriesPerMinute: Number(formValue.caloriesPerMinute),
        date: new Date()
      };

      try {
        // Salvar no IndexedDB
        await this.storage.set('workouts', newWorkout.id, newWorkout);
        
        // Atualizar lista local
        this.workouts = [newWorkout, ...this.workouts];
        
        // Mostrar notificação de sucesso
        this.notification.success(
          `Treino de ${newWorkout.name} registrado com sucesso!`,
          '✅ Treino Adicionado'
        );
        
        // Resetar formulário
        this.workoutForm.reset({
          name: '',
          category: 'cardio',
          duration: '',
          caloriesPerMinute: ''
        });
        
      } catch (error) {
        console.error('Erro ao salvar treino:', error);
        this.notification.error('Erro ao salvar treino. Tente novamente.');
      }
    } else {
      this.notification.warning('Preencha todos os campos corretamente');
    }
  }

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      'cardio': '🏃‍♂️',
      'strength': '💪',
      'flexibility': '🧘'
    };
    return icons[category] || '🏋️‍♂️';
  }
}