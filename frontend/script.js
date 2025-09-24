let token = "";

function showPage(pageId) {
  document.getElementById("signupPage").classList.add("hidden");
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("pdfPage").classList.add("hidden");

  document.getElementById(pageId).classList.remove("hidden");
}

async function signup() {
  const res = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("signupUser").value,
      password: document.getElementById("signupPass").value
    })
  });
  const data = await res.json();
  alert(data.msg || data.error);
  if (data.msg) {
    showPage("loginPage"); // go to login after signup
  }
}

async function login() {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("loginUser").value,
      password: document.getElementById("loginPass").value
    })
  });
  const data = await res.json();
  if (data.token) {
    token = data.token;
    alert("Login successful!");
    showPage("pdfPage"); // show PDF page
  } else {
    alert(data.msg || "Login failed");
  }
}

async function generatePDF() {
  if (!token) {
    alert("You must log in first!");
    return;
  }
  const res = await fetch("http://localhost:5000/api/pdf/generate-pdf", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token 
    },
    body: JSON.stringify({
      content: document.getElementById("pdfContent").value
    })
  });

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "output.pdf";
  a.click();
}

function logout() {
  token = "";
  alert("You have been logged out!");
  showPage("loginPage");
}
