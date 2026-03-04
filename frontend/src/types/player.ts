export interface Player {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  nationality: string;
  height: string;
  weight: string;
  photo: string;
}

export interface PlayerStatistics {
  team: { id: number; name: string; logo: string };
  games: { appearances: number; minutes: number; position: string; rating: string };
  goals: { total: number; assists: number };
  passes: { total: number; accuracy: string };
  tackles: { total: number };
  dribbles: { attempts: number; success: number };
}

export interface PlayerSearchResult {
  player: Player;
  statistics: PlayerStatistics[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}