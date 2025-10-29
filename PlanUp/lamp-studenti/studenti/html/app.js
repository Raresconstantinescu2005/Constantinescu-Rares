// Asteptam ca pagina sa se incarce complet
document.addEventListener('DOMContentLoaded', () => {

    // NOU: Invelim totul intr-un setTimeout
    // Asta da timp CSS-ului sa se aseze inainte ca JS-ul sa deseneze
    setTimeout(() => {

        const culori = {
            mov: '#7e3af2',
            movDeschis: '#a87ff0',
            movFoarteDeschis: '#d1bcfc',
            text: '#333',
            textGri: '#9ca3af'
        };

        // === Grafic 1: Vanzari lunare (Line) ===
        const salesCtx = document.getElementById('salesChart');
        if (salesCtx) {
            new Chart(salesCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun'],
                    datasets: [{
                        label: 'Vânzări',
                        data: [1500, 1600, 1800, 1550, 1750, 1900],
                        borderColor: culori.mov,
                        backgroundColor: 'rgba(126, 58, 242, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: culori.mov,
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Corect, lasa asta aici
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            ticks: { color: culori.textGri }
                        },
                        x: {
                            ticks: { color: culori.textGri }
                        }
                    }
                }
            });
        }

        // === Grafic 2: Top evenimente (Bar) ===
        const eventsCtx = document.getElementById('eventsChart');
        if (eventsCtx) {
            new Chart(eventsCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Concert', 'Seminar', 'Workshop', 'Festival', 'Expo'],
                    datasets: [{
                        label: 'Bilete vândute',
                        data: [300, 240, 140, 70, 60],
                        backgroundColor: culori.mov,
                        borderRadius: 6,
                        barPercentage: 0.6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Corect, lasa asta aici
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { color: culori.textGri }
                        },
                        x: {
                            ticks: { color: culori.textGri }
                        }
                    }
                }
            });
        }
        
        // === Grafic 3: Rata de conversie (Doughnut) ===
        const conversionCtx = document.getElementById('conversionChart');
        if (conversionCtx) {
            new Chart(conversionCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Standard', 'VIP', 'Early-bird'],
                    datasets: [{
                        data: [2300, 200, 446],
                        backgroundColor: [
                            culori.mov,
                            culori.movDeschis,
                            culori.movFoarteDeschis
                        ],
                        borderColor: 'transparent',
                        borderWidth: 0,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Corect, lasa asta aici
                    cutout: '75%',
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: true }
                    }
                }
            });
        }

    }, 50); // Asteptam 50 de milisecunde

});