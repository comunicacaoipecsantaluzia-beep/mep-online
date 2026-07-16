// =================================
// LOGIN MEP ONLINE
// =================================


const btnLogin = document.getElementById("btnLogin");


btnLogin.addEventListener("click", async ()=>{


const email = document.querySelector(
'input[type="email"]'
).value;


const senha = document.querySelector(
'input[type="password"]'
).value;



if(!email || !senha){

alert("Preencha email e senha");

return;

}




const {data,error} = await supabaseClient.auth.signInWithPassword({

email: email,

password: senha

});




if(error){

alert("Email ou senha incorretos");

console.error(error);

return;

}




const usuario = await supabaseClient

.from("usuarios")

.select("*")

.eq(
"auth_id",
data.user.id
)

.single();




if(usuario.error){

alert("Usuário sem permissão cadastrada");

return;

}




if(usuario.data.tipo_acesso === "gestao"){


window.location.href="gestao.html";


}



if(usuario.data.tipo_acesso === "igreja"){


window.location.href="portal.html";


}



});

console.log("login.js carregado");