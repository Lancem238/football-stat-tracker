import { cache } from './cache.service';

const RAPIDAPI_HOST = 'v3.football.api-sports.io';

const BASE_URL = 'https://v3.football.api-sports.io';

const TTL = {
    PLAYER_SEARCH: 60 * 60, // 1 hour
    PLAYER_PROFILE: 60 * 60 * 6, // 6 hours
    PLAYER_STATS: 60 * 60 * 12, // 12 hours
    TEAM: 60 * 60 * 24, // 24 hours

}

const DAILY_LIMIT = 100;

let requestCount = 0;
let lastResetDate = new Date().toDateString();

function checkRateLimit(): void {
  const today = new Date().toDateString();
  if (today !== lastResetDate) {
    requestCount = 0;
    lastResetDate = today;
  }
  if (requestCount >= DAILY_LIMIT) {
    throw new Error('rate limit exceeded: daily API limit of 100 requests reached');
  }
  requestCount++;
}

export function getRateLimitStatus() {
  return {
    used: requestCount,
    remaining: DAILY_LIMIT - requestCount,
    limit: DAILY_LIMIT,
  };
}

async function apiRequest<T>(endpoint: string, params: Record<string, string | number> = {}, ttl: number = TTL.PLAYER_SEARCH): Promise<T> {

  checkRateLimit();

  const cacheKey = `api:${endpoint}:${JSON.stringify(params)}`;
  const cached = await cache.get<T>(cacheKey);
  if (cached) return cached;

  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
  url.searchParams.append(key, String(value));
  });

  const response = await fetch(url.toString(), {
    headers: {
      'x-rapidapi-key': process.env.FOOTBALL_API_KEY!,
      'x-rapidapi-host': RAPIDAPI_HOST,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json() as T;
  await cache.set(cacheKey, data, ttl);
  return data;
}

export async function getTeamById(teamId: number) {
  return apiRequest('/teams', { id: teamId }, TTL.TEAM);
}

export async function searchPlayers(name: string) {
  return apiRequest('/players', { search: name }, TTL.PLAYER_SEARCH);
}

export async function getPlayerById(playerId: number, season: number) {
  return apiRequest('/players', { id: playerId, season }, TTL.PLAYER_PROFILE);
}

export async function getPlayerStats(playerId: number, season: number) {
    return apiRequest('/players/statistics', { player: playerId, season }, TTL.PLAYER_STATS);
}
