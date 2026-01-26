/* app.js - Versión Estable y Protegida */
document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. REFERENCIAS AL DOM ---
    const modal = document.getElementById("actionModal");
    const msgElement = document.getElementById("modalMessage");
    const btnConfirm = document.getElementById("modalConfirm");
    const btnCancel = document.getElementById("modalCancel");
    const btnClose = document.querySelector(".close-modal");

    // Mensaje del horario
    const horarioTxt = "Nuestro horario habitual es:\n\n📅 Lunes a Viernes\n🕘 9:00 - 18:00\n\nFuera de este horario, la respuesta podría demorar. ¿Deseas continuar?";
    
    let targetUrl = "";

    // --- 2. FUNCIONES DEL MODAL ---
    
    function showModal(e) {
        // Busca el elemento <a> más cercano (por si diste click en el icono <i>)
        const link = e.target.closest("a"); 
        
        // Si es telegram u otro enlace sin data-action-target, ignoramos el modal
        // Solo activamos si tiene la clase whatsapp o phone
        if (!link) return;
        
        // Verificamos si es un boton que requiere modal
        if (link.classList.contains("whatsapp") || link.classList.contains("phone")) {
            e.preventDefault(); // Detenemos la navegación directa
            // Obtenemos la URL de destino
            targetUrl = link.getAttribute("data-action-target") || link.href;
            
            if (msgElement) msgElement.textContent = horarioTxt;
            if (modal) modal.classList.add("active");
        }
    }

    function hideModal() {
        if (modal) modal.classList.remove("active");
        setTimeout(() => targetUrl = "", 300);
    }

    // --- 3. ASIGNACIÓN DE EVENTOS (ROBUSTO) ---
    
    // Seleccionamos TODOS los botones que tengan clase whatsapp o phone
    // Esto asegura que funcione en móvil, PC, o si hay botones duplicados
    const triggers = document.querySelectorAll(".whatsapp, .phone");
    
    triggers.forEach(btn => {
        btn.addEventListener("click", showModal);
    });

    // Eventos de los botones DENTRO del modal
    if (btnConfirm) {
        btnConfirm.addEventListener("click", function() {
            if (targetUrl) window.location.href = targetUrl;
            hideModal();
        });
    }

    if (btnCancel) btnCancel.addEventListener("click", hideModal);
    if (btnClose) btnClose.addEventListener("click", hideModal);
    
    // Cerrar al hacer click fuera
    if (modal) {
        modal.addEventListener("click", function(e) {
            if (e.target === modal) hideModal();
        });
    }

    // --- 4. SEGURIDAD (ANTI-COPIA) ---
    // Bloquear clic derecho
    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });

    // Bloquear atajos de teclado (F12, Ctrl+U, etc)
    document.onkeydown = function(e) {
        if(e.keyCode == 123) return false; // F12
        if(e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) return false; // Ctrl+Shift+I/J/C
        if(e.ctrlKey && e.keyCode == 85) return false; // Ctrl+U
    };
});
