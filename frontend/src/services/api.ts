import axios from 'axios';

// ApiResponse and PlayerSearchResult are interfaces defined in ../types/player.ts
// Use the type import keyword to import only the types without including any runtime code
import type { ApiResponse, PlayerSearchResult } from '../types/player';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

// Fetches player data from API endpoint and returns a PlayerSearchResult object
// Async function that makes a GET request to the API endpoint /players/{id}
// and returns the player data
export async function getPlayerById(id: number): Promise<PlayerSearchResult> {
  try {
    const { data } = await api.get<ApiResponse<PlayerSearchResult>>(`/players/${id}`);
    return data.data;
  } catch (error) {
    throw error;
  }
}

// Fetches player stats from API endpoint and returns a PlayerSearchResult object
// Async function that makes a GET request to the API endpoint /players/{id}/stats 
// and returns the player statistics data
export async function getPlayerStats(id: number): Promise<PlayerSearchResult> {
  try {
    const { data } = await api.get<ApiResponse<PlayerSearchResult>>(`/players/${id}/stats`);
    return data.data;
  } catch (error) {
    throw error;
  }
}

// Fetches player search results from API endpoint and returns an array of PlayerSearchResult objects
// Async function that makes a GET request to the API endpoint /players/search?q={query}
// and returns an array of player search results matching the query
export async function searchPlayers(query: string): Promise<PlayerSearchResult[]> {
  try {
    const { data } = await api.get<ApiResponse<PlayerSearchResult[]>>('/players/search', {
      params: { q: query },
    });
    return data.data;
  } catch (error) {
    throw error;
  }
}
