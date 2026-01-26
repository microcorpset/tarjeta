/* app.js - Lógica Inteligente */
document.addEventListener('DOMContentLoaded', () => {
    // Referencias al Modal
    const modal = document.getElementById('actionModal');
    const msgElement = document.getElementById('modalMessage');
    const btnConfirm = document.getElementById('modalConfirm');
    const btnCancel = document.getElementById('modalCancel');
    const btnClose = document.querySelector('.close-modal');
    
    // Mensaje de horario
    const horarioTxt = "Nuestro horario habitual es:\n\n📅 Lunes a Viernes\n🕘 9:00 - 18:00\n\nFuera de este horario, la respuesta podría demorar. ¿Deseas continuar?";
    
    let targetUrl = '';

    // Función para abrir el modal
    const openModal = (e, link) => {
        if (!link) return; // Si no hay link, no hace nada
        e.preventDefault(); // IMPORTANTE: Evita que el enlace se abra directo
        targetUrl = link;
        msgElement.textContent = horarioTxt;
        modal.classList.add('active');
    };

    // Función para cerrar
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => targetUrl = '', 300);
    };

    // --- LÓGICA MEJORADA: Busca por ID o por Clase ---
    const whatsappBtn = document.getElementById('btn-whatsapp') || document.querySelector('.whatsapp');
    const phoneBtn = document.getElementById('btn-phone') || document.querySelector('.phone');

    // Asignar eventos con seguridad
    if (whatsappBtn) {
        // Usa data-action-target si existe, si no usa el href
        const link = whatsappBtn.getAttribute('data-action-target') || whatsappBtn.href;
        whatsappBtn.addEventListener('click', (e) => openModal(e, link));
    }

    if (phoneBtn) {
        const link = phoneBtn.getAttribute('data-action-target') || phoneBtn.href;
        phoneBtn.addEventListener('click', (e) => openModal(e, link));
    }

    // Eventos del Modal
    if(btnConfirm) {
        btnConfirm.addEventListener('click', () => {
            if(targetUrl) window.location.href = targetUrl;
            closeModal();
        });
    }

    if(btnCancel) btnCancel.addEventListener('click', closeModal);
    if(btnClose) btnClose.addEventListener('click', closeModal);
    if(modal) modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });

    // --- BLOQUEOS DE SEGURIDAD (Anti-Click Derecho) ---
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.onkeydown = function(e) {
        if(e.keyCode == 123) return false;
        if(e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) return false;
        if(e.ctrlKey && e.keyCode == 85) return false;
    }
});
