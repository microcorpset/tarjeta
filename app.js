document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURACIÓN DEL ANUNCIO (Edita esto) ---
    const MOSTRAR_ANUNCIO = true; // Pon 'false' para desactivarlo
    // ---------------------------------------------

    // Lógica del Anuncio
    const promoBanner = document.getElementById('promoBanner');
    const closePromo = document.getElementById('closePromo');

    if (MOSTRAR_ANUNCIO && promoBanner) {
        // Verificar si el usuario lo cerró recientemente (opcional, por ahora siempre sale si MOSTRAR_ANUNCIO es true)
        promoBanner.classList.add('visible');
    }

    if (closePromo) {
        closePromo.addEventListener('click', () => {
            promoBanner.style.display = 'none';
        });
    }

    // --- Lógica del Modal de Horario (Sin cambios) ---
    const horarioTxt = "Nuestro horario habitual es:\n\n📅 Lunes a Viernes\n🕘 9:00 - 18:00\n\nFuera de este horario, la respuesta podría demorar un poco. ¿Deseas continuar?";
    let destinationUrl = '';
    const modal = document.getElementById('actionModal');
    const msgBox = document.getElementById('modalMessage');
    const btnConfirm = document.getElementById('modalConfirm');
    const btnCancel = document.getElementById('modalCancel');
    const btnClose = document.querySelector('.close-modal');

    const triggerModal = (e) => {
        e.preventDefault();
        const button = e.currentTarget;
        destinationUrl = button.getAttribute('data-action-target');
        msgBox.textContent = horarioTxt;
        modal.classList.add('active');
    };

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => destinationUrl = '', 300);
    };

    const whatsappBtns = document.querySelectorAll('.whatsapp-trigger');
    const phoneBtns = document.querySelectorAll('.phone-trigger');

    whatsappBtns.forEach(btn => btn.addEventListener('click', triggerModal));
    phoneBtns.forEach(btn => btn.addEventListener('click', triggerModal));

    btnConfirm.addEventListener('click', () => {
        if(destinationUrl) window.location.href = destinationUrl;
        closeModal();
    });

    btnCancel.addEventListener('click', closeModal);
    btnClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });

    // Protección básica
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.onkeydown = function(e) {
        if(e.keyCode == 123) return false;
        if(e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) return false;
        if(e.ctrlKey && e.keyCode == 85) return false;
    }
});
