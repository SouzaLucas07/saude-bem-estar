import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-imc-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="imc-container">
      <div class="hero-section">
        <h2>📊 Calculadora IMC e Metabólica</h2>
        <p>Avalie seu peso e descubra suas necessidades calóricas</p>
      </div>

      <div class="calculator-grid">
        <div class="form-card">
          <form [formGroup]="imcForm" (ngSubmit)="calculate()">
            <div class="form-group">
              <label>Peso (kg)</label>
              <input type="number" formControlName="weight" placeholder="Ex: 70" step="0.1">
            </div>

            <div class="form-group">
              <label>Altura (cm)</label>
              <input type="number" formControlName="height" placeholder="Ex: 170">
            </div>

            <div class="form-group">
              <label>Idade</label>
              <input type="number" formControlName="age" placeholder="Ex: 30">
            </div>

            <div class="form-group">
              <label>Gênero</label>
              <select formControlName="gender">
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
              </select>
            </div>

            <div class="form-group">
              <label>Nível de Atividade</label>
              <select formControlName="activityLevel">
                <option value="1.2">Sedentário (pouco ou nenhum exercício)</option>
                <option value="1.375">Leve (exercício 1-3 dias/semana)</option>
                <option value="1.55">Moderado (exercício 3-5 dias/semana)</option>
                <option value="1.725">Ativo (exercício 6-7 dias/semana)</option>
                <option value="1.9">Muito ativo (exercício 2x/dia)</option>
              </select>
            </div>

            <button type="submit" class="btn-primary">Calcular</button>
          </form>
        </div>

        <div class="results-card" *ngIf="results">
          <h3>📈 Seus Resultados</h3>
          
          <div class="result-item">
            <span class="label">IMC:</span>
            <span class="value">{{ results.imc }}</span>
            <span class="classification" [class]="results.classificationClass">
              {{ results.classification }}
            </span>
          </div>

          <div class="result-item">
            <span class="label">Taxa Metabólica Basal:</span>
            <span class="value">{{ results.tmb }} kcal/dia</span>
          </div>

          <div class="result-item">
            <span class="label">Necessidade Calórica Diária:</span>
            <span class="value">{{ results.dailyCalories }} kcal/dia</span>
          </div>

          <div class="recommendation">
            <h4>💡 Recomendação</h4>
            <p>{{ results.recommendation }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .imc-container {
      max-width: 1200px;
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
    .calculator-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    .form-card, .results-card {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    .form-card:hover, .results-card:hover {
      transform: translateY(-5px);
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
    .form-group input, .form-group select {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    .form-group input:focus, .form-group select:focus {
      outline: none;
      border-color: #4CAF50;
      box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
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
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
    }
    .btn-primary:active {
      transform: translateY(0);
    }
    .result-item {
      padding: 1rem;
      margin-bottom: 1rem;
      background: #f5f5f5;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
    .label {
      font-weight: 600;
      color: #666;
    }
    .value {
      font-size: 1.2rem;
      font-weight: bold;
      color: #4CAF50;
    }
    .classification {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.9rem;
    }
    .classification.normal {
      background: #4CAF50;
      color: white;
    }
    .classification.underweight {
      background: #FF9800;
      color: white;
    }
    .classification.overweight {
      background: #FFC107;
      color: white;
    }
    .classification.obese {
      background: #F44336;
      color: white;
    }
    .recommendation {
      margin-top: 1.5rem;
      padding: 1rem;
      background: #e8f5e9;
      border-radius: 10px;
      border-left: 4px solid #4CAF50;
    }
    @media (max-width: 768px) {
      .calculator-grid {
        grid-template-columns: 1fr;
      }
      .imc-container {
        padding: 0 1rem;
      }
    }
  `]
})
export class ImcCalculatorComponent {
  imcForm: FormGroup;
  results: any = null;

  constructor(
    private fb: FormBuilder,
    private storage: StorageService
  ) {
    this.imcForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(20), Validators.max(300)]],
      height: ['', [Validators.required, Validators.min(100), Validators.max(250)]],
      age: ['', [Validators.required, Validators.min(15), Validators.max(120)]],
      gender: ['male', Validators.required],
      activityLevel: ['1.55', Validators.required]
    });
  }

  calculate(): void {
    if (this.imcForm.valid) {
      const { weight, height, age, gender, activityLevel } = this.imcForm.value;
      const heightInMeters = height / 100;
      const imc = weight / (heightInMeters * heightInMeters);
      
      let classification = '';
      let classificationClass = '';
      let recommendation = '';

      if (imc < 18.5) {
        classification = 'Abaixo do peso';
        classificationClass = 'underweight';
        recommendation = 'Consulte um nutricionista para ganhar peso de forma saudável.';
      } else if (imc < 25) {
        classification = 'Peso normal';
        classificationClass = 'normal';
        recommendation = 'Mantenha hábitos saudáveis! Continue se exercitando.';
      } else if (imc < 30) {
        classification = 'Sobrepeso';
        classificationClass = 'overweight';
        recommendation = 'Considere aumentar atividade física e melhorar alimentação.';
      } else {
        classification = 'Obesidade';
        classificationClass = 'obese';
        recommendation = 'Procure orientação médica para um plano de emagrecimento seguro.';
      }

      // Harris-Benedict formula
      let tmb: number;
      if (gender === 'male') {
        tmb = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        tmb = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }

      const dailyCalories = tmb * parseFloat(activityLevel);

      this.results = {
        imc: imc.toFixed(1),
        classification,
        classificationClass,
        tmb: Math.round(tmb),
        dailyCalories: Math.round(dailyCalories),
        recommendation
      };

      // Save to localStorage
      this.storage.setLocal('lastImcCalculation', this.results);
    }
  }
}