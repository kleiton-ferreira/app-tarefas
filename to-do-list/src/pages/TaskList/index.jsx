//frontend/src/pages/TaskList/index.jsx

import { useState, useEffect } from 'react';
import api from '../../services/api';
import './style.css';
import { useNavigate } from 'react-router-dom';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedStatus, setEditedStatus] = useState('Pendente'); // Estado para o status editado
    const navigate = useNavigate();

    async function getTasks() {
        try {
            const response = await api.get('/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
        }
    }

    async function deleteTask(id) {
        try {
            await api.delete(`/api/tasks/${id}`);
            getTasks();
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
        }
    }

    async function handleEdit(id, title, status) {
        setEditingTask(id);
        setEditedTitle(title);
        setEditedStatus(status); // Define o status atual para edição
    }

    async function saveEditedTask(id) {
        try {
            await api.put(`/api/tasks/${id}`, { title: editedTitle, status: editedStatus }); // Envia o status editado
            setEditingTask(null);
            getTasks();
        } catch (error) {
            console.error('Erro ao editar tarefa:', error);
        }
    }

    function cancelEdit() {
        setEditingTask(null);
        setEditedTitle('');
    }

    function handleStatusChange(event) {
        setEditedStatus(event.target.value); // Atualiza o status ao mudar o select
    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="container">
            <h1>Lista de Atividades</h1>
            <button
                type="button"
                onClick={() => navigate('/')}
                className="back-button"
            >
                Voltar
            </button>
            {tasks.map((task) => (
                <div className="card" key={task._id}>
                    <div className="task-info">
                        {editingTask === task._id ? (
                            <>
                                <label htmlFor={`title-${task._id}`}>Título:</label>
                                <input
                                    id={`title-${task._id}`}
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                                <label htmlFor={`status-${task._id}`}>Situação:</label>
                                <select
                                    id={`status-${task._id}`}
                                    value={editedStatus}
                                    onChange={handleStatusChange}
                                >
                                    <option value="Pendente">Pendente</option>
                                    <option value="Em andamento">Em andamento</option>
                                    <option value="Concluída">Concluída</option>
                                </select>
                            </>
                        ) : (
                            <>
                                <p>Título: {task.title}</p>
                                <p>Situação: {task.status}</p>
                            </>
                        )}
                        {editingTask === task._id && (
                            <div className="edit-actions">
                                <button onClick={() => saveEditedTask(task._id)} className="save-button">
                                    Salvar
                                </button>
                                <button onClick={cancelEdit} className="cancel-button">
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="actions">
                        {!editingTask && (
                            <button onClick={() => handleEdit(task._id, task.title, task.status)} className="edit-button">
                                <i className="fas fa-pencil-alt action-icon"></i>
                            </button>
                        )}
                        <button onClick={() => deleteTask(task._id)} className="delete-button">
                            <i className="fas fa-trash action-icon"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TaskList;