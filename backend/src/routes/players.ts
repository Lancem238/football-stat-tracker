import { Router } from 'express';

import {
  searchPlayersHandler,
  getPlayerByIdHandler,
  getPlayerStatsHandler,
  getRateLimitHandler,
} from '../controllers/players.controller';

const router = Router();

router.get('/search', searchPlayersHandler);
router.get('/:id', getPlayerByIdHandler);
router.get('/:id/stats', getPlayerStatsHandler);
router.get('/rate-limit', getRateLimitHandler);

export default router;

