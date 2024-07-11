// Campos obrigatórios e válidos para a coleção de tarefas
const camposObrigatoriosTarefa = [
  "id_time",
  "id_usu",
  "nome_tarefa",
  "descricao",
  "prazo",
  "situacao",
  "data_ini",
];
const camposValidosTarefa = new Set([
  "id_time",
  "id_usu",
  "nome_tarefa",
  "descricao",
  "prazo",
  "situacao",
  "data_ini",
]);

function validarCamposObrigatoriosTarefa(dados) {
  const bodyKeys = Object.keys(dados);
  const camposFaltando = camposObrigatoriosTarefa.filter(
    (campo) => !bodyKeys.includes(campo)
  );
  return camposFaltando;
}

function validarCamposValidosTarefa(dados) {
  const bodyKeys = Object.keys(dados);
  const camposInvalidos = bodyKeys.filter(
    (campo) => !camposValidosTarefa.has(campo)
  );
  return camposInvalidos;
}

export {
  camposObrigatoriosTarefa,
  camposValidosTarefa,
  validarCamposObrigatoriosTarefa,
  validarCamposValidosTarefa,
};
