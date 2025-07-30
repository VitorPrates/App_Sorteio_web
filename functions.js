const numeros_registrados = [];

document.addEventListener("DOMContentLoaded", () => {
    organizar_numeros();
})

function organizar_numeros()
{   
    const participantes = document.querySelector(".numeros_participantes");
    numeros_registrados.sort((a,b) => a - b);

    numeros_registrados.forEach((num) => {
        participantes.innerHTML += `<span>${num}</span>`;
    })
}

function Adicionar_numero(Form) {
    const valor = Form[0].value.trim();
    const participantes = document.querySelector(".numeros_participantes");

    if (valor === ""){alert("Insira um número"); return false; } 
        
    console.log(valor);
    console.log(numeros_registrados);
    if (numeros_registrados.includes(valor)) {
    alert(`Número ${valor} já registrado`);
    Form[0].value = "";
    return false;
    }

    numeros_registrados.push(valor);
    participantes.innerHTML += `<span>${valor}</span>`;
    Form[0].value = "";
    // organizar_numeros();
    return false; // impede recarregar a página
}

function Limpar_numeros()
{
    if(confirm("Deseja realmente limpar os números?") === false) return;
    numeros_registrados.length = 0;
    const participantes = document.querySelector(".numeros_participantes");
    participantes.innerHTML = "";
}

function sortear()
{
    if(numeros_registrados.length === 0) {
        alert("Nenhum número registrado");
        return;
    }
    const sorteado = Math.floor(Math.random() * numeros_registrados.length);
    const numero_sorteado = document.querySelector(".numero_sorteado");
    numero_sorteado.innerHTML = `<span>${numeros_registrados[sorteado]}</span>`
}
