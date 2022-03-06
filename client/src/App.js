import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router';

const App = () => {
  return (
    <Router>
      <main style={{ minHeight: '80vh' }}>
        <AppRouter />
      </main>
    </Router>
  );
};

export default App;
