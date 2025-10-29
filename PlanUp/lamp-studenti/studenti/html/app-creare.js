document.addEventListener('DOMContentLoaded', () => {

    // --- Functionalitate Tipuri de Bilete ---
    const ticketsContainer = document.getElementById('ticketTypesContainer');
    const addTicketBtn = document.getElementById('addTicketTypeBtn');

    // Functie pentru a adauga un nou rand de bilet
    function addTicketRow() {
        const div = document.createElement('div');
        div.classList.add('ticket-type-item');
        div.innerHTML = `
            <input type="text" placeholder="Nume bilet (ex: Early Bird)">
            <input type="number" step="0.01" placeholder="Preț (RON)">
            <input type="number" placeholder="Stoc">
            <button class="action-btn btn-danger" title="Șterge tip bilet"><i class="fa-solid fa-trash"></i></button>
        `;
        // Adauga event listener pentru butonul de stergere NOU
        div.querySelector('.btn-danger').addEventListener('click', () => {
            div.remove();
        });
        ticketsContainer.appendChild(div);
    }

    // Adauga event listener pe butonul principal de adaugare
    if (addTicketBtn) {
        addTicketBtn.addEventListener('click', addTicketRow);
    }

    // Adauga event listeners pentru butoanele de stergere EXISTENTE
    ticketsContainer.querySelectorAll('.ticket-type-item .btn-danger').forEach(button => {
        button.addEventListener('click', (e) => {
            e.target.closest('.ticket-type-item').remove();
        });
    });


    // --- Functionalitate Preview Imagine ---
    const imageUploadBox = document.querySelector('.image-upload-box');
    const imageInput = document.querySelector('.image-upload-input');
    const imagePreviewContainer = document.querySelector('.image-preview');
    const imagePreview = imagePreviewContainer?.querySelector('img');
    const removeImageBtn = imagePreviewContainer?.querySelector('.remove-image-btn');

    if (imageInput && imagePreview && imageUploadBox && removeImageBtn) {
        // Cand se selecteaza o imagine
        imageInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imageUploadBox.style.display = 'none'; // Ascunde box-ul de upload
                    imagePreviewContainer.classList.remove('hidden'); // Arata preview-ul
                }
                reader.readAsDataURL(file);
            }
        });

        // Cand se apasa butonul de stergere imagine
        removeImageBtn.addEventListener('click', () => {
            imageInput.value = ''; // Goleste inputul de fisier
            imagePreview.src = '#'; // Sterge sursa imaginii
            imagePreviewContainer.classList.add('hidden'); // Ascunde preview-ul
            imageUploadBox.style.display = 'flex'; // Arata box-ul de upload
        });
    }

});