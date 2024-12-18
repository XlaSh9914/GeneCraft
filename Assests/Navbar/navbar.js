console.log("Navbar Script")

function isUserSignedIn() {
  const signedInUser = localStorage.getItem("signedInUser");
  return signedInUser !== null; // Returns true if a user is signed in
}

if (isUserSignedIn()) {
  document.getElementById("signin-btn").style.display = 'none';
  document.getElementById("signup-btn").style.display = 'none';
}