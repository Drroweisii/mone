import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  gameState: {
    balance: { type: Number, default: 50 },
    stats: {
      totalMined: { type: Number, default: 0 },
      totalUpgrades: { type: Number, default: 0 },
      peakHashRate: { type: Number, default: 0 },
      startTime: { type: Number, default: Date.now }
    },
    achievements: [{
      id: String,
      title: String,
      description: String,
      isUnlocked: Boolean,
      icon: String
    }]
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);