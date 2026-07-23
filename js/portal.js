// =========================================
// VERIFICA LOGIN IGREJA
// =========================================

document.addEventListener("DOMContentLoaded", async () => {


    const { data } = await supabaseClient.auth.getUser();



    if (!data.user) {


        window.location.href = "login.html?tipo=igreja";


        return;


    }





    const { data: usuario, error } = await supabaseClient
    .from("usuarios")
    .select("*")
    .eq("auth_id", data.user.id)
    .single();





    if(error || !usuario || usuario.tipo_acesso !== "igreja"){



        await supabaseClient.auth.signOut();



        window.location.href = "login.html?tipo=igreja";



        return;



    }





    console.log("Usuário igreja:", usuario);





    // =========================================
    // BUSCAR IGREJA VINCULADA
    // =========================================


    const { data: igreja, error: erroIgreja } = 
    await supabaseClient
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





    // =========================================
    // MOSTRAR NOME DA IGREJA
    // =========================================


    const nomeIgreja = document.getElementById("nomeIgreja");



    if(nomeIgreja){


        nomeIgreja.innerHTML = igreja.nome;


    }





    // =========================================
    // AQUI ENTRARÁ A BUSCA DOS CURSOS
    // LIBERADOS PARA ESSA IGREJA
    // =========================================



});