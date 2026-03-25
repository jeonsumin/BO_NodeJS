import express from 'express';
import cors from 'cors';

import memberRouter from './routes/member';

export const app = express();

app.use(cors());
app.use(express.json({limit: '10mb'}));

app.use("/api/member", memberRouter);