const AUTH_SECRET = process.env.AUTH_SECRET;

const express = require('express');
const app = express();
const port = process.env.PORT || 9070;

// Utility function so that a Promise returns an Array of [err, result]
const to = promise => promise.then(data => {
  return [null, data];
}).catch(err => [err]);

// Static routes
app.use(express.static(`${__dirname}/build/`));

// This is the endpoint that Front will call on load of the plugin
app.get('/api/search', async (req, res) => {
  // Deny requests that do not come from Front
  if (AUTH_SECRET && req.query.auth_secret !== AUTH_SECRET)
    return res.sendStatus(401);

  res.send({ data: {msg: 'Hello world from server.'} });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
