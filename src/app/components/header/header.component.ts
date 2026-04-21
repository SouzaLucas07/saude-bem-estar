import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container">
        <div class="logo">
          <h1>🏥 Saúde & Bem-estar</h1>
        </div>
        <nav class="nav-menu">
          <a routerLink="/imc" routerLinkActive="active" class="nav-link">
            📊 IMC
          </a>
          <a routerLink="/workout" routerLinkActive="active" class="nav-link">
            💪 Treinos
          </a>
          <a routerLink="/hydration" routerLinkActive="active" class="nav-link">
            💧 Hidratação
          </a>
          <a routerLink="/mood" routerLinkActive="active" class="nav-link">
            😊 Humor
          </a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: linear-gradient(135deg, #87CEEB 0%, #98FB98 100%);
      padding: 1rem 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
    .logo h1 {
      margin: 0;
      font-size: 1.5rem;
      color: #2c5f2d;
    }
    .nav-menu {
      display: flex;
      gap: 2rem;
    }
    .nav-link {
      text-decoration: none;
      color: #2c5f2d;
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 25px;
      transition: all 0.3s ease;
    }
    .nav-link:hover {
      background: rgba(255,255,255,0.3);
      transform: translateY(-2px);
    }
    .nav-link.active {
      background: white;
      color: #4CAF50;
    }
    @media (max-width: 768px) {
      .container {
        flex-direction: column;
        gap: 1rem;
      }
      .nav-menu {
        gap: 1rem;
      }
      .nav-link {
        padding: 0.25rem 0.75rem;
        font-size: 0.9rem;
      }
    }
  `]
})
export class HeaderComponent {}