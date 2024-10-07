function showPage(pageId) {
    // Cacher tous les éléments <main>
    document.querySelectorAll('main').forEach(main => main.style.display = 'none');
    
    // Afficher l'élément avec l'id donné
    let page = document.getElementById(pageId);
    if (page) { // Vérifie que l'élément existe
        page.style.display = 'block';
    }
}

// Fonction pour rediriger vers une autre page après 3 secondes
function redirectAfterDelay(pageId, delay = 3000) {
    setTimeout(() => {
        showPage(pageId);
    }, delay);
}