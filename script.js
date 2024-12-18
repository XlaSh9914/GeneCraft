fetch("./Assests/Navbar/navbar.html").then((response) => response.text()).then((data) => {
  document.getElementById("navbar").innerHTML = data;
}).catch((error) => {
  console.error("Error loading navbar:", error);
  document.getElementById("navbar").innerHTML = "<p>Navbar failed to load. Please try again later.</p>";
});

fetch("./Assests/LoginPopup/loginPopup.html").then((response) => response.text()).then((data) => {
  document.getElementById("login").innerHTML = data;
}).catch((error) => {
  console.error("Error loading login popup:", error);
});

fetch("./Assests/SighupPopup/signupPopup.html").then((response) => response.text()).then((data) => {
  document.getElementById("signup").innerHTML = data;
}).catch((error) => {
  console.error("Error loading signup popup:", error);
});

function openLoginPopUp() {
  document.getElementById("login-popup").style.display = "block";
}

function openSignupPopUp() {
  document.getElementById("signup-popup").style.display = "block";
}
