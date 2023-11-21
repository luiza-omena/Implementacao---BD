// Sobre.jsx

import React from 'react';
import './Sobre.css';

const Sobre = () => {
  return (
    <div className='container'>
      <div className='conteudo'>
        <p className='descricao'>
          Para o desenvolvimento do nosso trabalho escolhemos a empresa Grifo, fundada em 2002 por Pérside Omena, ela tem como seu mercado de atuação a recuperação de obras de arte, sejam elas bens móveis, como quadros ou esculturas, ou bens imóveis como igrejas e tetos de catedral.
          Dessa forma, tomamos tal organização como base para o desenvolvimento do nosso projeto, propondo a criação de uma plataforma, visto que a empresa ainda não conta com um sistema próprio para divulgação do seu trabalho.
          Assim, de forma presencial, realizamos uma entrevista com a fundadora da Grifo para melhor entender como seria a modelagem do nosso banco de dados. 
        </p>
      </div>
    </div>
  );
};

export default Sobre;
