import express from "express";
import { requireApiKeyAuth } from "../lib/auth.js";
<<<<<<< HEAD
import { metricService } from "../services/metricService.js";
=======
import { withMerchantContext } from "./db-rls.js";
>>>>>>> f91eadf9cdb62c1166d2a7f07c312c2c5e0a944a

const router = express.Router();

/**
 * @swagger
 * /api/metrics/summary:
 *   get:
 *     summary: Get monthly revenue summary grouped by asset
 *     tags: [Metrics]
 *     security:
 *       - ApiKeyAuth: []
 */
router.get("/metrics/summary", requireApiKeyAuth(), async (req, res, next) => {
  try {
    const pool = req.app.locals.pool;
    const result = await metricService.getMonthlySummary(pool, req.merchant.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/metrics/revenue:
 *   get:
 *     summary: Get aggregate revenue by asset
 *     tags: [Metrics]
 *     security:
 *       - ApiKeyAuth: []
 */
router.get("/metrics/revenue", requireApiKeyAuth(), async (req, res, next) => {
  try {
    const pool = req.app.locals.pool;
    const result = await metricService.getRevenueByAsset(pool, req.merchant.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/metrics/volume:
 *   get:
 *     summary: Get per-asset daily volume for a time range
 *     tags: [Metrics]
 *     security:
 *       - ApiKeyAuth: []
 */
router.get("/metrics/volume", requireApiKeyAuth(), async (req, res, next) => {
  try {
    const pool = req.app.locals.pool;
    const range = (req.query.range || "7D").toUpperCase();
    
    const result = await metricService.getVolumeOverTime(pool, req.merchant.id, range);
    res.json(result);
  } catch (err) {
    if (err.message.includes("Invalid range")) {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
});

export default router;
