import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import FlashcardGrid from './FlashcardGrid';

// 'describe' agrupa os testes para o componente FlashcardGrid
describe('FlashcardGrid Component', () => {

  // Teste 1: Verifica o estado inicial
  it('should render the flashcards with English words initially', () => {
    // Renderiza o componente
    render(<FlashcardGrid />);

    // Procura pelas palavras em inglês e afirma que elas estão na tela
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('goodbye')).toBeInTheDocument();
    expect(screen.getByText('water')).toBeInTheDocument();
  });

  // Teste 2: Verifica a interação do usuário
  it('should flip the card to Portuguese when clicked', () => {
    // Renderiza o componente
    render(<FlashcardGrid />);

    // Encontra o card "hello"
    const helloCard = screen.getByText('hello');

    // Simula um clique do usuário
    fireEvent.click(helloCard);

    // Afirma que o resultado esperado aconteceu:
    // 1. A palavra em português "olá" apareceu
    expect(screen.getByText('olá')).toBeInTheDocument();
    
    // 2. A palavra em inglês "hello" desapareceu
    expect(screen.queryByText('hello')).not.toBeInTheDocument();
  });

});