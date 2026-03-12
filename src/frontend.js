export function getHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Homeschool Evaluation Tracker</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --blue: #2E75B6;
      --dark-blue: #1F3864;
      --green: #1E5C3A;
      --teal: #0E6655;
      --purple: #5B2C6F;
      --orange: #7D3C00;
      --red: #922B21;
      --light: #f5f7fa;
      --border: #dde2ea;
      --text: #1a1a2e;
      --muted: #6b7280;
      --white: #ffffff;
      --radius: 10px;
      --shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: var(--light);
      color: var(--text);
      min-height: 100vh;
    }
