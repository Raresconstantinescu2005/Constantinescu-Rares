document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Logica pentru MODAL (Creare Campanie) ---
    
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const modalOverlay = document.getElementById('campaignModal');

    const openModal = () => {
        modalOverlay.classList.add('active');
    };

    const closeModal = () => {
        modalOverlay.classList.remove('active');
    };

    // Deschide modal-ul
    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }

    // Inchide modal-ul (butonul X sau Anuleaza)
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', closeModal);
    }

    // Inchide modal-ul (click in afara)
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(event) {
            // Daca s-a dat click direct pe fundalul gri (overlay)
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // --- 2. Logica pentru GRAFIC (Chart.js) ---
    
    const ctx = document.getElementById('salesChart');
    if (ctx) {
        // Extragem culoarea mov din CSS
        const purpleColor = getComputedStyle(document.documentElement).getPropertyValue('--culoare-mov').trim();

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1 Aug', '5 Aug', '10 Aug', '15 Aug', '20 Aug', '25 Aug', '30 Aug'],
                datasets: [{
                    label: 'Vânzări Bilete (din campanii)',
                    data: [12, 19, 30, 50, 42, 75, 90],
                    fill: true,
                    backgroundColor: 'rgba(126, 58, 242, 0.1)', // Mov-ul cu transparenta
                    borderColor: purpleColor, // Mov-ul solid
                    tension: 0.3 // Linii curbate
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false // Ascunde legenda default
                    }
                }
            }
        });
    }

});