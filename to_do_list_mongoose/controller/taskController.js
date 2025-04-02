// backend/controller/taskController.js

const Task = require('../model/task.js');

// Controlador para criar tarefa
const createTask = async (req, res) => {
    try {
        const { title, status } = req.body; // Agora pegamos o status
        const finished = false; // Pode remover isso, o status já define

        const newTask = new Task({
            title,
            status, // Usamos o status que veio da requisição
        });

        await newTask.save();

        res.json({
            message: 'Tarefa criada com sucesso!',
            task: newTask,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar tarefa' });
    }
};

// Controlador para buscar todas tarefas
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar tarefas' });
    }
};

// Controlador para deletar tarefa
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.deleteOne({ _id: id });
        res.json({ message: 'Tarefa removida com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover tarefa' });
    }
};

// Controlador para editar tarefa
// Controlador para editar tarefa
const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, status } = req.body; // Agora pegamos o status também

        const task = await Task.findByIdAndUpdate(id, { title, status }, { new: true }); // Atualiza o status

        res.json({
            message: 'Tarefa atualizada com sucesso!',
            task,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar tarefa' });
    }
};

module.exports = { getAllTasks, createTask, editTask, deleteTask };