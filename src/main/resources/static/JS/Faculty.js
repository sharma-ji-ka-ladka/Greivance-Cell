const API_BASE = '/api/faculty';

document.addEventListener("DOMContentLoaded", () => {
    const facultyId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    const department = localStorage.getItem("department");

    if (!facultyId || role !== "FACULTY") {
        window.location.href = "Login.html";
        return;
    }

    fetch(`${API_BASE}/grievances/department/${department}`)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("facultyGrievances");
            if (!container) return;
            container.innerHTML = "";
            data.forEach(g => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>${g.title}</strong> (${g.type}) - Status: ${g.status}
                    <br>${g.description}
                    <br>Upvotes: ${g.upvotes}
                    <br>
                    ${g.status !== 'RESOLVED' ? `<button onclick="resolve(${g.grievanceId})">Mark Resolved</button>` : ''}
                `;
                container.appendChild(li);
            });
        });
});

function resolve(id) {
    fetch(`${API_BASE}/grievance/${id}/resolve`, { method: 'PUT' })
        .then(res => { if (res.ok) location.reload(); });
}

function logout(){
    localStorage.clear();
    window.location.href="Login.html";
}