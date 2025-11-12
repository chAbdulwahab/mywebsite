document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector("form");
 if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = {
      fname: (document.getElementById("fname")||{value:''}).value.trim(),
      lname: (document.getElementById("lname")||{value:''}).value.trim(),
      roll: (document.getElementById("roll")||{value:''}).value.trim(),
      email: (document.getElementById("email")||{value:''}).value.trim(),
      dept: (document.getElementById("dept")||{value:''}).value,
      program: (document.getElementById("program")||{value:''}).value,
      semester: (document.getElementById("semester")||{value:''}).value,
      cgpa: (document.getElementById("cgpa")||{value:''}).value.trim(),
      bio: (document.getElementById("bio")||{value:''}).value.trim()
    };
    if (!data.fname || !data.lname || !data.roll || !data.email) {
      alert("⚠️ Please fill all required fields: First Name, Last Name, Roll Number, and Email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      alert("⚠️ Please enter a valid email address.");
      return;
    }

    var store = {
      firstName: data.fname,
      lastName: data.lname,
      roll: data.roll,
      email: data.email,
      dept: data.dept,
      program: data.program,
      semester: data.semester,
      cgpa: data.cgpa,
      bio: data.bio,
      savedAt: new Date().toISOString()
    };

    localStorage.setItem("studentProfile", JSON.stringify(store));

    alert("✅ Registration successful! Redirecting to your profile...");
    window.location.href = "profile.html";
  });
}


  if (document.title && document.title.toLowerCase().includes("profile")) {
    var raw = localStorage.getItem("studentProfile");
    var table = document.querySelector("table.courses");
    if (!raw) {
      if (table) {
        table.innerHTML = '<thead><tr><th>Field</th><th>Information</th></tr></thead><tbody><tr><td colspan="2" style="text-align:center;padding:12px">No profile found. Please register first.</td></tr></tbody>';
      }
      return;
    }
    var d = JSON.parse(raw);
    var rows = [
      ["Name", (d.firstName || '') + (d.lastName ? ' ' + d.lastName : '')],
      ["Roll Number", d.roll || '-'],
      ["Email", d.email || '-'],
      ["Department", d.dept || '-'],
      ["Program", d.program || '-'],
      ["Semester", d.semester || '-'],
      ["CGPA", d.cgpa || '-'],
      ["Bio", d.bio || '-'],
      ["Saved At", d.savedAt ? new Date(d.savedAt).toLocaleString() : '-']
    ];
    if (table) {
      var out = "<thead><tr><th>Field</th><th>Information</th></tr></thead><tbody>";
      rows.forEach(function (r) {
        out += "<tr><td>" + esc(r[0]) + "</td><td>" + esc(r[1]) + "</td></tr>";
      });
      out += "</tbody>";
      table.innerHTML = out;
    }
  }
  var dt = document.getElementById("datetime");
  if (dt) {
    function showTime() {
      dt.textContent = new Date().toLocaleString();
    }
    showTime();
    setInterval(showTime, 1000);
  }

  function esc(s) {
    if (s === null || s === undefined) return "";
    return String(s).replace(/[&<>"']/g, function (m) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m];
    });
  }
});
