// Așteaptă ca întregul conținut al paginii să fie încărcat
document.addEventListener('DOMContentLoaded', () => {

    // --- Date Simulare (Mock Data) ---
    // Într-o aplicație reală, acestea ar veni de la un server (API)
    let mockData = [
        {
            id: 1,
            event: 'conferinta-tech-2025',
            participant: 'Ana Popescu',
            rating: 5,
            date: '2025-10-28T14:30:00Z',
            text: 'A fost un eveniment excepțional! Organizarea a fost impecabilă, iar speakerii au fost peste așteptări. Abia aștept următoarea ediție.',
            response: 'Mulțumim mult, Ana! Ne bucurăm enorm că ți-a plăcut. Te așteptăm cu drag și la anul!'
        },
        {
            id: 2,
            event: 'workshop-design-2025',
            participant: 'Bogdan Ionescu',
            rating: 4,
            date: '2025-10-27T10:15:00Z',
            text: 'Foarte util și la obiect. Poate locația ar fi putut fi puțin mai spațioasă, dar conținutul a fost de nota 10.',
            response: null // Fără răspuns încă
        },
        {
            id: 3,
            event: 'conferinta-tech-2025',
            participant: 'Maria Vasile',
            rating: 3,
            date: '2025-10-26T18:45:00Z',
            text: 'Evenimentul a fost ok, dar sesiunea de networking a fost prea aglomerată și zgomotoasă. Mâncarea a fost mediocră.',
            response: null // Fără răspuns încă
        },
        {
            id: 4,
            event: 'workshop-design-2025',
            participant: 'Andrei Stoica',
            rating: 5,
            date: '2025-10-25T09:00:00Z',
            text: 'Cel mai bun workshop la care am participat anul acesta. Speakerul a fost incredibil de bine pregătit.',
            response: 'Mulțumim pentru feedback, Andrei! Ne bucură să auzim asta.'
        }
    ];

    // --- Selectoare DOM ---
    const eventSelect = document.getElementById('event-select');
    const filterRating = document.getElementById('filter-rating');
    const filterStatus = document.getElementById('filter-status');
    const sortBy = document.getElementById('sort-by');
    const reviewListContainer = document.getElementById('review-list');

    // Selectoare pentru Tabloul de Bord (KPIs)
    const kpiAvgRating = document.getElementById('kpi-avg-rating');
    const kpiTotalReviews = document.getElementById('kpi-total-reviews');
    const kpiResponseRate = document.getElementById('kpi-response-rate');

    // --- Funcții Helper ---

    /**
     * Generează stelele de rating
     */
    function getStarRating(rating) {
        const fullStar = '★';
        const emptyStar = '☆';
        return fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
    }

    /**
     * Formatează data pentru afișare
     */
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ro-RO', options);
    }

    /**
     * Actualizează Tabloul de Bord (KPIs) pe baza recenziilor filtrate
     */
    function updateDashboard(reviews) {
        if (reviews.length === 0) {
            kpiAvgRating.textContent = '-- / 5';
            kpiTotalReviews.textContent = '0';
            kpiResponseRate.textContent = '--%';
            return;
        }

        // 1. Total Recenzii
        kpiTotalReviews.textContent = reviews.length;

        // 2. Rating Mediu
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = (totalRating / reviews.length).toFixed(1);
        kpiAvgRating.textContent = `${avgRating} / 5`;

        // 3. Rata de Răspuns
        const respondedCount = reviews.filter(review => review.response !== null).length;
        const responseRate = Math.round((respondedCount / reviews.length) * 100);
        kpiResponseRate.textContent = `${responseRate}%`;
    }

    /**
     * Afișează recenziile în pagină
     */
    function renderReviews(reviews) {
        // Golește lista existentă
        reviewListContainer.innerHTML = '';

        if (reviews.length === 0) {
            reviewListContainer.innerHTML = '<p>Nu există recenzii care să corespundă filtrelor selectate.</p>';
            return;
        }

        reviews.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.setAttribute('data-id', review.id); // Stocăm ID-ul pe element

            // Verifică dacă există deja un răspuns
            const responseHtml = review.response
                ? `
                <div class="organizer-response">
                    <strong>Răspunsul tău:</strong>
                    <p>${review.response}</p>
                </div>
            ` : `
                <div class="response-area">
                    <textarea placeholder="Scrie un răspuns public..."></textarea>
                    <button class="btn-respond">Trimite Răspunsul</button>
                </div>
            `;

            card.innerHTML = `
                <div class="review-header">
                    <span class="review-participant">${review.participant}</span>
                    <span class="review-date">${formatDate(review.date)}</span>
                </div>
                <div class="review-rating" title="${review.rating} din 5 stele">
                    ${getStarRating(review.rating)}
                </div>
                <p class="review-text">${review.text}</p>
                ${responseHtml}
            `;

            reviewListContainer.appendChild(card);
        });
    }

    /**
     * Funcția principală care filtrează, sortează și afișează recenziile
     */
    function filterAndRender() {
        const selectedEvent = eventSelect.value;
        const selectedRating = filterRating.value;
        const selectedStatus = filterStatus.value;
        const selectedSort = sortBy.value;

        let filteredReviews = [...mockData];

        // 1. Filtrare după Eveniment (pentru dashboard și listă)
        const eventReviews = filteredReviews.filter(review => 
            selectedEvent === 'all' || review.event === selectedEvent
        );

        // 2. Actualizează Dashboard-ul DOAR pe baza evenimentului selectat
        updateDashboard(eventReviews);

        // Continuă filtrarea pentru lista de recenzii
        filteredReviews = [...eventReviews];

        // 3. Filtrare după Rating
        if (selectedRating !== 'all') {
            filteredReviews = filteredReviews.filter(review => review.rating == selectedRating);
        }

        // 4. Filtrare după Stare Răspuns
        if (selectedStatus === 'responded') {
            filteredReviews = filteredReviews.filter(review => review.response !== null);
        } else if (selectedStatus === 'no-response') {
            filteredReviews = filteredReviews.filter(review => review.response === null);
        }

        // 5. Sortare
        switch (selectedSort) {
            case 'newest':
                filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'oldest':
                filteredReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'rating-high':
                filteredReviews.sort((a, b) => b.rating - a.rating);
                break;
            case 'rating-low':
                filteredReviews.sort((a, b) => a.rating - b.rating);
                break;
        }

        // 6. Afișare finală
        renderReviews(filteredReviews);
    }

    /**
     * Gestionează trimiterea unui răspuns
     */
    function handleResponseSubmit(event) {
        // Verifică dacă s-a dat clic pe butonul de răspuns
        if (!event.target.classList.contains('btn-respond')) {
            return;
        }

        const card = event.target.closest('.review-card');
        const reviewId = parseInt(card.dataset.id, 10);
        const textarea = card.querySelector('textarea');
        const responseText = textarea.value.trim();

        if (responseText === '') {
            alert('Răspunsul nu poate fi gol.');
            return;
        }

        // Actualizează datele în "baza de date" (mockData)
        const reviewIndex = mockData.findIndex(review => review.id === reviewId);
        if (reviewIndex > -1) {
            mockData[reviewIndex].response = responseText;
        }

        // Re-randează totul pentru a reflecta schimbarea
        // (inclusiv actualizarea ratei de răspuns)
        filterAndRender();
    }

    // --- Inițializare și Event Listeners ---

    // Adaugă ascultători de evenimente pe toate filtrele
    eventSelect.addEventListener('change', filterAndRender);
    filterRating.addEventListener('change', filterAndRender);
    filterStatus.addEventListener('change', filterAndRender);
    sortBy.addEventListener('change', filterAndRender);

    // Adaugă un singur ascultător pe containerul listei pentru a gestiona clicurile pe butoane (delegare eveniment)
    reviewListContainer.addEventListener('click', handleResponseSubmit);

    // Rulează o dată la încărcarea paginii pentru a afișa starea inițială
    filterAndRender();
});