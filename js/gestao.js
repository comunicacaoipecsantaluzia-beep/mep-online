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

/* MODAL CURSO */

.modal{

    position:fixed;
    inset:0;

    background:rgba(0,0,0,.75);

    display:none;

    align-items:center;
    justify-content:center;

    z-index:999;

}


.modal-box{

    width:900px;

    background:#181818;

    border-radius:20px;

    padding:30px;

    color:#fff;

}



.modal-header{

    display:flex;

    justify-content:space-between;

    align-items:center;

    margin-bottom:25px;

}



.modal-header h2{

    font-size:24px;

}



.modal-header button{

    background:none;

    border:none;

    color:white;

    font-size:22px;

    cursor:pointer;

}



.modal-conteudo{

    display:flex;

    gap:35px;

}



/* CAPA */


.capa-area{

    width:330px;

}



.preview-capa{

    width:100%;

    aspect-ratio:16/9;

    background:#0f0f0f;

    border:2px dashed #444;

    border-radius:15px;

    display:flex;

    align-items:center;

    justify-content:center;

    color:#777;

    overflow:hidden;

    margin-bottom:15px;

}


.preview-capa img{

    width:100%;

    height:100%;

    object-fit:cover;

}



.upload-btn{

    display:flex;

    justify-content:center;

    align-items:center;

    background:#b30000;

    color:white;

    padding:12px;

    border-radius:10px;

    cursor:pointer;

    margin-bottom:10px;

}



.upload-btn input{

    display:none;

}



.remove-img{

    width:100%;

    background:#252525;

    color:white;

    border:1px solid #444;

    padding:12px;

    border-radius:10px;

    cursor:pointer;

}





/* FORM */


.form-area{

    flex:1;

}



.campo{

    display:flex;

    flex-direction:column;

    margin-bottom:18px;

}



.campo label{

    margin-bottom:7px;

    color:#ddd;

}



.campo input,
.campo textarea{


    background:#101010;

    border:1px solid #444;

    color:white;

    padding:13px;

    border-radius:10px;

    font-size:15px;

}



.campo textarea{

    height:120px;

    resize:none;

}



.acoes{

    display:flex;

    justify-content:flex-end;

    gap:15px;

    margin-top:25px;

}



.acoes button{

    padding:12px 25px;

    border-radius:10px;

    border:none;

    cursor:pointer;

}



#salvarCurso{

    background:#b30000;

    color:white;

}



#cancelarCurso{

    background:#333;

    color:white;

}