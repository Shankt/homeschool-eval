/**
 * Homeschool Evaluation Tracker
 * Cloudflare Worker — main entry point
 */

import { handleStudents } from './routes/students.js';
import { handleEvaluations } from './routes/evaluations.js';
import { handleSubjects } from './routes/subjects.js';
import { handleDashboard } from './routes/dashboard.js';
import { serveStatic } from './static.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      if (path.startsWith('/api/students')) return handleStudents(request, env, corsHeaders);
      if (path.startsWith('/api/evaluations')) return handleEvaluations(request, env, corsHeaders);
      if (path.startsWith('/api/subjects')) return handleSubjects(request, env, corsHeaders);
      if (path.startsWith('/api/dashboard')) return handleDashboard(request, env, corsHeaders);
      return serveStatic(path);
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  },
};
