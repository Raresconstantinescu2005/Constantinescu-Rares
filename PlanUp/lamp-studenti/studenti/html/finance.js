// Așteaptă ca întregul conținut al paginii să fie încărcat
document.addEventListener("DOMContentLoaded", () => {
    
    // =============================================
    // --- NOU: SCRIPT PENTRU MENIUL MOBIL ---
    // =============================================
    const menuToggle = document.getElementById('menu-toggle');
    const layout = document.querySelector('.dashboard-layout');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Adaugă sau elimină clasa 'sidebar-open' pe elementul părinte
            layout.classList.toggle('sidebar-open');
        });
    }

    // =============================================
    // --- SCRIPT PAGINĂ FINANȚE (CODUL ANTERIOR) ---
    // =============================================

    // --- BAZĂ DE DATE SIMULATĂ ---
    const dateFinanciare = {
        totalRevenue: 54300,
        totalCommission: 5430,
        availableWithdrawal: 31270,
        totalWithdrawn: 17600,
    };
    const dateEvenimente = [
        { nume: "Concert Subcarpați la Arene", bileteVandute: 850, incasariBrute: 85000, comision: 8500, incasariNete: 76500 },
        { nume: "Festivalul de Teatru 'Nocturne'", bileteVandute: 420, incasariBrute: 21000, comision: 2100, incasariNete: 18900 },
        { nume: "Stand-Up Comedy cu Micutzu", bileteVandute: 600, incasariBrute: 48000, comision: 4800, incasariNete: 43200 }
    ];
    const dateRetrageri = [
        { id: "TRX-1004", data: "25 Oct 2025", suma: 10000, statut: "Procesat" },
        { id: "TRX-1003", data: "12 Oct 2025", suma: 5000, statut: "Procesat" },
        { id: "TRX-1002", data: "01 Oct 2025", suma: 2600, statut: "Procesat" },
        { id: "TRX-1001", data: "15 Sep 2025", suma: 2000, statut: "Anulat" }
    ];
    // --- SFÂRȘIT BAZĂ DE DATE SIMULATĂ ---


    // --- Funcția 1: Populează Cardurile KPI ---
    function populeazaKPI() {
        const formatRON = (numar) => new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'RON' }).format(numar);

        // Verifică dacă elementele există înainte de a le popula (bună practică)
        if (document.getElementById('total-revenue')) {
            document.getElementById('total-revenue').textContent = formatRON(dateFinanciare.totalRevenue);
            document.getElementById('total-commission').textContent = formatRON(dateFinanciare.totalCommission);
            document.getElementById('available-withdrawal').textContent = formatRON(dateFinanciare.availableWithdrawal);
            document.getElementById('total-withdrawn').textContent = formatRON(dateFinanciare.totalWithdrawn);
        }
    }

    // --- Funcția 2: Populează Tabelul de Evenimente ---
    function populeazaTabelEvenimente() {
        const tbody = document.getElementById('events-tbody');
        if (!tbody) return; // Oprește funcția dacă tabelul nu e pe pagină

        tbody.innerHTML = ""; 
        dateEvenimente.forEach(event => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${event.nume}</td>
                <td>${event.bileteVandute}</td>
                <td>${(event.incasariBrute).toLocaleString('ro-RO')} RON</td>
                <td>${(event.comision).toLocaleString('ro-RO')} RON</td>
                <td><strong>${(event.incasariNete).toLocaleString('ro-RO')} RON</strong></td>
            `;
        });
    }

    // --- Funcția 3: Populează Tabelul de Retrageri ---
    function populeazaTabelRetrageri() {
        const tbody = document.getElementById('withdrawals-tbody');
        if (!tbody) return; 

        tbody.innerHTML = "";
        dateRetrageri.forEach(retragere => {
            let statutClasa = "";
            switch (retragere.statut.toLowerCase()) {
                case 'procesat': statutClasa = 'status-procesat'; break;
                case 'în așteptare': statutClasa = 'status-asteptare'; break;
                case 'anulat': statutClasa = 'status-anulat'; break;
                default: statutClasa = '';
            }
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${retragere.id}</td>
                <td>${retragere.data}</td>
                <td>${(retragere.suma).toLocaleString('ro-RO')} RON</td>
                <td><span class="status ${statutClasa}">${retragere.statut}</span></td>
            `;
        });
    }

    // --- Funcția 4: Adaugă Interactivitate Buton ---
    function adaugaEvenimentButon() {
        const buton = document.getElementById('withdraw-button');
        if (!buton) return; 

        buton.addEventListener('click', () => {
            const sumaDisponibila = document.getElementById('available-withdrawal').textContent;
            const confirmare = confirm(
                `Sunteți sigur că doriți să inițiați o retragere în valoare de ${sumaDisponibila}?\n\nFondurile vor fi transferate în contul IBAN înregistrat.`
            );
            if (confirmare) {
                alert("Solicitarea de retragere a fost trimisă!");
            } else {
                alert("Solicitarea a fost anulată.");
            }
        });
    }

    // --- Inițializare Pagină ---
    populeazaKPI();
    populeazaTabelEvenimente();
    populeazaTabelRetrageri();