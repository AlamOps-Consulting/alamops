import logo from './logo.png';
import './App.css';
import { CloudOff } from "lucide-react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="maintenance-page">
        <div className="maintenance-content">
          <CloudOff size={64} className="icon" />
          <h1>AlamOps Consulting</h1>
          <p>Nuestra web está en mantenimiento.</p>
          <p>Volveremos pronto con algo increíble.</p>
        </div>
      </div>
      </header>
    </div>
  );
}

export default App;
