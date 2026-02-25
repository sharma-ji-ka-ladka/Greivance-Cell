const API_BASE = '/api/grievances';

function submitGrievance(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const type = document.getElementById("type").value;
    const targetDepartment = document.getElementById("targetDepartment") ? document.getElementById("targetDepartment").value : null;
    const studentId = localStorage.getItem("userId") || 1;

    const grievance = { title, description, type, targetDepartment, studentId };

    fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(grievance)
    }).then(res => {
        if(res.ok) {
            alert("Grievance submitted successfully!");
            location.reload();
        }
    });
}

function upvoteGrievance(grievanceId) {
    fetch(`${API_BASE}/${grievanceId}/upvote`, { method: 'PUT' })
        .then(res => {
            if(res.ok) location.reload();
        });
}

function resolveGrievance(grievanceId) {
    const userId = localStorage.getItem("userId") || 1;
    fetch(`${API_BASE}/${grievanceId}/resolve?requesterId=${userId}`, { method: 'PUT' })
        .then(res => {
            if(res.ok) {
                location.reload();
            } else {
                alert("Unauthorized: Only the creator or Admin can resolve this.");
            }
        });
}

function loadGrievances(containerId, filterFn) {
    fetch(API_BASE)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById(containerId);
            if(!container) return;
            container.innerHTML = "";
            data.filter(filterFn).forEach(g => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>${g.title}</strong> (${g.type}) - Status: ${g.status}
                    <br>${g.description}
                    <br>Upvotes: ${g.upvotes}
                    <br>
                    <button onclick="upvoteGrievance(${g.grievanceId})">Raise</button>
                    <button onclick="resolveGrievance(${g.grievanceId})">Mark Resolved</button>
                `;
                container.appendChild(li);
            });
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    const form = document.getElementById("grievanceForm");

    if(form) form.addEventListener("submit", submitGrievance);

    if(path.includes("student_dashboard")) {
        loadGrievances("studentGrievances", g => g.type === "PUBLIC" || g.studentId == (localStorage.getItem("userId") || 1));
    } else if(path.includes("faculty_dashboard")) {
        loadGrievances("facultyGrievances", g => g.status !== "RESOLVED");
    } else if(path.includes("admin_dashboard")) {
        loadGrievances("adminGrievances", g => true);
    }
});