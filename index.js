const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/', (req, res, next) => {
  const target = req.url.slice(1);

  if (!target.startsWith('http')) {
    return res.send('Use /https://example.com');
  }

  return createProxyMiddleware({
    target: target,
    changeOrigin: true,
    pathRewrite: { [`^/${target}`]: '' },
  })(req, res, next);
});

app.listen(3000, () => {
  console.log('Proxy running');
});
