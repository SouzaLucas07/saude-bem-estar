export interface Workout {
  id: string;
  name: string;
  category: 'cardio' | 'strength' | 'flexibility';
  duration: number;
  caloriesPerMinute: number;
  date: Date;
}

export interface WorkoutRoutine {
  id: string;
  name: string;
  category: Workout['category'];
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  duration: number;
  restTime: number;
}