import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Public test endpoint
router.get('/ping', (req, res) => {
  res.json({ 
    message: 'pong',
    timestamp: new Date().toISOString(),
    status: 'ok'
  });
});

// Protected test endpoint
router.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'Protected endpoint accessed successfully',
    userId: req.user.userId,
    timestamp: new Date().toISOString()
  });
});

// Test error handling
router.get('/error', (req, res, next) => {
  try {
    throw new Error('Test error handling');
  } catch (error) {
    next(error);
  }
});

export default router;