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

const modal = document.getElementById("modalCurso");
const fecharModal = document.getElementById("fecharModal");



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

function abrirModalCurso(){

    modal.style.display = "flex";

}

function fecharModalCurso(){

    modal.style.display = "none";

}


if(irCriarCurso){

    irCriarCurso.addEventListener("click",()=>{

        abrirPagina(cursos);

        btnCursos.classList.add("active");

        tituloPagina.innerHTML = "Cursos";

        abrirModalCurso();

    });

}


if(novoCurso){

    novoCurso.addEventListener("click",abrirModalCurso);

}


if(fecharModal){

    fecharModal.addEventListener("click",fecharModalCurso);

}


window.addEventListener("click",(e)=>{

    if(e.target === modal){

        fecharModalCurso();

    }

});