import usersCredentials from "../../Data/users.js";

function closeLoginPopup() {
  document.getElementById("login-popup").style.display = "none";
}

function signInUser(username) {
  // Store the signed-in user's information
  localStorage.setItem("signedInUser", username);
  alert(`Welcome back, ${username}!`);
}

function validateLoginForm(event) {
  // Prevent form submission
  event.preventDefault();

  // Get form inputs
  const usernameInput = document.getElementById("loginUsername");
  const passwordInput = document.getElementById("loginPassword");
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Reset validation states
  usernameInput.classList.remove("invalid");
  passwordInput.classList.remove("invalid");

  // Validation rules
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    usernameInput.classList.add("invalid");
    alert("Username can only contain letters and numbers.");
    return false;
  }

  if (!password) {
    passwordInput.classList.add("invalid");
    alert("Please enter your password.");
    return false;
  }

  // Check if user exists
  const user = usersCredentials.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    alert("Invalid username or password. Please try again.");
    return false; // Prevent form submission
  }

  // If all validations pass
  closeLoginPopup();
  signInUser(user.username);

  // Clear form
  document.querySelector("#login-popup form").reset();
  document.getElementById("signin-btn").style.display = 'none';
  document.getElementById("signup-btn").style.display = 'none';
  return true;
}

// Attach functions to the global window object (if using `type="module"`)
window.validateLoginForm = validateLoginForm;
window.closeLoginPopup = closeLoginPopup;
