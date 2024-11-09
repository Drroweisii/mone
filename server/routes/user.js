import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

router.put('/game-state', async (req, res) => {
  try {
    const { gameState } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: { gameState } },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating game state', error: error.message });
  }
});

export default router;