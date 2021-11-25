import { Server } from './server';
import { Router } from 'express';
import ituneRouter from './routes';

const route = Router().use('/itunes', ituneRouter);
Server(route);
