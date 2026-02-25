document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const passwordHash = document.getElementById("password").value;

            fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, passwordHash })
            })
                .then(res => {
                    if (res.ok) return res.json();
                    throw new Error("Invalid credentials");
                })
                .then(user => {
                    localStorage.setItem("userId", user.userId);
                    localStorage.setItem("role", user.role);
                    localStorage.setItem("department", user.department);

                    if (user.role === "STUDENT") window.location.href = "student_dashboard.html";
                    else if (user.role === "FACULTY") window.location.href = "faculty_dashboard.html";
                    else if (user.role === "ADMIN") window.location.href = "admin_dashboard.html";
                })
                .catch(err => alert(err.message));
        });
    }
});