
const register = event => {
  event.preventDefault();


  const password = document.querySelector('#password').value;
  const confirm_password = document.querySelector('#confirm_password').value;

  if (password !== confirm_password) {
    toastr.error("password does not match");
  }
  else {  
    fetch("https://parcel-sender-app-backend.herokuapp.com/api/v1/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        first_name: document.querySelector("#firstname").value,
        last_name: document.querySelector("#lastname").value,
        email: document.querySelector("#email").value,
        phone_no: document.querySelector("#phone-no").value,
        password: document.querySelector("#password").value
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.token) {
          fetch("https://parcel-sender-app-backend.herokuapp.com/api/v1/me", {
            headers:{
              'Authorization': res.token
            }
          })
            .then(res => res.json())
            .then(data => {
              if (data.role === "member") {
                localStorage.setItem("token", res.token);
                localStorage.setItem("userId", res.userId);
                localStorage.setItem("firstname", data.first_name);
                window.location.href = "./userProfile.html";
                toastr.success(res.msg);
              }
            })
            .catch(err => console.log("err occured", err));
        } else if (res.msg) {
          toastr.error(res.msg);
        } else {
            res.errors.forEach(err => {
                toastr.error(`${err.msg}`);
            });
        }
      })
      .catch(err => console.log("err occured", err));
  }
}

document
  .querySelector("#registration-form")
  .addEventListener("submit", register);

const cancel = document.querySelector(".cancel");
  cancel.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector('#registration-form').reset();
  })

  //handling menu bar
  $(document).ready(() => {
    $(".burger-nav").on('click', () => {
      $("header nav ul").toggleClass("open")
    });
  });
