const videos = [
    { id: 1, link: 'https://www.youtube.com/embed/kkg9fmrZ_Lk', titulo: 'Pacificadores & Hungria Hip Hop - Voando Alto (Official Music Video)', categoria: 'A', likes: 0 },
    { id: 2, link: 'https://www.youtube.com/embed/hfJbRpLRmmg', titulo: 'Misael, Hungria Hip Hop - Que Nem Criança (Official Music Video)', categoria: 'B', likes: 0 },
];


const videosPorPagina = 5; // Quantidade de vídeos por página
let paginaAtual = 1; // Página inicial

// Função para filtrar vídeos por categoria
function filterVideos(categoria) {
    const filteredVideos = categoria ? videos.filter(video => video.categoria === categoria) : videos;
    paginateVideos(paginaAtual, filteredVideos); // Garante que permaneça na página atual ao filtrar
}

// Função para exibir os vídeos na página
function displayVideos(filteredVideos) {
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = '';
    filteredVideos.forEach((video, index) => {
        const videoDiv = document.createElement('div');
        videoDiv.className = 'col-md-4 video';
        videoDiv.innerHTML = `
            <iframe src="${video.link}" frameborder="0" allowfullscreen></iframe>
            <div class="video-title">${video.titulo}</div>
            <i id="likeIcon${video.id}" class="far fa-heart like-icon" onclick="likeVideo(${video.id})"></i>
        `;
        videosContainer.appendChild(videoDiv);

        // Adicionar a classe `visible` com um pequeno atraso para cada vídeo
        setTimeout(() => {
            videoDiv.classList.add('visible');
        }, index * 100);  // Atraso para cada vídeo (index * 100ms)
    });
}

// Função para paginar os vídeos
function paginateVideos(page, filteredVideos) {
    const startIndex = (page - 1) * videosPorPagina;
    const endIndex = startIndex + videosPorPagina;
    const videosToShow = filteredVideos.slice(startIndex, endIndex);
    displayVideos(videosToShow);
}

// Função para mostrar a página inicial de vídeos
function showInitialPage() {
    paginateVideos(paginaAtual, videos);
}

// Inicializar com a primeira página de vídeos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    showInitialPage();
});

// Event listener para o botão Próximo
document.getElementById('nextBtn').addEventListener('click', () => {
    paginaAtual++;
    paginateVideos(paginaAtual, videos);
});

// Event listener para o botão Voltar
document.getElementById('prevBtn').addEventListener('click', () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        paginateVideos(paginaAtual, videos);
    }
});

// Função para alternar visibilidade do campo de pesquisa
function toggleSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput.style.display === 'none') {
        searchInput.style.display = 'inline-block';
    } else {
        searchInput.style.display = 'none';
    }
}

// Event listener para a barra de pesquisa
document.getElementById('searchInput').addEventListener('input', function() {
    const searchText = this.value.trim().toLowerCase();
    const filteredVideos = videos.filter(video => video.titulo.toLowerCase().includes(searchText));
    paginateVideos(1, filteredVideos);
});

// Função para curtir um vídeo
function likeVideo(videoId) {
    const video = videos.find(video => video.id === videoId);
    video.likes++;
    
    // Seleciona o ícone de coração pelo ID
    const likeIcon = document.getElementById(`likeIcon${videoId}`);

    // Adiciona classes para tornar o ícone vermelho e sólido (solid)
    likeIcon.classList.remove('far'); // Remove a classe far (outline) se estiver presente
    likeIcon.classList.add('fas', 'text-danger'); // Adiciona as classes fas (solid) e text-danger (vermelho)

    // Aplica a classe de animação temporária
    likeIcon.classList.add('animate-like');

    // Remove a classe de animação após 0.5 segundos (duração da animação)
    setTimeout(() => {
        likeIcon.classList.remove('animate-like');
    }, 500);
}

// Função para alternar entre Modo Claro e Modo Escuro
const toggleModeButton = document.getElementById('toggle-mode');
toggleModeButton.addEventListener('click', () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    // Atualiza o texto do botão de Modo Claro/Modo Escuro
    const currentMode = body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Escuro';
    toggleModeButton.textContent = currentMode;

    // Lógica adicional, se necessário, para ajustar o estilo conforme o modo
});