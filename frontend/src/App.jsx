import React, { useState, useEffect } from 'react';
import api from './api';
import ServerList from './components/ServerList';
import AddServerForm from './components/AddServerForm';
import { LayoutDashboard } from 'lucide-react';
import './App.css';

function App() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await api.get('/servers/');
        setServers(response.data);
      } catch (error) {
        console.error("Error fetching servers:", error);
      }
    };

    fetchServers();
  }, []);

  const handleServerAdded = (newServer) => {
    setServers([...servers, newServer]);
  };

  return (
    <div className="App">
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
        }
        body {
          display: block;
          max-width: 100%;
          place-items: unset;
        }
        /* Ensure inputs don't overflow their grid cells */
        .form-group input, .form-group select {
           max-width: 100%;
        }
      `}</style>
      <header className="App-header">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <LayoutDashboard size={28} className="text-primary" style={{ color: 'var(--primary)' }} />
          <h1>DevOps Server Manager</h1>
        </div>
      </header>
      <main className="container">
        <AddServerForm onServerAdded={handleServerAdded} />
        <ServerList servers={servers} setServers={setServers} />
      </main>
    </div>
  );
}

export default App;
