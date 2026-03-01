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
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      res.status(400).json({ success: false, error: { code: 'MISSING_QUERY', message: 'Search query q is required' } });
      return;
    }
    const data = await searchPlayers(q);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getPlayerByIdHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const season = Number(req.query.season) || new Date().getFullYear();
    const data = await getPlayerById(Number(id), season);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getPlayerStatsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const season = Number(req.query.season) || new Date().getFullYear();
    const data = await getPlayerStats(Number(id), season);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}


