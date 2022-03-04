import { BrowserRouter as Router } from 'react-router-dom';
// import Header from "./components/header/Header";
// import Footer from "./components/Footer";
import AppRouter from './router';

const App = () => {
  return (
    <Router>
      {/* <Header /> */}
      <main style={{ minHeight: '80vh' }}>
        <AppRouter />
      </main>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
