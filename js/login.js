const btnLogin = document.getElementById("btnLogin");


btnLogin.addEventListener("click", async () => {


    const email = document
    .getElementById("email")
    .value
    .trim();


    const senha = document
    .getElementById("senha")
    .value;



    if(!email || !senha){

        alert("Preencha o e-mail e a senha.");

        return;

    }



    // LOGIN AUTH

    const {data, error} = await supabaseClient.auth
    .signInWithPassword({

        email:email,

        password:senha

    });



    if(error){

        console.log(error);

        alert("Email ou senha incorretos.");

        return;

    }




    // BUSCAR PERFIL DO USUÁRIO

    const {data:usuario, error:erroUsuario} =
    await supabaseClient
    .from("usuarios")
    .select("*")
    .eq("auth_id", data.user.id)
    .single();



    if(erroUsuario || !usuario){


        console.log(erroUsuario);


        alert("Usuário sem permissão de acesso.");

        await supabaseClient.auth.signOut();

        return;


    }




    // DIRECIONAMENTO


    switch(usuario.tipo_acesso){


        case "gestao":


            window.location.href = "gestao.html";


        break;




        case "igreja":


            window.location.href = "portal.html";


        break;




        default:


            alert("Tipo de acesso inválido.");

            await supabaseClient.auth.signOut();


    }



});