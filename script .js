const form = document.getElementById("regForm");
const successBox = document.getElementById("success");

// Regular expressions for pattern matching
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // local part, @, domain, top-level domain
const mobilePattern = /^[6-9]\d{9}$/;                // 10 digits starting with 6-9

// show an error (red border + message) or mark the field valid (green border)
function setResult(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  error.textContent = message;
  input.classList.toggle("invalid", message !== "");
  input.classList.toggle("valid", message === "");
  return message === "";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();                           // stop the browser from submitting immediately
  successBox.className = "success hidden";

  const name = document.getElementById("fullName").value.trim();      // trim() removes extra spaces
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const branch = document.getElementById("branch").value;
  const password = document.getElementById("password").value.trim();

  const results = [
    setResult("fullName", "nameError", name === "" ? "Full name is required." : ""),
    setResult("email", "emailError",
      email === "" ? "Email is required." : !emailPattern.test(email) ? "Enter a valid email address." : ""),
    setResult("mobile", "mobileError",
      mobile === "" ? "Mobile number is required." : !mobilePattern.test(mobile) ? "Enter a valid 10 digit number starting with 6-9." : ""),
    setResult("branch", "branchError", branch === "" ? "Please select your branch." : ""),
    setResult("password", "passwordError",
      password === "" ? "Password is required." : password.length < 6 ? "Password must be at least 6 characters." : "")
  ];

  // all fields must pass before the success state is shown
  if (results.every(Boolean)) {
    successBox.textContent = "Registration successful! Welcome, " + name + ".";
    successBox.className = "success";
    form.reset();
    document.querySelectorAll(".valid").forEach(function (el) { el.classList.remove("valid"); });
  }
});
