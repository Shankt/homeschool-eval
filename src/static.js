import { getHTML } from './frontend.js';

export function serveStatic(path) {
  const html = getHTML();
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
