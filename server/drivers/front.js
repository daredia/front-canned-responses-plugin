const fetch = require('node-fetch');

const apiHost = 'https://api2.frontapp.com';

const fetchAndValidate = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.FRONT_API_TOKEN}`,
    },
  });

  if (!response.ok && response.status !== 404)
      throw Error(response.statusText);

  if (response.status === 404)
    return ({});

  const json = await response.json();
  return json;
};

const getTeamMessageTemplates = async () => {
  console.log({msg: 'Fetching team message templates'});

  const endpoint = `/teams/${process.env.FRONT_MASTER_TEAM_ID}/responses`;
  const response = await fetchAndValidate(`${apiHost}${endpoint}`);
  const {_results, _pagination, _error} = response;

  let nextPageUrl = _pagination?.next;
  const results = _results;

  while (nextPageUrl) {
    const response = await fetchAndValidate(nextPageUrl);
    const {_results, _pagination, _error} = response;

    nextPageUrl = _pagination?.next;
    results.push(..._results);
  }

  return results || [];
};

module.exports = {
  getTeamMessageTemplates: getTeamMessageTemplates
};
