const userId = localStorage.getItem('userId');
const firstname = localStorage.getItem('firstname');
const token = localStorage.getItem('token');

const cancel = document.querySelector(".cancel");
cancel.addEventListener("click", (e) => {
  e.preventDefault();
  window.history.back();
})

if(!token) {
    window.location.href="./login.html";
}

document.querySelector('#namebar').innerHTML = firstname.toUpperCase();

const createOrder = event => {
  event.preventDefault();

  fetch('https://parcel-sender-app-backend.herokuapp.com/api/v1/parcels', {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
          user_id: userId,
          pickup_location: document.querySelector('#pickup').value,
          destination: document.querySelector('#destination').value,
          recipient_name: document.querySelector('#reciName').value,
          recipient_phone_no: document.querySelector('#reciNum').value,
          description: document.querySelector('#description').value
      })
    }) 
      .then(res => res.json())
      .then(res => {
          console.log(res)
          if(res.id) {
              toastr.success(res.msg);
              window.location.href="./userProfile.html";
          } else if(res.msg){
              toastr.error(res.msg)
          } else {
              res.errors.forEach(err => {
                  toastr.error(err.msg);
              });
          }
    })
      .catch(err => console.log("error occured", err));
};


document
    .querySelector('#registration-form')
    .addEventListener('submit', createOrder);


//handling menu bar
$(document).ready(() => {
    $(".burger-nav").on("click", () => {
        $("header nav ul").toggleClass("open");
    });
});