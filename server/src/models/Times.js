// funções que verifica os campos passados no body utilizadas no controller
const camposObrigatoriosTime = ['usuarios', 'nome_time'];
const camposValidosTime = new Set(['usuarios', 'nome_time']);


function validarCamposObrigatoriosTime(dados) {
    const bodyKeys = Object.keys(dados);
    const camposFaltando = camposObrigatoriosTime.filter(campo => !bodyKeys.includes(campo));
    return camposFaltando;
}

function validarCamposValidosTime(dados) {
    const bodyKeys = Object.keys(dados);
    const camposInvalidos = bodyKeys.filter(campo => !camposValidosTime.has(campo));
    return camposInvalidos;
}

export { 
    camposObrigatoriosTime, 
    camposValidosTime, 
    validarCamposObrigatoriosTime, 
    validarCamposValidosTime 
};
