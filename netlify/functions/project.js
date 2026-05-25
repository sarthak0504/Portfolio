const data = require('../../server/data/portfolioData.json');

exports.handler = async (event) => {
  const fromQuery = (event.queryStringParameters || {}).id;
  const fromPath  = (event.rawUrl || event.path || '').split('/').filter(Boolean).pop();
  const id        = fromQuery || fromPath;

  if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'Missing id' }) };

  const project = data.projects.find(p => p.id === id);
  if (!project) return { statusCode: 404, body: JSON.stringify({ error: 'Project not found' }) };

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(project),
  };
};
