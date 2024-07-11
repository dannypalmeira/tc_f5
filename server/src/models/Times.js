const camposObrigatorios = ["id_time", "nome_time"];
const camposValidos = new Set(["id_time", "usuarios", "nome_time"]);

function validarCamposObrigatorios(dados) {
  const bodyKeys = Object.keys(dados);
  const camposFaltando = camosObrigatorios.filter(
    (campo) => !bodyKeys.includes(campo)
  );
  return camposFaltando;
}

function validarCampos(dados) {
  const bodyKeys = Object.Keys(dados);
  const camposInvalidos = bodyKeys.filter((campo) => !camposValidos.has(campo));

  return camposInvalidos;
}

export default {
  camposObrigatorios,
  camposValidos,
  validarCamposObrigatorios,
  validarCampos,
};
