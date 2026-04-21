import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-water-glass',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="water-glass-container">
      <div 
        class="water-glass"
        [class.filled]="filled"
        [style.--fill-percentage]="fillPercentage + '%'"
        (click)="onClick()"
      >
        <div class="water-fill"></div>
        <div class="glass-content">
          <span class="amount">{{ amount }}ml</span>
          <span class="icon">💧</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .water-glass-container {
      display: inline-block;
      cursor: pointer;
    }
    .water-glass {
      position: relative;
      width: 100px;
      height: 120px;
      border: 3px solid #4A90E2;
      border-top: none;
      border-radius: 0 0 40px 40px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    .water-glass:hover {
      transform: scale(1.05);
    }
    .water-fill {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: var(--fill-percentage);
      background: linear-gradient(135deg, #4A90E2, #357ABD);
      transition: height 0.5s ease;
    }
    .glass-content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    .amount {
      font-size: 1.2rem;
      font-weight: bold;
      color: #333;
    }
    .icon {
      font-size: 1.5rem;
    }
    .water-glass.filled .amount {
      color: white;
    }
  `]
})
export class WaterGlassComponent {
  @Input() amount: number = 200;
  @Input() currentTotal: number = 0;
  @Input() goal: number = 2500;
  @Output() drink = new EventEmitter<number>();

  get filled(): boolean {
    return this.currentTotal >= this.goal;
  }

  get fillPercentage(): string {
    return Math.min((this.currentTotal / this.goal) * 100, 100).toString();
  }

  onClick(): void {
    this.drink.emit(this.amount);
  }
}