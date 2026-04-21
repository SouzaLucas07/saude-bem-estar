import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MoodCalendarComponent } from '../../components/mood-calendar/mood-calendar.component';
import { StorageService } from '../../services/storage.service';
import { NotificationService } from '../../services/notification.service';

interface MoodEntry {
    date: string;
    mood: 'happy' | 'neutral' | 'sad' | 'angry';
    symptoms: string[];
    notes: string;
}

@Component({
    selector: 'app-mood-diary',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MoodCalendarComponent],
    template: `
    <div class="mood-diary-container">
      <div class="hero-section">
        <h2>😊 Diário de Humor e Sintomas</h2>
        <p>Registre seu humor diário e acompanhe seu bem-estar emocional</p>
      </div>

      <div class="diary-grid">
        <!-- Formulário de Registro -->
        <div class="form-card">
          <h3>📝 Registro de Hoje</h3>
          <form [formGroup]="moodForm" (ngSubmit)="saveMood()">
            <div class="form-group">
              <label>Como você está se sentindo?</label>
              <div class="mood-selector">
                <button 
                  type="button"
                  *ngFor="let moodOption of moodOptions"
                  class="mood-btn"
                  [class.selected]="moodForm.get('mood')?.value === moodOption.value"
                  (click)="selectMood(moodOption.value)">
                  <span class="mood-emoji">{{ moodOption.emoji }}</span>
                  <span class="mood-label">{{ moodOption.label }}</span>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label>Sintomas (selecione um ou mais)</label>
              <div class="symptoms-grid">
                <label *ngFor="let symptom of symptomsList" class="symptom-checkbox">
                  <input 
                    type="checkbox" 
                    [value]="symptom"
                    (change)="toggleSymptom(symptom, $event)">
                  {{ symptom }}
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>Observações</label>
              <textarea 
                formControlName="notes" 
                rows="4"
                placeholder="Como foi seu dia? Algo específico aconteceu?"></textarea>
            </div>

            <button type="submit" class="btn-primary" [disabled]="!moodForm.get('mood')?.value">
              💾 Salvar Registro
            </button>
          </form>
        </div>

        <!-- Calendário de Humor -->
        <div class="calendar-card">
          <h3>📅 Calendário de Humor</h3>
          <app-mood-calendar [moods]="moodMap"></app-mood-calendar>
        </div>

        <!-- Estatísticas -->
        <div class="stats-card">
          <h3>📊 Estatísticas Mensais</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-label">Dias registrados</span>
              <span class="stat-value">{{ totalDays }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Humor predominante</span>
              <span class="stat-value">{{ predominantMood }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Sintoma mais comum</span>
              <span class="stat-value">{{ mostCommonSymptom }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Bem-estar geral</span>
              <span class="stat-value">{{ wellBeingScore }}%</span>
            </div>
          </div>
        </div>

        <!-- Últimos Registros -->
        <div class="history-card">
          <h3>🕒 Últimos Registros</h3>
          <div class="entries-list">
            <div *ngFor="let entry of recentEntries" class="entry-item">
              <div class="entry-header">
                <span class="entry-date">{{ entry.date | date:'dd/MM/yyyy' }}</span>
                <span class="entry-mood">{{ getMoodEmoji(entry.mood) }} {{ getMoodLabel(entry.mood) }}</span>
              </div>
              <div class="entry-symptoms" *ngIf="entry.symptoms.length">
                <span class="symptom-tag" *ngFor="let symptom of entry.symptoms">
                  {{ symptom }}
                </span>
              </div>
              <div class="entry-notes" *ngIf="entry.notes">
                {{ entry.notes }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .mood-diary-container {
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
    .diary-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
    .form-card, .calendar-card, .stats-card, .history-card {
      background: white;
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    .form-card:hover, .calendar-card:hover, .stats-card:hover, .history-card:hover {
      transform: translateY(-5px);
    }
    .form-card h3, .calendar-card h3, .stats-card h3, .history-card h3 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: #2c5f2d;
    }
    .mood-selector {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }
    .mood-btn {
      padding: 1rem;
      border: 2px solid #e0e0e0;
      background: white;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
    .mood-btn:hover {
      transform: scale(1.05);
      border-color: #4CAF50;
    }
    .mood-btn.selected {
      background: #4CAF50;
      border-color: #4CAF50;
      color: white;
    }
    .mood-emoji {
      font-size: 2rem;
    }
    .mood-label {
      font-size: 0.9rem;
    }
    .symptoms-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
    }
    .symptom-checkbox {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 8px;
      transition: background 0.3s ease;
    }
    .symptom-checkbox:hover {
      background: #f0f0f0;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #333;
    }
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 1rem;
      resize: vertical;
      font-family: inherit;
    }
    textarea:focus {
      outline: none;
      border-color: #4CAF50;
    }
    .btn-primary {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, #4CAF50, #45a049);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
    }
    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .stats-grid {
      display: grid;
      gap: 1rem;
    }
    .stat-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: #f5f5f5;
      border-radius: 10px;
    }
    .stat-label {
      font-weight: 600;
      color: #666;
    }
    .stat-value {
      font-size: 1.2rem;
      font-weight: bold;
      color: #4CAF50;
    }
    .entries-list {
      max-height: 400px;
      overflow-y: auto;
    }
    .entry-item {
      padding: 1rem;
      margin-bottom: 1rem;
      background: #f5f5f5;
      border-radius: 10px;
      transition: transform 0.3s ease;
    }
    .entry-item:hover {
      transform: translateX(5px);
    }
    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .entry-date {
      font-weight: bold;
      color: #333;
    }
    .entry-mood {
      padding: 0.25rem 0.75rem;
      background: white;
      border-radius: 20px;
    }
    .entry-symptoms {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 0.5rem 0;
    }
    .symptom-tag {
      padding: 0.25rem 0.5rem;
      background: #e0e0e0;
      border-radius: 15px;
      font-size: 0.8rem;
    }
    .entry-notes {
      color: #666;
      font-size: 0.9rem;
      margin-top: 0.5rem;
      line-height: 1.4;
    }
    @media (max-width: 768px) {
      .diary-grid {
        grid-template-columns: 1fr;
      }
      .mood-selector {
        grid-template-columns: repeat(2, 1fr);
      }
      .mood-diary-container {
        padding: 0 1rem;
      }
    }
  `]
})
export class MoodDiaryComponent implements OnInit {
    moodForm: FormGroup;
    moodOptions = [
        { value: 'happy', emoji: '😊', label: 'Feliz' },
        { value: 'neutral', emoji: '😐', label: 'Neutro' },
        { value: 'sad', emoji: '😢', label: 'Triste' },
        { value: 'angry', emoji: '😠', label: 'Irritado' }
    ];
    symptomsList = [
        'Dor de cabeça', 'Cansaço', 'Insônia', 'Ansiedade',
        'Estresse', 'Falta de apetite', 'Dores musculares', 'Tristeza'
    ];
    moodMap = new Map<string, string>();
    entries: MoodEntry[] = [];

    constructor(
        private fb: FormBuilder,
        private storage: StorageService,
        private notification: NotificationService
    ) {
        this.moodForm = this.fb.group({
            mood: ['', Validators.required],
            symptoms: [[]],  // ← ADICIONADO: inicializa o array de sintomas
            notes: ['']
        });
    }

    async ngOnInit() {
        await this.loadEntries();
    }

    selectMood(mood: string): void {
        this.moodForm.patchValue({ mood });
    }

    toggleSymptom(symptom: string, event: any): void {
        const currentSymptoms = this.moodForm.get('symptoms')?.value || [];
        if (event.target.checked) {
            this.moodForm.patchValue({ symptoms: [...currentSymptoms, symptom] });
        } else {
            this.moodForm.patchValue({
                symptoms: currentSymptoms.filter((s: string) => s !== symptom)
            });
        }
    }

    async saveMood(): Promise<void> {
        const today = new Date().toISOString().split('T')[0];
        const moodValue = this.moodForm.get('mood')?.value;

        if (!moodValue) {
            this.notification.error('Selecione um humor');
            return;
        }

        const entry: MoodEntry = {
            date: today,
            mood: moodValue,
            symptoms: this.moodForm.get('symptoms')?.value || [],
            notes: this.moodForm.get('notes')?.value || ''
        };

        // Remove existing entry for today
        const index = this.entries.findIndex(e => e.date === today);
        if (index !== -1) {
            this.entries[index] = entry;
        } else {
            this.entries.push(entry);
        }

        await this.storage.set('moodEntries', today, entry);
        this.moodMap.set(today, moodValue);
        this.notification.success('Registro salvo com sucesso!');

        // Reset form but keep mood? Let's reset completely
        this.moodForm.reset({
            mood: '',
            symptoms: [],
            notes: ''
        });
    }

    async loadEntries(): Promise<void> {
        const stored = await this.storage.getAll<MoodEntry>('moodEntries');
        this.entries = stored.sort((a, b) => b.date.localeCompare(a.date));

        this.entries.forEach(entry => {
            this.moodMap.set(entry.date, entry.mood);
        });
    }

    get totalDays(): number {
        return this.entries.length;
    }

    get predominantMood(): string {
        if (this.entries.length === 0) return 'Nenhum';

        const moodCount: Record<string, number> = {};
        this.entries.forEach(entry => {
            moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;
        });

        let maxMood = '';
        let maxCount = 0;
        for (const [mood, count] of Object.entries(moodCount)) {
            if (count > maxCount) {
                maxCount = count;
                maxMood = mood;
            }
        }

        return this.getMoodLabel(maxMood);
    }

    get mostCommonSymptom(): string {
        if (this.entries.length === 0) return 'Nenhum';

        const symptomCount: Record<string, number> = {};
        this.entries.forEach(entry => {
            entry.symptoms.forEach(symptom => {
                symptomCount[symptom] = (symptomCount[symptom] || 0) + 1;
            });
        });

        let maxSymptom = '';
        let maxCount = 0;
        for (const [symptom, count] of Object.entries(symptomCount)) {
            if (count > maxCount) {
                maxCount = count;
                maxSymptom = symptom;
            }
        }

        return maxSymptom || 'Nenhum';
    }

    get wellBeingScore(): number {
        if (this.entries.length === 0) return 0;

        let totalScore = 0;
        this.entries.forEach(entry => {
            switch (entry.mood) {
                case 'happy': totalScore += 100; break;
                case 'neutral': totalScore += 60; break;
                case 'sad': totalScore += 30; break;
                case 'angry': totalScore += 20; break;
            }
        });

        return Math.round(totalScore / this.entries.length);
    }

    get recentEntries(): MoodEntry[] {
        return this.entries.slice(0, 5);
    }

    getMoodEmoji(mood: string): string {
        const emojis: Record<string, string> = {
            happy: '😊',
            neutral: '😐',
            sad: '😢',
            angry: '😠'
        };
        return emojis[mood] || '❓';
    }

    getMoodLabel(mood: string): string {
        const labels: Record<string, string> = {
            happy: 'Feliz',
            neutral: 'Neutro',
            sad: 'Triste',
            angry: 'Irritado'
        };
        return labels[mood] || mood;
    }
}