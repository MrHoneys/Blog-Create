// FILTRA BARRA DE NAVEGAÇÃO DOS CARDS
function filterCards(category) {
    var cards = document.querySelectorAll('.card-item');
    cards.forEach(function(card) {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.add('show');
            card.style.display = 'block';
        } else {
            card.classList.remove('show');
            setTimeout(() => {
                card.style.display = 'none';
            }, ); 
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    filterCards('all');
});

// Barra de Pesquisa
var searchBar = document.querySelector('.search-bar');
var searchForm = document.querySelector('.form-inline');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    var searchTerm = searchBar.value.toLowerCase(); // Obtém o termo de pesquisa em minúsculas

    var cards = document.querySelectorAll('.card-item');
    cards.forEach(function(card) {
        var title = card.querySelector('.card-title').textContent.toLowerCase(); // Obtém o título do card em minúsculas
        var description = card.querySelector('.card-text').textContent.toLowerCase(); // Obtém a descrição do card em minúsculas

        // Verifica se o título ou a descrição do card contêm o termo de pesquisa
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block'; // Exibe o card se corresponder ao termo de pesquisa
        } else {
            card.style.display = 'none'; // Oculta o card se não corresponder ao termo de pesquisa
        }
    });
});

// PROXIMO AND VOLTAR
document.addEventListener('DOMContentLoaded', function() {
    var currentPage = 1;
    var itemsPerPage = 4;
    
    function showPage(page) {
        var cards = document.querySelectorAll('.card-item');
        var totalPages = Math.ceil(cards.length / itemsPerPage);
        
        cards.forEach(function(card, index) {
            card.style.display = 'none';
        });

        var start = (page - 1) * itemsPerPage;
        var end = start + itemsPerPage;
        for (var i = start; i < end && i < cards.length; i++) {
            cards[i].style.display = 'block';
        }

        document.getElementById('prevBtn').disabled = page === 1;
        document.getElementById('nextBtn').disabled = page === totalPages;
    }

    window.changePage = function(direction) {
        currentPage += direction;
        showPage(currentPage);
    };

    showPage(currentPage);
});


// BOTÃO DE ROLAR PARA CIMA
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("backToTopBtn").style.display = "block";
        } else {
            document.getElementById("backToTopBtn").style.display = "none";
        }
    }

    function topFunction() {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    
        if (currentScroll > 0) {
            window.requestAnimationFrame(topFunction);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
    }

// DEIXANDO MAIS SUAVE
AOS.init();

// LAZY CARREGAMENTOS DE IMAGEM
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        var lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback para navegadores que não suportam IntersectionObserver
        lazyImages.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");
        });
    }
});


// Função para exibir o pop-up de boas-vindas ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    var welcomePopup = document.getElementById('welcomePopup');
    welcomePopup.classList.add('show');
});

// Função para fechar o pop-up ao clicar no botão "Começar!"
function closeWelcomePopup() {
    var welcomePopup = document.getElementById('welcomePopup');
    welcomePopup.classList.remove('show');
}

// Efeitos de Transição Suaves
document.addEventListener('DOMContentLoaded', function() {
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            var targetId = this.getAttribute('href').substring(1);
            var targetSection = document.getElementById(targetId);

            if (targetSection) {
                var offsetTop = targetSection.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Adicionar Classe Sticky ao Menu de Navegação ao Rolar
window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    var scrollPosition   = window.scrollY;

    if (scrollPosition > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});
