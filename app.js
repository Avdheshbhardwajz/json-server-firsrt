const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const sign_in_form = document.querySelector(".sign-in-form");
const sign_up_form = document.querySelector(".sign-up-form");

async function sign_in_check(username, password) {
  try {
    let response = await fetch(
      "http://localhost:3000/users?email=" + username + "&password=" + password
    );
    let userdata = await response.json();
    console.log("userdata here");
    localStorage.setItem("user", JSON.stringify(userdata));
    console.log(JSON.parse(localStorage.getItem("user")));
    if (userdata.length > 0) {
      alert("Login Successfull");
      //   window.location.href = "./admin.html";
    } else {
      alert("Invalid username or password");
    }
  } catch (error) {
    alert("Invalid username or password");
  }
}

// sign_in_form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   let sign_in_values = event.target;
//   let username = sign_in_values[0].values;
//   let password = sign_in_values[1].values;
//   console.log(username);
//   console.log(password);
//   sign_in_check(username, password);
// });
sign_in_form.addEventListener("submit", (event) => {
  event.preventDefault();
  let sign_in_values = event.target;
  let username = sign_in_values[0].value; // Accessing the first input field's value
  let password = sign_in_values[1].value; // Accessing the second input field's value
  console.log(username);
  console.log(password);
  sign_in_check(username, password);
});

async function adduser(user) {
  try {
    let response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const newuser = await response.json();
    alert("New User Added " + newuser.id);
  } catch (error) {}
}

sign_up_form.addEventListener("submit", (event) => {
  event.preventDefault();
  let sign_up_values = event.target;
  let username = sign_up_values[0].value;
  let email = sign_up_values[1].value;
  let password = sign_up_values[2].value;
  let user = {
    id: Math.random(),
    username,
    email,
    password,
  };
  adduser(user);
});
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
