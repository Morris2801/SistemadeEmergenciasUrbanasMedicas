import React from 'react';
import SelectorUI from './SelectorUI';
import { useNavigate } from 'react-router-dom';

const Selector: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return <SelectorUI onNavigate={handleNavigate} />;
};

export default Selector;

