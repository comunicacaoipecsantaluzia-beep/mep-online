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
const detalheDescricao = document.getElementById("detalheDescricao");
const detalheCapa = document.getElementById("detalheCapa");


const tituloPagina = document.getElementById("tituloPagina");


const irCriarCurso = document.getElementById("irCriarCurso");
const novoCurso = document.getElementById("novoCurso");
const btnAtualizar = document.getElementById("btnAtualizar");



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

function abrirCurso(id){

    console.log("Abrindo curso:", id);

}

// =========================================
// EXCLUIR CURSO
// =========================================

async function excluirCurso(id){


const confirmar = confirm(
"Tem certeza que deseja excluir este curso?"
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



alert("Curso excluído com sucesso");


carregarCursos();


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

