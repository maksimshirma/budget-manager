import { createRoot } from 'react-dom/client';
import { App } from '@/app';
import './styles.scss';

const root = document.getElementById('root');

if (!root) {
  throw Error('Root element not found.');
}

createRoot(root).render(<App />);
