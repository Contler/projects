import * as process from 'process';

import express from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';

const app = express();

function getProxiCofig(url: string, redirect?: { [p: string]: string }): Options {
  const data: Options = {
    target: url,
    changeOrigin: true,
    ws: true,
    headers: {
      Connection: 'keep-alive',
      'Keep-Alive': 'timeout=600', // Example: keep the connection alive for 600 seconds
    },
  };
  if (process.env.PRODUCTION === 'true') {
    data.pathRewrite = redirect;
  }
  return data;
}

app.use(
  '/home/restaurant',
  createProxyMiddleware(getProxiCofig(process.env.GUEST_RESTAURANT, { [`^/home/restaurant`]: '' })),
);

app.use(
  '/',
  createProxyMiddleware({
    target: process.env.GUEST_HOME,
    changeOrigin: true,
    ws: true,
  }),
);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
