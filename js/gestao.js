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

const tituloPagina = document.getElementById("tituloPagina");

const irCriarCurso = document.getElementById("irCriarCurso");
const novoCurso = document.getElementById("novoCurso");


// =========================================
// TROCAR PÁGINA
// =========================================

function abrirPagina(pagina){

    dashboard.style.display = "none";
    cursos.style.display = "none";
    igrejas.style.display = "none";
    relatorios.style.display = "none";

    pagina.style.display = "block";

    document.querySelectorAll(".menu button").forEach(btn=>{

        btn.classList.remove("active");

    });

}



// =========================================
// MENU
// =========================================

btnDashboard.addEventListener("click",()=>{

    abrirPagina(dashboard);

    btnDashboard.classList.add("active");

    tituloPagina.innerHTML = "Gestão de Ensino";

});


btnCursos.addEventListener("click",()=>{

    abrirPagina(cursos);

    btnCursos.classList.add("active");

    tituloPagina.innerHTML = "Cursos";

});


btnIgrejas.addEventListener("click",()=>{

    abrirPagina(igrejas);

    btnIgrejas.classList.add("active");

    tituloPagina.innerHTML = "Igrejas";

});


btnRelatorios.addEventListener("click",()=>{

    abrirPagina(relatorios);

    btnRelatorios.classList.add("active");

    tituloPagina.innerHTML = "Relatórios";

});



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
// PREVIEW DA CAPA
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




// =========================================
// REMOVER CAPA
// =========================================


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



        // UPLOAD DA CAPA

        if(arquivo){


            const nomeArquivo = `${Date.now()}-${arquivo.name}`;



            const { error: uploadError } = await supabaseClient
            .storage
            .from("cursos")
            .upload(nomeArquivo, arquivo);



            if(uploadError){

                console.log(uploadError);

                alert("Erro ao enviar imagem");

                return;

            }



            const { data } = supabaseClient
            .storage
            .from("cursos")
            .getPublicUrl(nomeArquivo);



            capaUrl = data.publicUrl;


        }



        // SALVAR CURSO


        const { error } = await supabaseClient
        .from("cursos")
        .insert({

            nome:nome,

            descricao:descricao,

            categoria:categoria,

            capa:capaUrl,

            criado_por:(await supabaseClient.auth.getUser()).data.user.id

        });



        if(error){

            console.log(error);

            alert("Erro ao salvar curso");

            return;

        }



        alert("Curso criado com sucesso");


        fecharModalCurso();


    });

}