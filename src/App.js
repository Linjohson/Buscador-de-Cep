import './style.css';
import { FiSearch } from "react-icons/fi";
import { useState } from 'react';
import api from './service/api';


function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});



  async function pesquisar(){
    if(input === ''){
      alert('Você precisa digitar algum CEP');
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    }catch{
      alert("Erro ao buscar o CEP");
      setInput('');
    }

    
  }

  return (
    
    <div className="Container">
      
        <h1 className='title'>Buscador de CEP</h1>
        
        <div  className='inputContainer'>
          <input 
          className='input' 
          placeholder='Digite aqui o CEP'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ></input>
          <button className='buttonSearch' onClick={pesquisar}>
            <FiSearch size={30} color="#fff" ></FiSearch>
          </button>
        </div>
        
      
      {Object.keys(cep).length > 0 &&(
        <div className='resultado'>
        <h2>Cep: {cep.cep}</h2>
        <h3>Bairro: {cep.bairro}</h3>
        <h3>Endereço: {cep.logradouro}</h3>
        <h3>Complemento: {cep.complemento}</h3>
        <h3>Localidade: {cep.localidade} - {cep.uf}</h3>

      </div>
      )}
      
    </div>
  );
}

export default App;
