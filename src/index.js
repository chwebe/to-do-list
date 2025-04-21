import './styles/index.css';

// Example module import
import { hello } from './app';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `
      <div class="app">
        <h1>Webpack Template</h1>
        <p>Edit <code>src/index.js</code> and save to reload.</p>
        <div class="message">${hello()}</div>
      </div>
    `;
  }
});
