import { Request, Response, NextFunction } from 'express';

import {
  searchPlayers,
  getPlayerById,
  getPlayerStats,
  getRateLimitStatus,
} from '../services/footballApi.service';


export async function getRateLimitHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const status = getRateLimitStatus();
    res.json({ success: true, data: status });
  } catch (error) {
    next(error);
  }
}

export async function searchPlayersHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { q, league, season } = req.query;
    if (!q || typeof q !== 'string') {
      res.status(400).json({ success: false, error: { code: 'MISSING_QUERY', message: 'Search query q is required' } });
      return;
    }
    const leagueId = Number(league) || 39; // default: Premier League
    const seasonYear = Number(season) || 2024;
    const result = await searchPlayers(q, leagueId, seasonYear) as any;
    res.json({ success: true, data: result.response });
  } catch (error) {
    next(error);
  }
}

export async function getPlayerByIdHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const season = Number(req.query.season) || new Date().getFullYear();
    const result = await getPlayerById(Number(id), season) as any;
    res.json({ success: true, data: result.response?.[0] });
  } catch (error) {
    next(error);
  }
}

export async function getPlayerStatsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const season = Number(req.query.season) || new Date().getFullYear();
    const result = await getPlayerStats(Number(id), season) as any;
    res.json({ success: true, data: result.response?.[0] });
  } catch (error) {
    next(error);
  }
}


