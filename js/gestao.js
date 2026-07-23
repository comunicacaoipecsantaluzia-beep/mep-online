// =========================================
// VERIFICA LOGIN
// =========================================

document.addEventListener("DOMContentLoaded", async () => {

    const { data } = await supabaseClient.auth.getUser();

    if (!data.user) {
        window.location.href = "login.html?tipo=gestao";
        return;
    }


    const { data: usuario, error } = await supabaseClient
        .from("usuarios")
        .select("tipo_acesso")
        .eq("auth_id", data.user.id)
        .single();


    if (error || !usuario || usuario.tipo_acesso !== "gestao") {

        await supabaseClient.auth.signOut();

        window.location.href = "login.html?tipo=gestao";

        return;
    }

});




// =========================================
// ELEMENTOS
// =========================================


const btnDashboard = document.getElementById("btn-dashboard");
const btnCursos = document.getElementById("btn-cursos");
const btnIgrejas = document.getElementById("btn-igrejas");
const btnRelatorios = document.getElementById("btn-relatorios");
const dashboard = document.getElementById("dashboard");
const cursos = document.getElementById("cursos");
const igrejas = document.getElementById("igrejas");
const relatorios = document.getElementById("relatorios");
const detalheCurso = document.getElementById("detalheCurso");
console.log("Detalhe curso:", detalheCurso);
const voltarCursos = document.getElementById("voltarCursos");
const detalheNome = document.getElementById("detalheNome");
const detalheCategoria = document.getElementById("detalheCategoria");
const detalheDescricao = document.getElementById("detalheDescricao");
const detalheCapa = document.getElementById("detalheCapa");
const tituloPagina = document.getElementById("tituloPagina");
const irCriarCurso = document.getElementById("irCriarCurso");
const novoCurso = document.getElementById("novoCurso");
const btnAtualizar = document.getElementById("btnAtualizar");
const modalMaterial = document.getElementById("modalMaterial");
const novoMaterial = document.getElementById("novoMaterial");
const fecharMaterial = document.getElementById("fecharMaterial");
const cancelarMaterial = document.getElementById("cancelarMaterial");
const salvarMaterial = document.getElementById("salvarMaterial");
const arquivoMaterial = document.getElementById("arquivoMaterial");
const previewMaterial = document.getElementById("previewMaterial");

let cursoAtual = null;
let arquivosSelecionados = [];



// =========================================
// TROCAR PÁGINA
// =========================================


function abrirPagina(pagina){


    if(!pagina) return;


    dashboard.style.display = "none";

    cursos.style.display = "none";

    igrejas.style.display = "none";

    relatorios.style.display = "none";

    detalheCurso.style.display = "none";


    pagina.style.display = "block";


    document.querySelectorAll(".menu button")
    .forEach(btn=>{

        btn.classList.remove("active");

    });


}


// =========================================
// MENU
// =========================================



if(btnDashboard){

btnDashboard.addEventListener("click",()=>{


    abrirPagina(dashboard);


    btnDashboard.classList.add("active");


    tituloPagina.innerHTML = "Gestão de Ensino";


});


}



if(btnCursos){

btnCursos.addEventListener("click",()=>{


    abrirPagina(cursos);


    btnCursos.classList.add("active");


    tituloPagina.innerHTML = "Cursos";


});


}



if(btnIgrejas){

btnIgrejas.addEventListener("click",()=>{


    abrirPagina(igrejas);


    btnIgrejas.classList.add("active");


    tituloPagina.innerHTML = "Igrejas";


});


}




if(btnRelatorios){

btnRelatorios.addEventListener("click",()=>{


    abrirPagina(relatorios);


    btnRelatorios.classList.add("active");


    tituloPagina.innerHTML = "Relatórios";


});


}





// =========================================
// MODAL CURSO
// =========================================


const modal = document.getElementById("modalCurso");

const fecharModal = document.getElementById("fecharModal");

const cancelarCurso = document.getElementById("cancelarCurso");

const inputCapa = document.getElementById("cursoCapa");

const previewCapa = document.getElementById("previewCapa");

const removerCapa = document.getElementById("removerCapa");




function abrirModalCurso(){


    if(modal){

        modal.style.display = "flex";

    }

}




function fecharModalCurso(){


    if(modal){

        modal.style.display = "none";

    }

}

function abrirModalMaterial(){

    modalMaterial.style.display = "flex";

}

function fecharModalMaterial(){

    modalMaterial.style.display = "none";

}





if(novoCurso){


novoCurso.addEventListener("click",()=>{


    abrirModalCurso();


});


}




if(irCriarCurso){


irCriarCurso.addEventListener("click",()=>{


    abrirPagina(cursos);


    btnCursos.classList.add("active");


    tituloPagina.innerHTML = "Cursos";


    abrirModalCurso();


});


}




if(fecharModal){

fecharModal.addEventListener("click",fecharModalCurso);

}



if(cancelarCurso){

cancelarCurso.addEventListener("click",fecharModalCurso);

}

// =========================================
// EVENTOS MODAL MATERIAL
// =========================================

if(novoMaterial){

    novoMaterial.addEventListener("click",abrirModalMaterial);

}

if(fecharMaterial){

    fecharMaterial.addEventListener("click",fecharModalMaterial);

}

if(cancelarMaterial){

    cancelarMaterial.addEventListener("click",fecharModalMaterial);

}

// =========================================
// PREVIEW DO MATERIAL
// =========================================

if(arquivoMaterial){

    arquivoMaterial.addEventListener("change",(e)=>{

        const arquivos = Array.from(e.target.files);

        arquivos.forEach(arquivo=>{

            arquivosSelecionados.push(arquivo);

        });

        atualizarPreviewMateriais();

        arquivoMaterial.value = "";

    });

}

function atualizarPreviewMateriais(){

    previewMaterial.innerHTML = "";

    if(arquivosSelecionados.length === 0){

        previewMaterial.innerHTML = "Nenhum arquivo selecionado.";

        return;

    }

    arquivosSelecionados.forEach((arquivo,index)=>{

        const tamanho = (arquivo.size / 1024 / 1024).toFixed(2);

        previewMaterial.innerHTML += `

        <div class="arquivo-item">

            <div>

                <strong>${arquivo.name}</strong><br>

                <small>${tamanho} MB</small>

            </div>

            <button
            class="remover-arquivo"
            onclick="removerArquivo(${index})">

                ✕

            </button>

        </div>

        `;

    });

}

function removerArquivo(index){

    arquivosSelecionados.splice(index,1);

    atualizarPreviewMateriais();

}



// =========================================
// PREVIEW CAPA
// =========================================


if(inputCapa){


inputCapa.addEventListener("change",(e)=>{


    const arquivo = e.target.files[0];


    if(arquivo){


        const imagem = document.createElement("img");


        imagem.src = URL.createObjectURL(arquivo);


        previewCapa.innerHTML = "";


        previewCapa.appendChild(imagem);


    }


});


}





if(removerCapa){


removerCapa.addEventListener("click",()=>{


    inputCapa.value = "";


    previewCapa.innerHTML = `

        <span>
        Prévia da capa
        </span>

    `;


});


}




// =========================================
// SALVAR CURSO
// =========================================



const salvarCurso = document.getElementById("salvarCurso");


console.log("Botão salvar:", salvarCurso);



if(salvarCurso){


salvarCurso.addEventListener("click", async()=>{


    const nome = document.getElementById("cursoNome").value;

    const descricao = document.getElementById("cursoDescricao").value;

    const categoria = document.getElementById("cursoCategoria").value;


    const arquivo = inputCapa.files[0];



    if(!nome){

        alert("Digite o nome do curso");

        return;

    }



    let capaUrl = null;



    if(arquivo){


const nomeLimpo = arquivo.name
.replace(/\s+/g, "-")
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, "")
.replace(/[^a-zA-Z0-9.-]/g, "");


const nomeArquivo = Date.now()+"-"+nomeLimpo;



        const {error:uploadError} = await supabaseClient
        .storage
        .from("cursos")
        .upload(nomeArquivo,arquivo);



        if(uploadError){

    console.log("ERRO UPLOAD:", uploadError);

    alert(uploadError.message);

    return;

}



        const publicUrl = supabaseClient
        .storage
        .from("cursos")
        .getPublicUrl(nomeArquivo);



        capaUrl = publicUrl.data.publicUrl;


    }




    const usuario = await supabaseClient.auth.getUser();



    const {error} = await supabaseClient
    .from("cursos")
    .insert({

        nome:nome,

        descricao:descricao,

        categoria:categoria,

        capa:capaUrl,

        criado_por:usuario.data.user.id

    });




    if(error){

    console.log("ERRO CURSO:", error);

    alert(error.message);

    return;

}



    alert("Curso criado com sucesso");



    fecharModalCurso();



});


}

// =========================================
// LISTAR CURSOS
// =========================================

async function carregarCursos(){


    const listaCursos = document.getElementById("listaCursos");


    if(!listaCursos) return;



    const { data, error } = await supabaseClient
    .from("cursos")
    .select("*")
    .order("criado_em", { ascending:false });



    if(error){

        console.log("Erro ao buscar cursos:", error);

        return;

    }



    listaCursos.innerHTML = "";



    if(data.length === 0){


        listaCursos.innerHTML = `

        <div class="curso-vazio">

        Nenhum curso cadastrado.

        </div>

        `;


        return;

    }




    data.forEach(curso=>{


        listaCursos.innerHTML += `


        <div class="card-curso">


            <img src="${curso.capa || 'img/logo.png'}">


            <div class="info-curso">


                <h3>
                ${curso.nome}
                </h3>


                <span>
                ${curso.categoria || "Sem categoria"}
                </span>


                <p>
                ${curso.descricao || ""}
                </p>

<div class="acoes-curso">

    <button 
    class="btn-acessar"
    onclick="abrirCurso('${curso.id}')">

        Acessar Curso

    </button>


    <button 
    class="btn-excluir"
    onclick="excluirCurso('${curso.id}')">

        Excluir

    </button>

</div>

            </div>


        </div>


        `;


    });



}



// carregar ao abrir página

carregarCursos();

// =========================================
// BOTÃO ATUALIZAR
// =========================================

if(btnAtualizar){


btnAtualizar.addEventListener("click",async()=>{


    await carregarCursos();


    await carregarDashboard();


});


}

// =========================================
// ACESSAR CURSO
// =========================================

async function abrirCurso(id){

    // Buscar curso
    const { data, error } = await supabaseClient
        .from("cursos")
        .select("*")
        .eq("id", id)
        .single();

    if(error){

        console.log(error);
        alert("Erro ao abrir curso.");

        return;

    }

    // Guarda o curso selecionado
    cursoAtual = data;

    // Preenche informações
    detalheNome.textContent = data.nome;
    detalheCategoria.textContent = data.categoria || "Sem categoria";
    detalheDescricao.textContent = data.descricao || "Sem descrição.";

    detalheCapa.src = data.capa || "img/logo.png";

    // Esconde lista
    cursos.style.display = "none";

    // Mostra detalhes
    detalheCurso.style.display = "block";

    // Atualiza título
    tituloPagina.innerHTML = data.nome;

    // Carregar materiais
    carregarMateriais();

}

async function carregarMateriais(){

    const lista = document.getElementById("listaMateriais");

    lista.innerHTML = `

        <div class="curso-vazio">

            Em breve os materiais aparecerão aqui.

        </div>

    `;

}

// =========================================
// EXCLUIR CURSO
// =========================================


async function excluirCurso(id){


    const confirmar = confirm(
        "Deseja realmente excluir este curso?"
    );


    if(!confirmar) return;



    const {error} = await supabaseClient

    .from("cursos")

    .delete()

    .eq("id",id);



    if(error){

        console.log(error);

        alert("Erro ao excluir curso");

        return;

    }



    alert("Curso excluído");


    carregarCursos();


}

// =========================================
// VOLTAR PARA LISTA DE CURSOS
// =========================================

if(voltarCursos){

    voltarCursos.addEventListener("click",()=>{

        detalheCurso.style.display = "none";

        cursos.style.display = "block";

        tituloPagina.innerHTML = "Cursos";

        document.querySelectorAll(".menu button").forEach(btn=>{
            btn.classList.remove("active");
        });

        btnCursos.classList.add("active");

    });

}

// =========================================
// SALVAR MATERIAL
// =========================================

if(salvarMaterial){

salvarMaterial.addEventListener("click", async()=>{

    if(!cursoAtual){

        alert("Nenhum curso selecionado.");

        return;

    }

    if(arquivosSelecionados.length === 0){

        alert("Selecione pelo menos um arquivo.");

        return;

    }

    const nomeMaterial = document
    .getElementById("materialNome")
    .value.trim();

    const descricao = document
    .getElementById("materialDescricao")
    .value.trim();

    if(nomeMaterial == ""){

        alert("Digite o nome do material.");

        return;

    }

    for(const arquivo of arquivosSelecionados){

        const nomeLimpo = arquivo.name
        .replace(/\s+/g,"-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"")
        .replace(/[^a-zA-Z0-9.-]/g,"");

        const nomeArquivo =
        Date.now()+"-"+nomeLimpo;

        // Upload

        const { error:uploadError } =
        await supabaseClient.storage

        .from("materiais")

        .upload(nomeArquivo,arquivo);

        if(uploadError){

            console.log(uploadError);

            alert(uploadError.message);

            return;

        }

        const url = supabaseClient.storage

        .from("materiais")

        .getPublicUrl(nomeArquivo);

        const usuario =
        await supabaseClient.auth.getUser();

        const { error } =
        await supabaseClient

        .from("materiais")

        .insert({

            curso_id:cursoAtual.id,

            nome:nomeMaterial,

            descricao:descricao,

            arquivo:url.data.publicUrl,

            tipo:arquivo.type,

            tamanho:arquivo.size,

            criado_por:usuario.data.user.id

        });

        if(error){

            console.log(error);

            alert(error.message);

            return;

        }

    }

    alert("Material enviado com sucesso!");

    arquivosSelecionados = [];

    atualizarPreviewMateriais();

    document.getElementById("materialNome").value="";

    document.getElementById("materialDescricao").value="";

    fecharModalMaterial();

    carregarMateriais();

});

}

