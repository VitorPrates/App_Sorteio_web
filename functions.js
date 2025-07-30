const numeros_registrados = [];
var synth = window.speechSynthesis;

document.addEventListener("DOMContentLoaded", () => {
    organizar_numeros();
    tipo_form();
})

function tipo_form(tipo)
{
    const numeros = document.getElementById("numeros");
    const inicio = document.getElementById("inicio");
    const fim = document.getElementById("fim");
    if(tipo === "Intervalo")
    {
        numeros.style.display = "none";
        inicio.style.display = "block";
        fim.style.display = "block";
    }
    else
    {
        numeros.style.display = "block";
        inicio.style.display = "none";
        fim.style.display = "none";
    }
}

function Remover_numero(valor)
{
    // numeros_registrados.pop(parseInt(valor));
    const pos = numeros_registrados.indexOf(parseInt(valor)); //pega a pos 
    if(pos > -1) {numeros_registrados.splice(pos, 1);}
    const participantes = document.querySelector(".numeros_participantes");
    participantes.innerHTML = "";
    numeros_registrados.forEach((num) => {
        participantes.innerHTML += '<span onclick=(Remover_numero(this.innerHTML))>'+num+'</span>';
    })
    if(numeros_registrados.length === 0)
    {
        participantes.style.display = "none";
    }
    else
    {
        participantes.style.display = "flex";
    }
}
function organizar_numeros()
{   

    const participantes = document.querySelector(".numeros_participantes");
    const numero_ja_registrado = document.querySelector(".numero_ja_registrado");
    if(numeros_registrados.length === 0)
    {
        participantes.style.display = "none";
        numero_ja_registrado.style.display = "none";
    }
    else
    {
        participantes.style.display = "flex";
        numero_ja_registrado.style.display = "flex";
    }
    numeros_registrados.sort((a,b) => a - b);

    numeros_registrados.forEach((num) => {
        participantes.innerHTML += `<span>${num}</span>`;
    })
}

function Adicionar_numero(Form) {
    const tipo_form = Form[0].value;
    const valor = Form[1].value.trim();
    const inicio = Form[2].value.trim();
    const fim = Form[3].value.trim();
    const participantes = document.querySelector(".numeros_participantes");
    const numero_ja_registrado = document.querySelector(".numero_ja_registrado");

    numero_ja_registrado.style.display = "none";
    if(tipo_form === "Individual" && isNaN(parseInt(valor))) {alert("Insira um número"); return false; }
    else if(tipo_form === "Intervalo" && isNaN(parseInt(inicio))) {alert("Insira um inicio"); return false; }
    else if(tipo_form === "Intervalo" && isNaN(parseInt(fim))) {alert("Insira um fim"); return false; }
    
    // console.log(valor);
    console.log(numeros_registrados);
    participantes.innerHTML = "";
    if(tipo_form === "Intervalo")
    {
        for(let i = inicio; i <= fim; i++)
        {
            if (numeros_registrados.includes(parseInt(i)))
            {
                continue;
            }
            numeros_registrados.push(parseInt(i));
            // participantes.innerHTML += `<span>${i}</span>`;
        }
        Form[1].value = "";
        Form[2].value = "";
        Form[3].value = "";
    }
    else if(tipo_form === "Individual")
    {
        if (numeros_registrados.includes(parseInt(valor)))
        {
            // alert(`Número ${valor} já registrado`);
            numero_ja_registrado.style.display = "block";
            Form[1].value = "";
            // return false;
        }
        else
        {
            numeros_registrados.push(parseInt(valor));
        }
        // participantes.innerHTML += `<span>${parseInt(valor)}</span>`;
        Form[1].value = "";
    }
    if(numeros_registrados.length === 0)
    {
        participantes.style.display = "none";
    }
    else
    {
        participantes.style.display = "flex";
    }
    numeros_registrados.sort((a,b) => a - b);
    numeros_registrados.forEach((num) => {
        // participantes.innerHTML += `<span onclick("Remover_numero(${this.innerHTML})")>${num}</span>`;
        participantes.innerHTML += '<span onclick=(Remover_numero(this.innerHTML))>'+num+'</span>';
    })
    // organizar_numeros();
    return false; // impede recarregar a página
}

function Limpar_numeros()
{
    if(confirm("Deseja realmente limpar os números?") === false) return;

    numeros_registrados.length = 0;
    const participantes = document.querySelector(".numeros_participantes");
    const numero_ja_registrado = document.querySelector(".numero_ja_registrado");
    if(numeros_registrados.length === 0)
    {
        participantes.style.display = "none";
        numero_ja_registrado.style.display = "none";
    }
    else
    {
        participantes.style.display = "flex";
        numero_ja_registrado.style.display = "flex";
    }
    participantes.innerHTML = "";
}

function FalarNumero(numero)
{
    const msg = new SpeechSynthesisUtterance(numero);
    msg.lang = 'pt-BR';
    msg.rate = 1;
    msg.pitch = 1;
    speechSynthesis.speak(msg);
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
    FalarNumero(numeros_registrados[sorteado]); 
}
