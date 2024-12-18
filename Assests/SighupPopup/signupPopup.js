import usersCredentials from "../../Data/users.js";

function closeSignupPopup() {
  document.getElementById("signup-popup").style.display = "none";
}

function signInUser(username) {
  // Store the signed-in user's information
  localStorage.setItem("signedInUser", username);
  alert(`Welcome, ${username}!`);
}

function validateSignupForm(event) {
  // Prevent form submission
  event.preventDefault();

  // Get form inputs
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const age = document.getElementById("age").value.trim();
  const gender = document.getElementById("gender").value.trim();
  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  // Reset validation states
  const inputs = document.querySelectorAll("#signup-popup input, #signup-popup select");
  inputs.forEach((input) => input.classList.remove("invalid"));

  // Validation rules
  if (!/^[a-zA-Z]+$/.test(firstName)) {
    document.getElementById("firstName").classList.add("invalid");
    alert("First name can only contain letters.");
    return false;
  }

  if (!/^[a-zA-Z]+$/.test(lastName)) {
    document.getElementById("lastName").classList.add("invalid");
    alert("Last name can only contain letters.");
    return false;
  }

  if (!age || isNaN(age) || age <= 0) {
    document.getElementById("age").classList.add("invalid");
    alert("Please enter a valid age.");
    return false;
  }

  if (!gender) {
    document.getElementById("gender").classList.add("invalid");
    alert("Please select your gender.");
    return false;
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    document.getElementById("signupUsername").classList.add("invalid");
    alert("Username can only contain letters and numbers.");
    return false;
  }

  if (usersCredentials.some((user) => user.username === username)) {
    document.getElementById("signupUsername").classList.add("invalid");
    alert("Username already exists. Please choose another.");
    return false;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    document.getElementById("email").classList.add("invalid");
    alert("Please enter a valid email address.");
    return false;
  }

  if (!password || password.length < 6) {
    document.getElementById("signupPassword").classList.add("invalid");
    alert("Password must be at least 6 characters long.");
    return false;
  }

  // Add new user to the usersCredentials array
  const newUser = {
    userId: usersCredentials.length + 1, // Auto-increment userId
    username: username,
    password: password, // Store plain password for now (consider hashing in production)
  };

  usersCredentials.push(newUser);
  signInUser(username);

  console.log("Updated Users:", usersCredentials);

  // Close signup popup
  closeSignupPopup();

  // Clear form
  document.querySelector("#signup-popup form").reset();
  document.getElementById("signin-btn").style.display = 'none';
  document.getElementById("signup-btn").style.display = 'none';
  return true;
}
// Attach functions to the global window object (if using `type="module"`)
window.validateSignupForm = validateSignupForm;
window.closeSignupPopup = closeSignupPopup;