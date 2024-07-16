// apiConfig.js
export const apiTimesUrl = "http://localhost:4000/times";
export const apiTarefasUrl = "http://localhost:4000/tarefas";

//
export const carregarTimesDisponiveis = async () => {
  try {
    const response = await fetch(apiTimesUrl);
    if (!response.ok) {
      throw new Error("Erro ao buscar times disponíveis");
    }
    const timesData = await response.json();
    setTimes(timesData);
  } catch (error) {
    console.error("Erro ao carregar nomes de times disponíveis:", error);
    alert(
      "Erro ao carregar nomes de times disponíveis. Por favor, tente novamente."
    );
  }
};

///

export const adicionaTarefa = async (tarefa) => {
  try {
    const response = await fetch(apiTarefasUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar tarefa");
    }

    // Retornar algum dado se necessário
    return response.json(); // por exemplo, retorna os dados da tarefa criada
  } catch (error) {
    throw new Error("Erro ao enviar tarefa");
  }
};
