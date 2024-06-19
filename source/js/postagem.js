        // Botão de Voltar ao Topo
        var mybutton = document.getElementById("backToTopBtn");

        // Quando o usuário rolar 20px para baixo a partir do topo do documento, mostra o botão
        window.onscroll = function () { scrollFunction() };

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        }

// Quando o usuário clicar no botão, rola para o topo do documento de forma suave
function topFunction() {
    // Opções de comportamento para rolar suavemente
    const behavior = 'smooth';

    // Rola para o topo do documento
    window.scrollTo({
        top: 0,
        behavior: behavior
    });
}