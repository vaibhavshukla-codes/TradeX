require('dotenv').config();
const mongoose = require('mongoose');
const { UserModel } = require('../model/UserModel');
const { PositionsModel } = require('../model/PositionsModel');

if (!process.env.MONGO_URL) {
  console.error('MONGO_URL is required in backend/.env');
  process.exit(1);
}

const samplePositions = [
  {
    product: 'CNC',
    name: 'INFY',
    qty: 2,
    avg: 1450.5,
    price: 1520.3,
    net: '+4.81%',
    day: '+0.92%',
    isLoss: false,
  },
  {
    product: 'CNC',
    name: 'TCS',
    qty: 1,
    avg: 3100.0,
    price: 3055.2,
    net: '-1.44%',
    day: '-0.31%',
    isLoss: true,
  },
  {
    product: 'MIS',
    name: 'RELIANCE',
    qty: 3,
    avg: 2100.0,
    price: 2155.7,
    net: '+2.65%',
    day: '+0.48%',
    isLoss: false,
  },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 5000 });

  const user = await UserModel.findOne().sort({ createdAt: -1 });
  if (!user) {
    console.error('No users found in DB. Create a user first.');
    process.exit(1);
  }

  const docs = samplePositions.map((p) => ({ ...p, userId: user._id }));
  await PositionsModel.insertMany(docs);

  console.log(`Seeded ${docs.length} positions for user ${user.username || user.email || user._id}`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
