const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const getPortfolioData = () => {
  const dataPath = path.join(__dirname, '../data/portfolioData.json');
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
};

router.get('/portfolio', (req, res) => {
  try {
    res.json(getPortfolioData());
  } catch (err) {
    res.status(500).json({ error: 'Failed to load portfolio data' });
  }
});

router.get('/projects', (req, res) => {
  try {
    res.json(getPortfolioData().projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

router.get('/projects/:id', (req, res) => {
  try {
    const data = getPortfolioData();
    const project = data.projects.find(p => p.id === req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load project' });
  }
});

module.exports = router;
