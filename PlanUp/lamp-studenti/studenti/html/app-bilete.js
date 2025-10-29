document.addEventListener('DOMContentLoaded', () => {

    const eventSelectionView = document.getElementById('eventSelectionView');
    const ticketDetailsView = document.getElementById('ticketDetailsView');
    const eventSelectButtons = document.querySelectorAll('.btn-select-event');
    const backButton = document.getElementById('backToSelectionBtn');
    const detailsEventName = document.getElementById('detailsEventName');

    // Functie pentru a arata detaliile unui eveniment
    function showDetails(eventId, eventName) {
        if (eventSelectionView && ticketDetailsView && detailsEventName) {
            eventSelectionView.classList.add('hidden'); // Ascunde selectia
            ticketDetailsView.classList.remove('hidden'); // Arata detaliile
            detailsEventName.textContent = `Detalii Bilete: ${eventName}`; // Actualizeaza titlul

            // Aici ai adauga logica pentru a incarca datele specifice evenimentului (cu fetch)
            // loadTicketData(eventId); 
            console.log(`Se afiseaza detalii pentru evenimentul: ${eventId}`);
        }
    }

    // Functie pentru a reveni la selectia evenimentului
    function showSelection() {
         if (eventSelectionView && ticketDetailsView) {
            ticketDetailsView.classList.add('hidden'); // Ascunde detaliile
            eventSelectionView.classList.remove('hidden'); // Arata selectia
         }
    }

    // Adauga event listener pentru fiecare buton de selectare eveniment
    eventSelectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const eventId = button.getAttribute('data-event-id');
            const eventName = button.getAttribute('data-event-name');
            showDetails(eventId, eventName);
        });
    });

    // Adauga event listener pentru butonul "Inapoi"
    if (backButton) {
        backButton.addEventListener('click', showSelection);
    }

    // --- (Optional) Logica pentru incarcarea datelor ---
    // async function loadTicketData(eventId) {
    //     // Exemplu: Fetch data de la un API
    //     // const response = await fetch(`/api/events/${eventId}/tickets`);
    //     // const data = await response.json();
        
    //     // Simulare date primite
    //     const data = {
    //         totalAttendees: Math.floor(Math.random() * 850),
    //         totalSold: 850,
    //         totalScanned: 650, // Ar trebui sa fie egale initial
    //         totalRemaining: 150,
    //         // ... alte date pentru tabel
    //     };

    //     // Actualizeaza valorile in HTML
    //     document.getElementById('totalAttendees').textContent = data.totalAttendees;
    //     document.getElementById('totalSold').textContent = data.totalSold;
    //     document.getElementById('totalScanned').textContent = data.totalScanned;
    //     document.getElementById('totalRemaining').textContent = data.totalRemaining;
        
    //     const progress = (data.totalScanned / data.totalSold) * 100;
    //     const progressElement = document.getElementById('progressTotal');
    //     const progressPercentElement = document.getElementById('progressTotalPercent');
    //     if(progressElement) progressElement.value = progress;
    //     if(progressPercentElement) progressPercentElement.textContent = `${Math.round(progress)}% Scanați`;
    // }

});