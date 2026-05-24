import axios from 'axios';

const BASE = '/api';

export const getPortfolioData  = ()    => axios.get(`${BASE}/portfolio`);
export const getProjects        = ()    => axios.get(`${BASE}/projects`);
export const getProjectById     = (id)  => axios.get(`${BASE}/projects/${id}`);
