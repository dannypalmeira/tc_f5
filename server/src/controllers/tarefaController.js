import db from '../config/firebaseConfig.js';
import { validarCamposObrigatoriosTarefa, validarCamposValidosTarefa } from '../models/Tarefas.js';

class TarefaController {

    // consultar tarefas
    static async listaTarefa(req, res) {
        try {
            const snapshot = await db.collection('tarefas').get();
            if (snapshot.empty) {
                return res.status(404).send('Não há tarefas cadastradas.');
            }
            
            let tarefas = [];
            snapshot.forEach(doc => {
                tarefas.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
    
            res.status(200).json(tarefas);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
            res.status(500).send('Erro ao buscar tarefas.');
        }
    }

    // cadastra tarefas e verifica campos
    static async cadastraTarefa(req, res) {
        const camposFaltando = validarCamposObrigatoriosTarefa(req.body);
        const camposInvalidos = validarCamposValidosTarefa(req.body);
    
        if (camposFaltando.length > 0) {
            return res.status(400).json({ error: `Campos faltando: ${camposFaltando.join(', ')}` });
        }
    
        if (camposInvalidos.length > 0) {
            return res.status(400).json({ error: `Campos inválidos: ${camposInvalidos.join(', ')}` });
        }
    
        try {
            const { id_time, id_usu, nome_tarefa,descricao, prazo, situacao, data_ini } = req.body;
            const tarefa = { id_time,nome_tarefa, id_usu, descricao, prazo, situacao, data_ini };
    
            const tarefasRef = await db.collection('tarefas').add(tarefa);
            
            res.status(201).send(`Tarefa criada com ID: ${tarefasRef.id}`);
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            res.status(500).send('Erro ao criar tarefa. Por favor, tente novamente.');
        }
    }

    // consulta tarefa através do ID
    static async listaTarefaPorId(req, res) {
        const { id } = req.params;
    
        try {
            const tarefaDoc = await db.collection('tarefas').doc(id).get();
    
            if (!tarefaDoc.exists) {
                return res.status(404).send('Tarefa não encontrada.');
            }
    
            const tarefa = {
                id: tarefaDoc.id,
                dados: tarefaDoc.data()
            };
    
            res.status(200).json(tarefa);
        } catch (error) {
            console.error('Erro ao buscar tarefa:', error);
            res.status(500).send('Erro ao buscar tarefa.');
        }
    }

    // Atualiza tarefa através do ID e verifica campos inválidos
    static async atualizarTarefa(req, res) {
        const { id } = req.params;
        const camposInvalidos = validarCamposValidosTarefa(req.body);
    
        if (camposInvalidos.length > 0) {
            return res.status(400).json({ error: `Campos inválidos: ${camposInvalidos.join(', ')}` });
        }
    
        const { id_time, id_usu,nome_tarefa, descricao, prazo, situacao, data_ini } = req.body;
    
        if (!id_time && !id_usu && !nome_tarefa && !descricao && !prazo && !situacao && !data_ini) {
            return res.status(400).json({ error: 'Nenhum campo para atualizar fornecido.' });
        }
    
        try {
            const tarefaRef = db.collection('tarefas').doc(id);
            const tarefaDoc = await tarefaRef.get();
    
            if (!tarefaDoc.exists) {
                return res.status(404).send('Tarefa não encontrada.');
            }
    
            const dadosAtualizados = {};
            if (id_time) dadosAtualizados.id_time = id_time;
            if (id_usu) dadosAtualizados.id_usu = id_usu;
            if (nome_tarefa) dadosAtualizados.nome_tarefa = nome_tarefa;
            if (descricao) dadosAtualizados.descricao = descricao;
            if (prazo) dadosAtualizados.prazo = prazo;
            if (situacao) dadosAtualizados.situacao = situacao;
            if (data_ini) dadosAtualizados.data_ini = data_ini;
    
            await tarefaRef.update(dadosAtualizados);
    
            res.status(200).send(`Tarefa com ID: ${id} atualizada com sucesso.`);
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            res.status(500).send('Erro ao atualizar tarefa. Por favor, tente novamente.');
        }
    }

    // apaga tarefa por ID
    static async apagaTarefaPorId(req, res) {
        const { id } = req.params;
    
        try {
            const tarefaRef = db.collection('tarefas').doc(id);
            const tarefaDoc = await tarefaRef.get();
    
            if (!tarefaDoc.exists) {
                return res.status(404).send('Tarefa não encontrada.');
            }
    
            await tarefaRef.delete();
            res.status(200).json(`Tarefa com ID: ${id} deletada com sucesso.`);
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
            res.status(500).send('Erro ao deletar tarefa. Por favor, tente novamente.');
        }
    }
}

export default TarefaController;
