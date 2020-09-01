import React, {useEffect, useState} from 'react';

import api from './services/api';
import './global.css';
import './App.css';
import './Aside.css'
import './Main.css'

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data){
    setIsLoading(true);
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);

    setIsLoading(false);
  }

  return (
    <div id="app">
      {isLoading &&
        <div id="loading">
          <h2 id="label_loading">Carregando...</h2>
        </div>
      }
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {
            devs.map((dev) => (<DevItem key={dev._id} dev={dev} />))
          }
        </ul>
      </main>
    </div>
  );
}

export default App;
