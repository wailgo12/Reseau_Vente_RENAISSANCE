
document.addEventListener('DOMContentLoaded', function() {
    // 1. Capture des paramètres UTM (depuis Outlook)
    const urlParams = new URLSearchParams(window.location.search);
    
    if(urlParams.has('utm_source')) {
        document.getElementById('utm_source').value = urlParams.get('utm_source');
    }
    if(urlParams.has('utm_campaign')) {
        document.getElementById('utm_campaign').value = urlParams.get('utm_campaign');
    }

    // 2. Traitement du formulaire
    const form = document.getElementById('partenaireForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // =========== À REMPLACER PAR VOTRE URL GOOGLE SCRIPT ===========
    const SCRIPT_URL = 'VOTRE_URL_WEB_APP_GOOGLE_ICI'; 
    // ===============================================================

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if(SCRIPT_URL === 'VOTRE_URL_WEB_APP_GOOGLE_ICI') {
            alert("Erreur de configuration : Veuillez insérer l'URL de votre script Google dans le fichier script.js.");
            return;
        }

        // Sécurité
        submitBtn.disabled = true;
        submitBtn.textContent = 'TRANSMISSION EN COURS...';
        errorMessage.style.display = 'none';

        const formData = new FormData(form);

        fetch(SCRIPT_URL, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            form.style.display = 'none';
            successMessage.style.display = 'block';
            window.scrollTo({ top: document.querySelector('.form-container').offsetTop - 20, behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Erreur:', error);
            errorMessage.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = 'INTÉGRER LE RÉSEAU RENAISSANCE';
        });
    });
});
