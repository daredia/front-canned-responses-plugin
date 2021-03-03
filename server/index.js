const express = require('express');
const mcache = require('memory-cache');

const frontDriver = require(`./drivers/front`);

const app = express();
const port = process.env.PORT || 9070;

const AUTH_SECRET = process.env.AUTH_SECRET;
const TTL_SECONDS = 10 * 60; // 10 minutes

// Utility function so that a Promise returns an Array of [err, result]
const to = promise => promise.then(data => {
  return [null, data];
}).catch(err => [err]);

// Server-side caching middleware, with TTL of `durationInSeconds`
// https://link.medium.com/QLX8zYgoYdb
const cache = durationInSeconds => (req, res, next) => {
  const key = '__express__' + req.originalUrl || req.url;
  const cachedBody = mcache.get(key);
  if (cachedBody) {
    res.send(cachedBody);
    return;
  }

  res.sendResponse = res.send;
  res.send = body => {
    mcache.put(key, body, durationInSeconds * 1000);
    res.sendResponse(body);
  }

  next();
};

// Static routes
app.use(express.static(`${__dirname}/build/`));

// This is the endpoint that Front will call on load of the plugin
app.get('/api/list-templates', cache(TTL_SECONDS), async (req, res) => {
  // Deny requests that do not come from Front
  if (AUTH_SECRET && req.query.auth_secret !== AUTH_SECRET)
    return res.sendStatus(401);

  const [err, templates] = await to(frontDriver.getTeamMessageTemplates());
  if (err) {
    console.error(err);

    if (err.statusCode && err.message)
      return res.status(err.statusCode).send(err.message);

    return res.status(500).send(err);
  }

  if (!templates)
    return res.sendStatus(404);

  templates.sort((a, b) => a.name.localeCompare(b.name));
  res.send({data: templates});
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
