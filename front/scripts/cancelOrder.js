// const userId = localStorage.getItem('userId');
// const firstname = localStorage.getItem('firstname');
// const token = localStorage.getItem('token');

if(!token) {
    window.location.href = "./login.html";
}

// document.querySelector("#namebar").innerHTML = firstname.toUpperCase();

const cancelOrder = (parcel_id) => {
    // event.preventDefault()
    document.querySelector('#parcelId').value = parcel_id;

    fetch('https://parcel-sender-app-backend.herokuapp.com/api/v1/parcels/cancel', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json',
            Authorization: token
        },
        body: JSON.stringify({
            parcelId: document.querySelector('#parcelId').value,
            user_id: userId
        })
    })
      .then(res => res.json())
      .then(res => {
          console.log(res);
          if(res.details) {
              toastr.success(res.msg);
              window.location.href="./userProfile.html";
          } else if (res.msg) {
              toastr.error(res.msg)
          }
       })
    
        .catch(err => console.log('error occured', err));
};

// document.querySelector('#cancel-form').addEventListener('submit', cancelOrder);

$(document).ready(() => {
    $(".burger-nav").on("click", () => {
      $("header nav ul").toggleClass("open");
    });
  });