import './index.css';
import DynamicCards from './Pages/DynamicCards';
import DemoCard from './Pages/DemoCard';

function App() {
  return (
    <div className="App app-main-container">
    <div className='header-div'>Wellness Retrets</div>
    <DemoCard/>
    <DynamicCards/>
    <footer className="footer main-footer">
    <p>© 2024 Wellness Retreats. All rights reserved.</p>
  </footer>

    </div>
  );
}

export default App;
