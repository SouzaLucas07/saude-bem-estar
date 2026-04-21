import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-container">
      <!-- Navbar -->
      <nav class="navbar">
        <div class="nav-container">
          <div class="nav-brand" routerLink="/">
            <div class="logo-icon">🏥</div>
            <div class="logo-text">
              <span class="logo-title">Saúde & Bem-estar</span>
              <span class="logo-subtitle">Seu cuidado em primeiro lugar</span>
            </div>
          </div>

          <div class="nav-menu">
            <a routerLink="/imc" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">📊</span>
              <span class="nav-label">Calculadora IMC</span>
            </a>
            <a routerLink="/workout" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">💪</span>
              <span class="nav-label">Registro de Treinos</span>
            </a>
            <a routerLink="/hydration" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">💧</span>
              <span class="nav-label">Monitor de Hidratação</span>
            </a>
            <a routerLink="/mood" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">😊</span>
              <span class="nav-label">Diário de Humor</span>
            </a>
          </div>

          <button class="mobile-toggle" (click)="toggleMobileMenu()">
            <span class="hamburger">☰</span>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div class="mobile-menu" [class.open]="mobileMenuOpen">
          <a routerLink="/imc" routerLinkActive="active" class="mobile-nav-link" (click)="closeMobileMenu()">
            📊 Calculadora IMC
          </a>
          <a routerLink="/workout" routerLinkActive="active" class="mobile-nav-link" (click)="closeMobileMenu()">
            💪 Registro de Treinos
          </a>
          <a routerLink="/hydration" routerLinkActive="active" class="mobile-nav-link" (click)="closeMobileMenu()">
            💧 Monitor de Hidratação
          </a>
          <a routerLink="/mood" routerLinkActive="active" class="mobile-nav-link" (click)="closeMobileMenu()">
            😊 Diário de Humor
          </a>
        </div>
      </nav>

      <!-- Main Content com Router -->
      <main class="main-content">
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </main>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-section">
            <h4>🏥 Saúde & Bem-estar</h4>
            <p>Cuidando de você em cada passo da jornada</p>
          </div>
          <div class="footer-section">
            <h4>Ferramentas</h4>
            <ul>
              <li routerLink="/imc">📊 Calculadora IMC</li>
              <li routerLink="/workout">💪 Registro de Treinos</li>
              <li routerLink="/hydration">💧 Monitor de Hidratação</li>
              <li routerLink="/mood">😊 Diário de Humor</li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Dicas Rápidas</h4>
            <ul>
              <li>💧 Beba 2L de água por dia</li>
              <li>🏃 30 min de exercício diário</li>
              <li>😴 Durma 7-8 horas por noite</li>
              <li>😊 Registre seu humor diariamente</li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Versão</h4>
            <p>v1.0.0</p>
            <p>© 2024 Saúde & Bem-estar</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }

    /* Navbar */
    .navbar {
      background: linear-gradient(135deg, #2c5f2d 0%, #4CAF50 100%);
      color: white;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
    }

    .logo-icon {
      font-size: 2.5rem;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    .logo-title {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .logo-subtitle {
      font-size: 0.8rem;
      opacity: 0.9;
    }

    .nav-menu {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      color: white;
      text-decoration: none;
      border-radius: 50px;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .nav-link:hover, .nav-link.active {
      background: rgba(255,255,255,0.2);
      transform: translateY(-2px);
    }

    .mobile-toggle {
      display: none;
      background: none;
      border: none;
      font-size: 1.8rem;
      cursor: pointer;
      color: white;
    }

    .mobile-menu {
      display: none;
      flex-direction: column;
      padding: 1rem;
    }

    .mobile-menu.open {
      display: flex;
    }

    .mobile-nav-link {
      padding: 1rem;
      color: white;
      text-decoration: none;
      cursor: pointer;
      border-radius: 10px;
      transition: all 0.3s ease;
    }

    .mobile-nav-link:hover, .mobile-nav-link.active {
      background: rgba(255,255,255,0.2);
    }

    /* Main Content */
    .main-content {
      flex: 1;
      animation: fadeIn 0.5s ease-in;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .content-wrapper {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    /* Footer */
    .footer {
      background: linear-gradient(135deg, #1a3a1b 0%, #2c5f2d 100%);
      color: white;
      margin-top: auto;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .footer-section h4 {
      margin-bottom: 1rem;
    }

    .footer-section ul {
      list-style: none;
    }

    .footer-section li {
      margin-bottom: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .footer-section li:hover {
      transform: translateX(5px);
      color: #FFD700;
    }

    /* Responsive */
    @media (max-width: 968px) {
      .nav-menu {
        display: none;
      }
      .mobile-toggle {
        display: block;
      }
    }

    @media (max-width: 768px) {
      .content-wrapper {
        padding: 1rem;
      }
      .logo-text {
        display: none;
      }
      .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .footer-section ul {
        display: inline-block;
        text-align: left;
      }
    }
  `]
})
export class AppComponent {
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}