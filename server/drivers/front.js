const fetch = require('node-fetch');

const apiHost = 'https://api2.frontapp.com';

const getTeamMessageTemplates = async () => {
  console.log({msg: 'Fetching team message templates'});

  const endpoint = `/teams/${process.env.FRONT_MASTER_TEAM_ID}/responses`;

  const response = await fetch(`${apiHost}${endpoint}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.FRONT_API_TOKEN}`,
    },
  })
  .then(r => {
    if (!r.ok && r.status !== 404)
      throw Error(r.statusText);

    if(r.status === 404)
      return ({});

    return r.json();
  })
  // TODO(shez): check for pagination and aggregate results accordingly
  .then(response => response._results)
  .catch(err => { throw err; });

  return response;
};

module.exports = {
  getTeamMessageTemplates: getTeamMessageTemplates
};
