// =========================================
// PORTAL IGREJA
// =========================================


// =========================================
// VERIFICA LOGIN IGREJA
// =========================================

document.addEventListener("DOMContentLoaded", async () => {


    // Verifica usuário logado

    const { data } = await supabaseClient.auth.getUser();



    if(!data.user){

        window.location.replace("login.html");

        return;

    }




    // Busca usuário no sistema

    const { data: usuario, error } = await supabaseClient

        .from("usuarios")

        .select("*")

        .eq("auth_id", data.user.id)

        .single();




    if(error || !usuario || usuario.tipo_acesso !== "igreja"){


        await supabaseClient.auth.signOut();

        window.location.replace("login.html");

        return;

    }




    console.log("Usuário logado:", usuario);




    // Busca igreja vinculada


    const { data: igreja, error: erroIgreja } = await supabaseClient

    .from("igrejas")

    .select("*")

    .eq("id", usuario.igreja_id)

    .single();





    if(erroIgreja || !igreja){



        console.log("Erro igreja:", erroIgreja);



        alert("Igreja não encontrada.");

        return;


    }







    console.log("Igreja atual:", igreja);






    // Mostrar nome da igreja


    const nomeIgreja = document.getElementById("nomeIgreja");



    if(nomeIgreja){


        nomeIgreja.innerHTML = igreja.nome;


    }







    // Carregar cursos liberados


    carregarCursosPortal(igreja.id);







});









// =========================================
// BUSCAR CURSOS LIBERADOS
// =========================================


async function carregarCursosPortal(igrejaId){



    const lista = document.getElementById("listaCursosPortal");



    if(!lista) return;






    // Buscar cursos liberados para a igreja


    const { data: acessos, error: erroAcesso } = await supabaseClient

    .from("igreja_cursos")

    .select("curso_id")

    .eq("igreja_id", igrejaId)

    .eq("ativo", true);






    if(erroAcesso){


        console.log("Erro acessos:", erroAcesso);


        lista.innerHTML = `

            <p>
            Erro ao buscar cursos.
            </p>

        `;


        return;


    }







    if(!acessos || acessos.length === 0){


        lista.innerHTML = `


        <div class="curso-vazio">


            <h3>

            Nenhum curso liberado

            </h3>


            <p>

            A gestão ainda não liberou nenhum conteúdo para sua igreja.

            </p>


        </div>



        `;


        return;


    }






    const idsCursos = acessos.map(item => item.curso_id);








    // Buscar informações dos cursos


    const { data: cursos, error: erroCursos } = await supabaseClient

    .from("cursos")

    .select("*")

    .in("id", idsCursos);






    if(erroCursos){


        console.log("Erro cursos:", erroCursos);


        return;


    }







    lista.innerHTML = "";








    cursos.forEach(curso => {



        lista.innerHTML += `



        <div class="curso-card">



            <img 
            src="${curso.capa || 'img/curso.jpg'}">





            <div class="curso-info">



                <h3>

                ${curso.nome}

                </h3>




                <p>

                ${curso.descricao || "Curso disponível no MEP Online."}

                </p>





               <button onclick="abrirCursoPortal('${curso.id}')">

Acessar Curso

</button>



            </div>



        </div>



        `;



    });





}

// =========================================
// ABRIR CURSO NO PORTAL
// =========================================


async function abrirCursoPortal(id){


    const listaCursos = document.querySelector(".cursos");

    const detalhe = document.getElementById("detalheCursoPortal");



    listaCursos.style.display = "none";

    detalhe.style.display = "block";




    const {data: curso, error} = await supabaseClient

    .from("cursos")

    .select("*")

    .eq("id", id)

    .single();




    if(error){

        console.log(error);

        return;

    }





    document.getElementById("nomeCursoPortal").innerHTML =
    curso.nome;



    document.getElementById("descricaoCursoPortal").innerHTML =
    curso.descricao || "";




    carregarMateriaisPortal(id);



}







// =========================================
// BUSCAR MATERIAIS DO CURSO
// =========================================


async function carregarMateriaisPortal(cursoId){



    const lista = document.getElementById("listaMateriaisPortal");




    const {data: materiais, error} = await supabaseClient

    .from("materiais")

    .select("*")

    .eq("curso_id", cursoId)

    .order("criado_em",{ascending:false});





    if(error){

        console.log(error);

        lista.innerHTML="Erro ao carregar materiais.";

        return;

    }





    if(!materiais || materiais.length === 0){


        lista.innerHTML = `

        <p>

        Nenhum material disponível.

        </p>

        `;


        return;


    }





    lista.innerHTML="";





    materiais.forEach(material=>{


        lista.innerHTML += `


        <div class="material-portal">


            <h3>

            ${material.nome}

            </h3>



            <p>

            ${material.descricao || ""}

            </p>



            <a href="${material.arquivo}" target="_blank">

            Abrir material

            </a>



        </div>


        `;


    });



}

// =========================================
// VOLTAR PARA CURSOS
// =========================================


document.addEventListener("click", (e)=>{


    if(e.target.id === "voltarCursosPortal"){


        const listaCursos = document.querySelector(".cursos");

        const detalhe = document.getElementById("detalheCursoPortal");



        if(listaCursos){

            listaCursos.style.display = "block";

        }



        if(detalhe){

            detalhe.style.display = "none";

        }



    }


});