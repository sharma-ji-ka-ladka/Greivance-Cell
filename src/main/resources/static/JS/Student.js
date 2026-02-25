const API_BASE = '/api/student';

document.addEventListener("DOMContentLoaded", () => {
    const studentId = localStorage.getItem("userId");
    if (!studentId || localStorage.getItem("role") !== "STUDENT") {
        window.location.href = "login.html";
        return;
    }

    const form = document.getElementById("grievanceForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const grievance = {
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                type: document.getElementById("type").value,
                targetDepartment: document.getElementById("targetDepartment").value || null,
                studentId: parseInt(studentId)
            };

            fetch(`${API_BASE}/grievance`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(grievance)
            }).then(res => {
                if (res.ok) location.reload();
            });
        });
    }

    fetch(`${API_BASE}/grievances/${studentId}`)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("studentGrievances");
            if (!container) return;
            container.innerHTML = "";
            data.forEach(g => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>${g.title}</strong> (${g.type}) - Status: ${g.status}
                    <br>${g.description}
                    <br>Upvotes: ${g.upvotes}
                    <br>
                    ${g.type === 'PUBLIC' ? `<button onclick="upvote(${g.grievanceId})">Raise</button>` : ''}
                    ${g.studentId == studentId && g.status !== 'RESOLVED' ? `<button onclick="resolve(${g.grievanceId})">Mark Resolved</button>` : ''}
                `;
                container.appendChild(li);
            });
        });
});

function upvote(id) {
    fetch(`${API_BASE}/grievance/${id}/upvote`, { method: 'PUT' })
        .then(res => { if (res.ok) location.reload(); });
}

function resolve(id) {
    const studentId = localStorage.getItem("userId");
    fetch(`${API_BASE}/grievance/${id}/resolve?studentId=${studentId}`, { method: 'PUT' })
        .then(res => { if (res.ok) location.reload(); });
}

function logout(){
    localStorage.clear();
    window.location.href="Login.html";
}