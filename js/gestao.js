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

// =================================
// MEP ONLINE - GESTÃO
// NAVEGAÇÃO
// =================================


// BOTÕES MENU

const btnDashboard = document.getElementById("btn-dashboard");
const btnCursos = document.getElementById("btn-cursos");
const btnMateriais = document.getElementById("btn-materiais");
const btnIgrejas = document.getElementById("btn-igrejas");
const btnRelatorios = document.getElementById("btn-relatorios");



// SEÇÕES

const dashboard = document.getElementById("dashboard");
const cursos = document.getElementById("cursos");
const materiais = document.getElementById("materiais");
const igrejas = document.getElementById("igrejas");
const relatorios = document.getElementById("relatorios");

const tituloPagina = document.getElementById("tituloPagina");



// FUNÇÃO PARA TROCAR ABA

function abrirPagina(pagina){

    dashboard.style.display = "none";
    cursos.style.display = "none";
    materiais.style.display = "none";
    igrejas.style.display = "none";
    relatorios.style.display = "none";


    pagina.style.display = "block";


    document.querySelectorAll(".menu button")
    .forEach(btn => {

        btn.classList.remove("active");

    });

}



// DASHBOARD

btnDashboard.addEventListener("click",()=>{

    abrirPagina(dashboard);

    btnDashboard.classList.add("active");

    tituloPagina.innerHTML = "Gestão de Ensino";

});




// CURSOS

btnCursos.addEventListener("click",()=>{

    abrirPagina(cursos);

    btnCursos.classList.add("active");

    tituloPagina.innerHTML = "Cursos";

});




// MATERIAIS

btnMateriais.addEventListener("click",()=>{

    abrirPagina(materiais);

    btnMateriais.classList.add("active");

    tituloPagina.innerHTML = "Materiais";

});




// IGREJAS

btnIgrejas.addEventListener("click",()=>{

    abrirPagina(igrejas);

    btnIgrejas.classList.add("active");

    tituloPagina.innerHTML = "Igrejas";

});




// RELATÓRIOS

btnRelatorios.addEventListener("click",()=>{

    abrirPagina(relatorios);

    btnRelatorios.classList.add("active");

    tituloPagina.innerHTML = "Relatórios";

});





// =================================
// BOTÃO NOVO CURSO NO DASHBOARD
// =================================


const irCriarCurso = document.getElementById("irCriarCurso");


if(irCriarCurso){

    irCriarCurso.addEventListener("click",()=>{


        abrirPagina(cursos);


        btnCursos.classList.add("active");


        tituloPagina.innerHTML = "Cursos";


    });


}



// =================================
// BOTÃO CRIAR CURSO
// =================================


const novoCurso = document.getElementById("novoCurso");


if(novoCurso){


    novoCurso.addEventListener("click",()=>{


        alert("Abrir cadastro de curso");


    });


}

const modal = document.getElementById("modalCurso");

document.getElementById("novoCurso").onclick = ()=>{

    modal.style.display="flex";

};

document.getElementById("irCriarCurso").onclick = ()=>{

    modal.style.display="flex";

};

document.getElementById("fecharModal").onclick = ()=>{

    modal.style.display="none";

};