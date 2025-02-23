// Function to add a new row
function addRow() {
    const tableBody = document.getElementById('stockTableBody');
    const rowCount = tableBody.rows.length;

    // Create a new row and cells
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${rowCount + 1}</td>
        <td><input type="text" placeholder="Customer"></td>
        <td><input type="text" placeholder="Code"></td>
        <td><input type="text" placeholder="Item"></td>
        <td><input type="text" placeholder="Lot No"></td>
        <td><input type="date"></td>
        <td class="in-cell"><input type="text" placeholder="In"></td>
        <td class="out-cell"><input type="text" placeholder="Out"></td>
        <td><input type="text" placeholder="Rate"></td>
        <td><input type="text" placeholder="Amount"></td>
        <td><input type="text" placeholder="Balance"></td>
        <td>
            <div class="action-buttons">
                <button class="edit-btn" onclick="editRow(this)">Edit</button>
                <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
            </div>
        </td>
    `;

    tableBody.appendChild(newRow);

    // Attach event listener for pressing Enter key to save the row
    newRow.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                saveRow(newRow.querySelector('.edit-btn'));
            }
        });
    });
}

// Function to handle row editing
function editRow(button) {
    const row = button.parentNode.parentNode.parentNode;
    const cells = row.querySelectorAll('td');

    // Change button to 'Save'
    button.textContent = 'Save';
    button.onclick = () => saveRow(button);

    // Convert table cells to editable inputs
    cells.forEach((cell, index) => {
        if (index < cells.length - 1) {
            let content = cell.textContent;
            // Special case for 'In' and 'Out' cells (index 6 and 7)
            if (index === 6 || index === 7) {
                let color = index === 6 ? 'green' : 'red';
                cell.innerHTML = `<input type="text" value="${content}" style="color: ${color}" />`;
                cell.className = index === 6 ? 'in-cell' : 'out-cell';
            } else {
                cell.innerHTML = `<input type="text" value="${content}" />`;
            }
        }
    });
}

// Function to save the edited row
function saveRow(button) {
    const row = button.parentNode.parentNode.parentNode;
    const inputs = row.querySelectorAll('input');

    // Update the row with new values
    inputs.forEach((input, index) => {
        const cell = input.parentNode;
        const value = input.value;
        // Check if it's an 'In' or 'Out' cell to maintain color
        if (index === 5|| index === 6) {
            const colorClass = index === 5? 'in-cell' : 'out-cell';
            cell.textContent = value;
            cell.className = colorClass;
            cell.style.color = index === 5 ? 'green' : 'red';  // Apply green for 'In', red for 'Out'
        } else {
            cell.textContent = value;
            // Reset the color style for other columns
            cell.style.color = '';  // Default color (black)
        }
    });

    // Change button back to 'Edit'
    button.textContent = 'Edit';
    button.onclick = () => editRow(button);
}

// Function to delete a row
function deleteRow(button) {
    const row = button.parentNode.parentNode.parentNode;
    row.remove();
}
function goToDashboard() {
    window.location.href = "dashboard.html"; 
}

function sendWhatsApp() {
    let phoneNumber = "+923001234567"; 
    let message = "Hello! How are you?";
    let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

function sendSMS() {
    let phoneNumber = "+923001234567"; 
    let message = "Hello, this is a test message!";
    window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
}

function printPage() {
    window.print();
}

function downloadPDF() {
    window.print(); 
}

// Event listener for Add Row button
document.getElementById('addRowBtn').addEventListener('click', addRow);
