// URL da API de times (ajuste conforme necessário)
const apiTimesUrl = 'http://localhost:4000/times';

// Função para carregar os nomes dos times disponíveis no <select>
async function carregarTimesDisponiveis() {
    const select = document.getElementById('atribuir');

    try {
        const response = await fetch(apiTimesUrl);
        if (!response.ok) {
            throw new Error('Erro ao buscar times disponíveis');
        }

        const times = await response.json(); // Recebe os times da API (espera um array de objetos)

        // Limpa as opções existentes
        select.innerHTML = '';

        // Adiciona a opção padrão
        const optionPadrao = document.createElement('option');
        optionPadrao.value = '';
        optionPadrao.textContent = 'Selecione um time';
        select.appendChild(optionPadrao);

        // Preenche o select com os nomes dos times recebidos da API
        times.forEach(time => {
            const option = document.createElement('option');
            option.value = JSON.stringify({ id: time.id, nome_time: time.data.nome_time }); // Converte para JSON
            option.textContent = time.data.nome_time; // Exibe o nome_time
            select.appendChild(option);

            // Mostra como ficou a opção convertida em JSON
            console.log('Opção convertida:', option);
        });

        console.log('Nomes de times disponíveis:', times); // Imprime os nomes de times recebidos no console
    } catch (error) {
        console.error('Erro ao carregar nomes de times disponíveis:', error);
        alert('Erro ao carregar nomes de times disponíveis. Por favor, tente novamente.');
    }
}

// Carrega os nomes dos times disponíveis ao carregar a página
document.addEventListener('DOMContentLoaded', carregarTimesDisponiveis);

// Atualiza o campo de atribuir tarefa com o nome do time selecionado
const select = document.getElementById('atribuir');
select.addEventListener('change', function() {
    const selectedOption = select.options[select.selectedIndex];

    if (selectedOption.value) {
        select.value = selectedOption.value; // Define o value do select com o valor selecionado
    }
});
