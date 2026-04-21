import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ImcCalculatorComponent } from './pages/imc-calculator/imc-calculator.component';
import { WorkoutTrackerComponent } from './pages/workout-tracker/workout-tracker.component';
import { HydrationMonitorComponent } from './pages/hydration-monitor/hydration-monitor.component';
import { MoodDiaryComponent } from './pages/mood-diary/mood-diary.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'imc', component: ImcCalculatorComponent },
  { path: 'workout', component: WorkoutTrackerComponent },
  { path: 'hydration', component: HydrationMonitorComponent },
  { path: 'mood', component: MoodDiaryComponent },
  { path: '**', redirectTo: '' }
];