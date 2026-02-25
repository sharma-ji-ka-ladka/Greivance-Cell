const API_BASE = '/api/admin';

document.addEventListener("DOMContentLoaded", () => {
    const adminId = localStorage.getItem("userId");
    if (!adminId || localStorage.getItem("role") !== "ADMIN") {
        window.location.href = "Login.html";
        return;
    }

    fetch(`${API_BASE}/grievances/all`)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("adminGrievances");
            if (!container) return;
            container.innerHTML = "";
            data.forEach(g => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>${g.title}</strong> (${g.type}) - Status: ${g.status}
                    <br>Target Dept: ${g.targetDepartment || 'None'} | Assigned Faculty ID: ${g.targetFacultyId || 'Unassigned'}
                    <br>${g.description}
                    <br>
                    <input type="number" id="assignInput-${g.grievanceId}" placeholder="Faculty ID">
                    <button onclick="assignGrievance(${g.grievanceId})">Assign</button>
                    <button onclick="deleteGrievance(${g.grievanceId})">Delete</button>
                `;
                container.appendChild(li);
            });
        });
});

function assignGrievance(id) {
    const facultyId = document.getElementById(`assignInput-${id}`).value;
    if(!facultyId) return;
    fetch(`${API_BASE}/grievance/${id}/assign/${facultyId}`, { method: 'PUT' })
        .then(res => { if (res.ok) location.reload(); });
}

function deleteGrievance(id) {
    fetch(`${API_BASE}/grievance/${id}`, { method: 'DELETE' })
        .then(res => { if (res.ok) location.reload(); });
}

function logout(){
    localStorage.clear();
    window.location.href="Login.html";
}