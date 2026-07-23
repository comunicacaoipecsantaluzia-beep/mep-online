document.addEventListener("DOMContentLoaded", async()=>{


    console.log("PORTAL INICIOU");


    const {data:sessionData} = await supabaseClient.auth.getSession();


    console.log("SESSÃO:", sessionData.session);



    if(!sessionData.session){

        console.log("SEM SESSÃO");

        window.location.href="login.html?tipo=igreja";

        return;

    }



    const user = sessionData.session.user;



    console.log("AUTH USER:", user);



    const {data:usuario,error} =
    await supabaseClient
    .from("usuarios")
    .select("*")
    .eq("auth_id",user.id)
    .single();



    console.log("USUARIO TABELA:", usuario);

    console.log("ERRO USUARIO:", error);



    if(error || !usuario){

        alert("Não achou usuário na tabela usuarios");

        return;

    }



    console.log("TIPO ACESSO:", usuario.tipo_acesso);



});