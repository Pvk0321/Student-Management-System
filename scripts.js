const apiUrl = "http://localhost:8080/students";

function fetchStudents() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("studentTable");
            table.innerHTML = "";
            data.forEach(s => {
                table.innerHTML += `<tr>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.course}</td>
                    <td>${s.email}</td>
                    <td>
                        <button onclick='editStudent(${JSON.stringify(s)})' class='btn btn-sm btn-warning'>Edit</button>
                        <button onclick='deleteStudent(${s.id})' class='btn btn-sm btn-danger'>Delete</button>
                    </td>
                </tr>`;
            });
        });
}

function deleteStudent(id) {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(() => fetchStudents());
}

function editStudent(s) {
    document.getElementById("studentId").value = s.id;
    document.getElementById("name").value = s.name;
    document.getElementById("course").value = s.course;
    document.getElementById("email").value = s.email;
}

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("studentId").value;
    const student = {
        name: document.getElementById("name").value,
        course: document.getElementById("course").value,
        email: document.getElementById("email").value
    };

    const method = id ? "PUT" : "POST";
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    }).then(() => {
        document.getElementById("studentForm").reset();
        fetchStudents();
    });
});
