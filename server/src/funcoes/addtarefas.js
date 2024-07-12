// URLS das APIs depois colocar isso em um arquivo fechado para não vazar
const apiTimesUrl = 'http://localhost:4000/times';
const apiTarefasUrl = 'http://localhost:4000/tarefas';

// Função para carregar os nomes dos times disponíveis no <select> e alterar a info do campo conforme na base
async function carregarTimesDisponiveis() {
    try {
        const response = await fetch(apiTimesUrl);
        if (!response.ok) {
            throw new Error('Erro ao buscar times disponíveis');
        }

        const times = await response.json(); // Guarda em times a info

        // Preenche o select com os nomes dos times recebidos da API
        const select = document.getElementById('atribuir');
        select.innerHTML = '<option value="">Selecione um time</option>';//selecionando html
        times.forEach(time => {
            select.innerHTML += `<option value="${time.id}">${time.data.nome_time}</option>`; // espelhando a anterior porem com a troca para o id no valor e no nome do campo o nome time
        });

        console.log('Nomes de times disponíveis:', times); // somente verificando os times listados apagar depois zzz
    } catch (error) {
        console.error('Erro ao carregar nomes de times disponíveis:', error);
        alert('Erro ao carregar nomes de times disponíveis. Por favor, tente novamente.');
    }
}

// recarrega os nomes dos times disponíveis ao carregar a página 
document.addEventListener('DOMContentLoaded', carregarTimesDisponiveis);

// Submissão do formulário para criação da tarefa
document.getElementById('tarefaForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // pegando a identificação dos campos, utilizar esses id nos campos do cria tarefa
    const nome_tarefa = document.getElementById('tarefa').value;
    const id_time = document.getElementById('atribuir').value;
    const situacao = document.getElementById('situacao').value;
    const data_ini = document.getElementById('data_tarefa').value;
    const descricao = document.getElementById('descricao').value;
    const prazo = document.getElementById('prioridade').value;

    // isso aqui é temporario para depois utilizar da pessoa que fez login, como isso ainda n sei kkkkkkkkkkk
    const id_usu = '12345'; // Substitua com o ID do usuário real

    try {
        const tarefa = {
            nome_tarefa: nome_tarefa,
            id_usu: id_usu,
            id_time: id_time,
            situacao: situacao,
            data_ini: data_ini,
            descricao: descricao,
            prazo: prazo 
        };

        console.log('Tarefa criada:', tarefa);// saber que foi criada tarefa, apagar depois do formulario pronto e colocar para fechar o modal

        // aqui é a chamada da api utilizando o corpo acima que passamos na const tarefa
        const response = await fetch(apiTarefasUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tarefa)
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar tarefa');
        }

        // Código para lidar com sucesso da criação da tarefa
        alert('Tarefa criada com sucesso!');
        // Limpar formulário ou fazer outra ação de UI

    } catch (error) {
        console.error('Erro ao criar tarefa:', error.message);
        alert('Erro ao criar tarefa. Por favor, verifique os dados e tente novamente.');
    }
});

