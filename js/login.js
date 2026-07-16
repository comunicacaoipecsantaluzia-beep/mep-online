const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        alert("Preencha o e-mail e a senha.");
        return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password: senha
    });

    if (error) {
        alert(error.message);
        return;
    }

    const { data: usuario, error: erroUsuario } = await supabaseClient
        .from("usuarios")
        .select("*")
        .eq("auth_id", data.user.id)
        .single();

    if (erroUsuario || !usuario) {
        alert("Usuário não possui acesso ao sistema.");
        await supabaseClient.auth.signOut();
        return;
    }

    if (usuario.tipo_acesso === "gestao") {
        window.location.href = "gestao.html";
    } else if (usuario.tipo_acesso === "igreja") {
        window.location.href = "portal.html";
    } else {
        alert("Tipo de acesso inválido.");
        await supabaseClient.auth.signOut();
    }

});