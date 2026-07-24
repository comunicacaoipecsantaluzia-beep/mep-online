// =========================================
// VERIFICA LOGIN
// =========================================

document.addEventListener("DOMContentLoaded", async () => {

    const { data } = await supabaseClient.auth.getUser();

    if (!data.user) {

        window.location.replace("login.html");

        return;

    }


    const { data: usuario, error } = await supabaseClient

        .from("usuarios")

        .select("tipo_acesso")

        .eq("auth_id", data.user.id)

        .single();



    if (error || !usuario || usuario.tipo_acesso !== "gestao") {

        await supabaseClient.auth.signOut();

        window.location.replace("login.html");

        return;

    }

});


// =========================================
// ELEMENTOS
// =========================================


const btnDashboard = document.getElementById("btn-dashboard");
const btnCursos = document.getElementById("btn-cursos");
const btnIgrejas = document.getElementById("btn-igrejas");
const listaIgrejas = document.getElementById("listaIgrejas");
const btnAtualizarIgrejas = document.getElementById("btnAtualizarIgrejas");
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
const listaIgrejasCurso = document.getElementById("listaIgrejasCurso");
const salvarLiberacoes = document.getElementById("salvarLiberacoes");
const detalheCapa = document.getElementById("detalheCapa");
const tituloPagina = document.getElementById("tituloPagina");
const irCriarCurso = document.getElementById("irCriarCurso");
const novoCurso = document.getElementById("novoCurso");
const btnAtualizar = document.getElementById("btnAtualizar");
const modalMaterial = document.getElementById("modalMaterial");
const novoMaterial = document.getElementById("novoMaterial");
const modalIgreja = document.getElementById("modalIgreja");
const novaIgreja = document.getElementById("novaIgreja");
const fecharIgreja = document.getElementById("fecharIgreja");
const cancelarIgreja = document.getElementById("cancelarIgreja");
const fecharMaterial = document.getElementById("fecharMaterial");
const cancelarMaterial = document.getElementById("cancelarMaterial");
const salvarMaterial = document.getElementById("salvarMaterial");
const salvarIgreja = document.getElementById("salvarIgreja");
const igrejaImagem = document.getElementById("igrejaImagem");
const previewIgreja = document.getElementById("previewIgreja");
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


        carregarIgrejas();


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

function abrirModalIgreja(){

    modalIgreja.style.display = "flex";

}


function fecharModalIgreja(){

    modalIgreja.style.display = "none";

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

if(novaIgreja){

    novaIgreja.addEventListener("click",()=>{

        abrirModalIgreja();

    });

}


if(fecharIgreja){

    fecharIgreja.addEventListener("click",fecharModalIgreja);

}


if(cancelarIgreja){

    cancelarIgreja.addEventListener("click",fecharModalIgreja);

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




    // Guarda curso selecionado

    cursoAtual = data;





    // Preenche informações

    detalheNome.textContent = data.nome;

    detalheCategoria.textContent = data.categoria || "Sem categoria";

    detalheDescricao.textContent = data.descricao || "Sem descrição.";

    detalheCapa.src = data.capa || "img/logo.png";





    // Esconde lista de cursos

    cursos.style.display = "none";





    // Mostra detalhe

    detalheCurso.style.display = "block";





    // Atualiza título

    tituloPagina.innerHTML = data.nome;





    // Carregar materiais

    carregarMateriais();





    // Carregar igrejas liberadas

    carregarIgrejasCurso();



}









// =========================================
// CARREGAR MATERIAIS DO CURSO
// =========================================


async function carregarMateriais(){



    const lista = document.getElementById("listaMateriais");



    if(!lista || !cursoAtual){

        return;

    }





    const {data: materiais, error} = await supabaseClient

    .from("materiais")

    .select("*")

    .eq("curso_id", cursoAtual.id)

    .order("criado_em", {ascending:false});






    if(error){



        console.log("Erro ao buscar materiais:", error);



        lista.innerHTML = `

        <div class="curso-vazio">

            Erro ao carregar materiais.

        </div>

        `;



        return;


    }







    if(!materiais || materiais.length === 0){



        lista.innerHTML = `

        <div class="curso-vazio">


            <h3>

            Nenhum material enviado

            </h3>


            <p>

            Clique em + Adicionar Material para enviar arquivos deste curso.

            </p>


        </div>

        `;



        return;


    }








    lista.innerHTML = "";







    materiais.forEach(material => {



        lista.innerHTML += `


        <div class="material-card">



            <div class="material-info">



                <h3>

                    ${material.nome}

                </h3>



                <p>

                    ${material.descricao || "Material do curso"}

                </p>



                <small>

                    ${material.tipo || ""}

                    ${material.tamanho || ""}

                </small>



            </div>






            <div class="material-acoes">

    <a
    href="${material.arquivo}"
    target="_blank">

        Abrir arquivo

    </a>

    <button
    class="btn-excluir-material"
    onclick="excluirMaterial('${material.id}')">

        Excluir

    </button>

</div>



        `;



    });



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



    if(nomeMaterial === ""){

        alert("Digite o nome do material.");

        return;

    }



    const usuario = await supabaseClient.auth.getUser();



    for(const arquivo of arquivosSelecionados){



        const nomeLimpo = arquivo.name

        .replace(/\s+/g,"-")

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g,"")

        .replace(/[^a-zA-Z0-9.-]/g,"");



        const nomeArquivo = 
        `${cursoAtual.id}/${Date.now()}-${nomeLimpo}`;



        console.log("Enviando arquivo:", nomeArquivo);



        // UPLOAD STORAGE

       console.log("Bucket utilizado:", "materiais");


const { data: uploadData, error: uploadError } =

await supabaseClient

.storage

.from("materiais")

.upload(
    nomeArquivo,
    arquivo,
    {
        upsert:false
    }
);


        if(uploadError){


            console.log("ERRO UPLOAD:", uploadError);


            alert(uploadError.message);


            return;


        }



        console.log("Upload concluído:", uploadData);




        // PEGAR URL PÚBLICA


        const url = supabaseClient.storage

        .from("materiais")

        .getPublicUrl(nomeArquivo);




        // SALVAR NO BANCO



        const { error } = await supabaseClient

        .from("materiais")

        .insert({


            curso_id: cursoAtual.id,


            nome: nomeMaterial,


            descricao: descricao,


            arquivo: url.data.publicUrl,


            tipo: arquivo.type,


            tamanho: arquivo.size,


            criado_por: usuario.data.user.id


        });





        if(error){


            console.log("ERRO BANCO:", error);


            alert(error.message);


            return;


        }


    }



    alert("Material enviado com sucesso!");



    arquivosSelecionados = [];



    atualizarPreviewMateriais();



    document.getElementById("materialNome").value = "";

    document.getElementById("materialDescricao").value = "";



    fecharModalMaterial();



    carregarMateriais();



});


}

// =========================================
// SALVAR IPEC
// =========================================


if(salvarIgreja){


salvarIgreja.addEventListener("click", async()=>{


    const nome = document
    .getElementById("igrejaNome")
    .value.trim();


    const sigla = document
    .getElementById("igrejaSigla")
    .value.trim();


    const cidade = document
    .getElementById("igrejaCidade")
    .value.trim();


    const email = document
    .getElementById("igrejaEmail")
    .value.trim();


    const senha = document
    .getElementById("igrejaSenha")
    .value.trim();



    if(!nome || !email || !senha){


        alert("Preencha nome, email e senha.");

        return;


    }



    let imagemUrl = null;



    const imagem = igrejaImagem.files[0];



    if(imagem){


        const nomeArquivo = 
        Date.now()+"-"+imagem.name;



        const {error:uploadError} = 
        await supabaseClient
        .storage
        .from("igrejas")
        .upload(nomeArquivo, imagem);



        if(uploadError){

            console.log(uploadError);

            alert(uploadError.message);

            return;

        }



        const url =
        supabaseClient
        .storage
        .from("igrejas")
        .getPublicUrl(nomeArquivo);



        imagemUrl = url.data.publicUrl;


    }





    // =========================================
    // 1 - CRIAR LOGIN AUTH
    // =========================================


    const {data:authData, error:erroAuth} =

    await supabaseClient.auth.signUp({

        email:email,

        password:senha

    });



    if(erroAuth){


        console.log(erroAuth);

        alert(erroAuth.message);

        return;


    }





    const authId = authData.user.id;





    // =========================================
    // 2 - CRIAR IGREJA
    // =========================================


    const {data:novaIgreja,error:erroIgreja} =

    await supabaseClient
    .from("igrejas")
    .insert({

        nome:nome,

        sigla:sigla,

        cidade:cidade,

        imagem:imagemUrl,

        email:email

    })
    .select()
    .single();





    if(erroIgreja){


        console.log(erroIgreja);

        alert(erroIgreja.message);

        return;


    }





    // =========================================
    // 3 - CRIAR USUARIO VINCULADO
    // =========================================


    const {error:erroUsuario} =

    await supabaseClient
    .from("usuarios")
    .insert({

        auth_id:authId,

        nome:nome,

        email:email,

        tipo_acesso:"igreja",

        igreja_id:novaIgreja.id

    });





    if(erroUsuario){


        console.log(erroUsuario);

        alert(erroUsuario.message);

        return;


    }





    alert("IPEC cadastrada com acesso criado!");



    fecharModalIgreja();



    carregarIgrejas();



});


}


// =========================================
// CARREGAR IGREJAS
// =========================================

async function carregarIgrejas(){


    if(!listaIgrejas) return;



    const { data, error } = await supabaseClient
    .from("igrejas")
    .select("*")
    .order("criado_em", { ascending:false });



    if(error){

        console.log("Erro ao buscar igrejas:", error);

        listaIgrejas.innerHTML = `

            <div class="curso-vazio">

                Erro ao carregar igrejas.

            </div>

        `;

        return;

    }



    listaIgrejas.innerHTML = "";



    if(!data || data.length === 0){


        listaIgrejas.innerHTML = `

            <div class="curso-vazio">

                Nenhuma igreja cadastrada.

            </div>

        `;


        return;

    }



    data.forEach(igreja=>{


       listaIgrejas.innerHTML += `


<div class="card-igreja">


    <h3>
        ${igreja.nome}
    </h3>


    <p>
        ${igreja.cidade || "Cidade não informada"}
    </p>


    <span>
        ${status}
    </span>


    <button 
    class="btn-excluir-igreja"
    onclick="excluirIgreja('${igreja.id}')">

        Excluir

    </button>


</div>


`;


    });



}

// =========================================
// EXCLUIR IGREJA
// =========================================

async function excluirIgreja(id){


    const confirmar = confirm(
        "Deseja excluir essa igreja e todos os acessos vinculados?"
    );


    if(!confirmar) return;



    const {error} = await supabaseClient
    .from("igrejas")
    .delete()
    .eq("id", id);



    if(error){

        console.log(error);

        alert(error.message);

        return;

    }



    alert("Igreja excluída com sucesso!");


    carregarIgrejas();


}

// =========================================
// CARREGAR IGREJAS DO CURSO
// =========================================


async function carregarIgrejasCurso(){


    if(!listaIgrejasCurso || !cursoAtual){

        return;

    }



    const {data: igrejas, error} = await supabaseClient
    .from("igrejas")
    .select("id,nome")
    .order("nome");



    if(error){

        console.log("Erro ao buscar igrejas:", error);

        return;

    }





    const {data: liberadas, error: erroLiberadas} = await supabaseClient
    .from("igreja_cursos")
    .select("igreja_id")
    .eq("curso_id", cursoAtual.id);



    if(erroLiberadas){

        console.log("Erro ao buscar liberações:", erroLiberadas);

    }





    const idsLiberados = liberadas
    ? liberadas.map(item => item.igreja_id)
    : [];





    listaIgrejasCurso.innerHTML = "";





    igrejas.forEach(igreja=>{



        const marcado = idsLiberados.includes(igreja.id)
        ? "checked"
        : "";



        listaIgrejasCurso.innerHTML += `


            <label class="igreja-opcao">


                <input 
                type="checkbox"
                class="checkIgrejaCurso"
                value="${igreja.id}"
                ${marcado}>


                ${igreja.nome}


            </label>


        `;



    });



}

// =========================================
// SALVAR LIBERAÇÕES DO CURSO PARA IGREJAS
// =========================================


if(salvarLiberacoes){


    salvarLiberacoes.addEventListener("click", async()=>{


        if(!cursoAtual){

            alert("Nenhum curso selecionado.");

            return;

        }




        const selecionadas = 
        document.querySelectorAll(".checkIgrejaCurso:checked");



        const igrejasSelecionadas = 
        Array.from(selecionadas)
        .map(item => item.value);





        // Remove liberações antigas

        const {error: erroDelete} = await supabaseClient

        .from("igreja_cursos")

        .delete()

        .eq("curso_id", cursoAtual.id);





        if(erroDelete){

            console.log(erroDelete);

            alert("Erro ao limpar liberações.");

            return;

        }






        // Se não marcou nenhuma igreja, apenas remove tudo

        if(igrejasSelecionadas.length === 0){


            alert("Nenhuma igreja possui acesso a este curso.");

            return;


        }







        // Criar novas liberações


        const registros = igrejasSelecionadas.map(idIgreja => ({


            curso_id: cursoAtual.id,

            igreja_id: idIgreja,

            ativo:true


        }));







        const {error: erroInsert} = await supabaseClient

        .from("igreja_cursos")

        .insert(registros);






        if(erroInsert){

    console.log("ERRO COMPLETO:", erroInsert);

    alert(
        erroInsert.message + "\n\n" +
        erroInsert.details
    );

    return;

}






        alert("Liberações salvas com sucesso!");



        carregarIgrejasCurso();



    });



}

// =========================================
// EXCLUIR MATERIAL
// =========================================

async function excluirMaterial(id){


    const confirmar = confirm(
        "Deseja realmente excluir este material?"
    );


    if(!confirmar){

        return;

    }



    // Buscar material


    const {data: material, error} = await supabaseClient

    .from("materiais")

    .select("*")

    .eq("id", id)

    .single();



    if(error){

        console.log(error);

        alert("Erro ao localizar material.");

        return;

    }



    // Remove arquivo do Storage


    if(material.arquivo){

        const nomeArquivo = material.arquivo.split("/").pop();

        await supabaseClient

        .storage

        .from("materiais")

        .remove([nomeArquivo]);

    }



    // Remove registro do banco


    const {error: erroExcluir} = await supabaseClient

    .from("materiais")

    .delete()

    .eq("id", id);



    if(erroExcluir){

        console.log(erroExcluir);

        alert("Erro ao excluir material.");

        return;

    }



    carregarMateriais();

}