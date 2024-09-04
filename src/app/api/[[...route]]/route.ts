import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const runtime = 'edge';

import image from './image'

const app = new Hono().basePath('/api');

const routes = app.route('/image', image)

export const GET = handle(app);

export type  AppType = typeof routes