import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-badge">✨ Bem-vindo ao seu espaço de bem-estar</div>
          <h1 class="hero-title">
            Cuide da sua
            <span class="gradient-text">Saúde</span>
            de forma completa
          </h1>
          <p class="hero-subtitle">
            Uma plataforma integrada para monitorar sua saúde física e mental.
            Calcule seu IMC, registre treinos, monitore sua hidratação e acompanhe seu humor.
          </p>
          <div class="hero-buttons">
            <a routerLink="/imc" class="btn-primary">
              Começar Agora
              <span class="btn-icon">→</span>
            </a>
            <a href="#ferramentas" class="btn-secondary">
              Ver Ferramentas
              <span class="btn-icon">↓</span>
            </a>
          </div>
        </div>
        <div class="hero-stats">
          <div class="stat-card">
            <div class="stat-number">4+</div>
            <div class="stat-label">Ferramentas</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">100%</div>
            <div class="stat-label">Gratuito</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Disponível</div>
          </div>
        </div>
      </section>

      <!-- Ferramentas Section -->
      <section id="ferramentas" class="ferramentas">
        <div class="section-header">
          <h2>Nossas Ferramentas</h2>
          <p>Ferramentas completas para você cuidar da sua saúde</p>
        </div>

        <div class="cards-grid">
          <!-- Card 1: Calculadora IMC -->
          <div class="card" routerLink="/imc">
            <div class="card-icon">📊</div>
            <h3>Calculadora IMC</h3>
            <p>Calcule seu Índice de Massa Corporal e descubra sua classificação</p>
            <div class="card-features">
              <span>🔢 IMC</span>
              <span>⚡ TMB</span>
              <span>🍽️ Calorias</span>
            </div>
            <div class="card-link">
              Calcular Agora <span class="arrow">→</span>
            </div>
          </div>

          <!-- Card 2: Registro de Treinos -->
          <div class="card" routerLink="/workout">
            <div class="card-icon">💪</div>
            <h3>Registro de Treinos</h3>
            <p>Monitore seus exercícios e acompanhe seu progresso físico</p>
            <div class="card-features">
              <span>🏃 Cardio</span>
              <span>🏋️ Força</span>
              <span>🧘 Flexibilidade</span>
            </div>
            <div class="card-link">
              Registrar Treino <span class="arrow">→</span>
            </div>
          </div>

          <!-- Card 3: Monitor de Hidratação -->
          <div class="card" routerLink="/hydration">
            <div class="card-icon">💧</div>
            <h3>Monitor de Hidratação</h3>
            <p>Controle sua ingestão de água e mantenha-se hidratado</p>
            <div class="card-features">
              <span>🥤 Copo Virtual</span>
              <span>📊 Gráficos</span>
              <span>🎯 Meta Diária</span>
            </div>
            <div class="card-link">
              Registrar Água <span class="arrow">→</span>
            </div>
          </div>

          <!-- Card 4: Diário de Humor -->
          <div class="card" routerLink="/mood">
            <div class="card-icon">😊</div>
            <h3>Diário de Humor</h3>
            <p>Registre seu humor e sintomas para acompanhar seu bem-estar</p>
            <div class="card-features">
              <span>😊 Humor</span>
              <span>📋 Sintomas</span>
              <span>📅 Calendário</span>
            </div>
            <div class="card-link">
              Registrar Humor <span class="arrow">→</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefícios Section -->
      <section class="beneficios">
        <div class="section-header">
          <h2>Por que escolher nossa plataforma?</h2>
          <p>Recursos que fazem a diferença no seu dia a dia</p>
        </div>
        <div class="beneficios-grid">
          <div class="beneficio-card">
            <div class="beneficio-icon">🎯</div>
            <h3>Metas Personalizadas</h3>
            <p>Defina metas diárias de hidratação e acompanhe seu progresso</p>
          </div>
          <div class="beneficio-card">
            <div class="beneficio-icon">📊</div>
            <h3>Estatísticas Detalhadas</h3>
            <p>Acompanhe gráficos e estatísticas do seu desempenho</p>
          </div>
          <div class="beneficio-card">
            <div class="beneficio-icon">💾</div>
            <h3>Dados Locais</h3>
            <p>Seus dados são armazenados localmente, com total privacidade</p>
          </div>
          <div class="beneficio-card">
            <div class="beneficio-icon">📱</div>
            <h3>Design Responsivo</h3>
            <p>Acesse de qualquer dispositivo, desktop ou mobile</p>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="cta">
        <div class="cta-content">
          <h2>Comece sua jornada de bem-estar hoje!</h2>
          <p>Junte-se a milhares de pessoas que já estão cuidando melhor da saúde</p>
          <a routerLink="/imc" class="btn-primary btn-large">
            Calcular IMC Agora
            <span class="btn-icon">→</span>
          </a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      animation: fadeIn 0.5s ease-in;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Hero Section */
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
    }

    .hero-badge {
      display: inline-block;
      background: rgba(255,255,255,0.2);
      padding: 0.5rem 1rem;
      border-radius: 50px;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .hero-title {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .gradient-text {
      background: linear-gradient(135deg, #FFD700, #FFA500);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 1.2rem;
      max-width: 600px;
      margin: 0 auto 2rem;
      opacity: 0.9;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn-primary, .btn-secondary {
      padding: 1rem 2rem;
      border: none;
      border-radius: 50px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-primary {
      background: #FFD700;
      color: #333;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    .btn-secondary {
      background: transparent;
      border: 2px solid white;
      color: white;
    }

    .btn-secondary:hover {
      background: rgba(255,255,255,0.1);
    }

    .hero-stats {
      display: flex;
      justify-content: center;
      gap: 3rem;
      margin-top: 3rem;
      flex-wrap: wrap;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: bold;
    }

    .stat-label {
      opacity: 0.9;
    }

    /* Ferramentas */
    .ferramentas, .beneficios, .cta {
      padding: 4rem 2rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-header h2 {
      font-size: 2.5rem;
      color: #2c5f2d;
    }

    .cards-grid, .beneficios-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .card {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .card:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .card-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .card h3 {
      color: #2c5f2d;
      margin-bottom: 1rem;
    }

    .card p {
      color: #666;
      line-height: 1.5;
    }

    .card-features {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin: 1rem 0;
      flex-wrap: wrap;
    }

    .card-features span {
      background: #f0f0f0;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
    }

    .card-link {
      color: #4CAF50;
      font-weight: bold;
      margin-top: 1rem;
    }

    .arrow {
      display: inline-block;
      transition: transform 0.3s ease;
    }

    .card:hover .arrow {
      transform: translateX(5px);
    }

    .beneficio-card {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      text-align: center;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .beneficio-card:hover {
      transform: translateY(-5px);
    }

    .beneficio-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .beneficio-card h3 {
      color: #2c5f2d;
      margin-bottom: 1rem;
    }

    .beneficio-card p {
      color: #666;
    }

    /* CTA Section */
    .cta {
      background: linear-gradient(135deg, #2c5f2d 0%, #4CAF50 100%);
      color: white;
      text-align: center;
      border-radius: 30px;
      margin: 2rem;
    }

    .cta-content h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .btn-large {
      padding: 1rem 3rem;
      font-size: 1.2rem;
      margin-top: 1rem;
      display: inline-block;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
      .cards-grid, .beneficios-grid {
        grid-template-columns: 1fr;
      }
      .cta {
        margin: 1rem;
      }
      .cta-content h2 {
        font-size: 1.5rem;
      }
      .ferramentas, .beneficios, .cta {
        padding: 2rem 1rem;
      }
    }
  `]
})
export class HomeComponent {}