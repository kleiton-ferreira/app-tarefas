//frontend/src/main.jsx

// frontend/src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home';
import TaskList from './pages/TaskList'; // Importa o novo componente
import '../src/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa BrowserRouter, Routes e Route
import '@fortawesome/fontawesome-free/css/all.min.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter> {/* Envolve a aplicação com BrowserRouter */}
            <Routes> {/* Define as rotas */}
                <Route path="/" element={<Home />} /> {/* Rota para a página Home */}
                <Route path="/tasks" element={<TaskList />} /> {/* Rota para a página TaskList */}
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);