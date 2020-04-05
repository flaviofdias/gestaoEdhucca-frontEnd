import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

import api from '~/services/api';
import { Container, Line } from '~/pages/_layouts/list/styles';
// import ListActions from '~/components/ListActions';

export default function CompanyList() {
  const [ companies, setCompanies ] = useState([]);
  const [ qFilter, setQFilter ] = useState([]);

  useEffect(() => {
    loadCompanies('');
  }, [])

  async function loadCompanies(filter) {
    const response = await api.get('companies', {
      // params: { test: filter },
    })

    setCompanies(response.data)
  }
  console.tron.log(companies);

  function handleInputChange(e) {
    setQFilter(e.target.value);
    // console.log(qFilter)
  }

  function handleQueryInput(e) {
    if ( e.key === 'Enter')
    // console.log(qFilter);
    loadCompanies(qFilter);
  }

  return (
   <Container>
      <header>
        <strong>Gerenciando empresas</strong>
        <div>
          <input name='filter' className='filter' placeholder='Busca por alunos'
            onChange={handleInputChange} onKeyDown={handleQueryInput}
          />
          <Link to='/companies'>
            <button type="button"><MdAdd size={24} color='#FFF'/>Voltar</button>
          </Link>
        </div>
        <p>
          <strong>ID</strong>
          <strong>Nome</strong>
          <strong>CPF</strong>
          <strong>Situação</strong>
          <strong>Ações</strong>
        </p>
      </header>

      <ul>
        {companies.map(c =>
          <Line key={c.id}>
            <strong>#{c.id}</strong>
            <strong>{c.name}</strong>
            <strong>{c.cnpj}</strong>
            <strong>Ativo</strong>
            <strong>Contrato</strong>

          </Line>
        )}
      </ul>
   </Container>
  );
}
