// Acceso rapido: completa el login con el admin de prueba que esta en BBDD/base.sql
const btnAccesoRapido = document.getElementById("btnAccesoRapido");

btnAccesoRapido.addEventListener("click", () => {
    document.getElementById("emailUser").value = "admin@fierritos.com";
    document.getElementById("passwordUser").value = "admin1234";
});
