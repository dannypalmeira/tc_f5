// funcções que verifica os campos passados no body utilizadas no controller
const camposObrigatorios = ["nome", "tipo_usu", "email", "senha"];
const camposValidos = new Set(["nome", "tipo_usu", "email", "senha"]);

function validarCamposObrigatorios(dados) {
  const bodyKeys = Object.keys(dados);
  const camposFaltando = camposObrigatorios.filter(
    (campo) => !bodyKeys.includes(campo)
  );
  return camposFaltando;
}

function validarCamposValidos(dados) {
  const bodyKeys = Object.keys(dados);
  const camposInvalidos = bodyKeys.filter((campo) => !camposValidos.has(campo));
  return camposInvalidos;
}

export {
  camposObrigatorios,
  camposValidos,
  validarCamposObrigatorios,
  validarCamposValidos,
};
