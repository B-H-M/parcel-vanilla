// const token = localStorage.getItem('token');
// const role = localStorage.getItem('role');

// if(!token) {
//     window.location.href = './login.html';
// }

// if(role !== 'admin') {
//     window.location.href = './userProfile.html'
// }


const editLocation = e => {
    e.preventDefault();

    fetch('https://parcel-sender-app-backend.herokuapp.com/api/v1/parcels/presentLocation', {
        method: "PATCH",
        headers: {
            "Content-type" : "application/json",
            Authorization: token
        },
        body: JSON.stringify({
            parcelId: document.querySelector('#parcelsId').value,
            presentLocation: document.querySelector('#presentLocation').value
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        if(res.details) {
            window.location = 'adminPage.html'
            toastr.success("Location Changed Successfully");
        } else if (res.msg) {
            toastr.error('Unable to change destination!');
        }
    })
    .catch(err => console.log("error occured", err));
}

document
  .getElementById("location-form")
  .addEventListener("submit", editLocation);


$(document).ready(function(){
  $(".hamburger-nav").on("click", function(){

  $(".first-ul").toggleClass("open");

  });
});
