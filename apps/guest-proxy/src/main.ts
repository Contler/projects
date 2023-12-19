import * as process from 'process';

import express from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';

const app = express();

function getProxiCofig(url: string, redirect?: { [p: string]: string }): Options {
  const data: Options = {
    target: url,
    changeOrigin: true,
    ws: true,
  };
  if (process.env.PRODUCTION === 'true') {
    data.pathRewrite = redirect;
  }
  return data;
}

app.use('/home/restaurant', createProxyMiddleware(getProxiCofig(process.env.GUEST_RESTAURANT, { [`^/home/restaurant`]: '' })));

app.use('/', createProxyMiddleware({
  target: 'https://beta-guest-dev.web.app',
  changeOrigin: true,
}))

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
