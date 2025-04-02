// frontend/src/pages/Home/index.jsx

import { useState, useRef } from 'react';
import api from '../../services/api';
import './style.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [successMessage, setSuccessMessage] = useState('');
    const inputTitle = useRef();
    const selectStatus = useRef(); // Referência para o select de status
    const navigate = useNavigate();

    async function createTask() {
        try {
            await api.post('/api/tasks', {
                title: inputTitle.current.value,
                status: selectStatus.current.value, // Envia o valor do status
            });
            inputTitle.current.value = '';
            setSuccessMessage('Tarefa cadastrada com sucesso!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
        }
    }

    return (
        <div className="container">
            <form>
                <h1>Cadastro de Atividades</h1>
                <input placeholder="Título" name="título" ref={inputTitle} />
                <select ref={selectStatus}> {/* Select para o status */}
                    <option value="Pendente">Pendente</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluída">Concluída</option>
                </select>
                <button type="button" onClick={createTask}>
                    Cadastrar
                </button>
            </form>
            <button
                type="button"
                onClick={() => navigate('/tasks')}
                className="list-tasks-button"
            >
                Listar Tarefas
            </button>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
}

export default Home;