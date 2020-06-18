
//prevent unauthorized users from login in
if(!token) {
    windows.location.href="./login.html";
}

//handling request to change a specific parcel destination
const changeDestination = e => {
    e.preventDefault();

    fetch('https://parcel-sender-app-backend.herokuapp.com/api/v1/parcels/destination', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json',
            Authorization: token
        },
        body: JSON.stringify({
            parcelId: document.querySelector('#parcelId').value,
            destination: document.querySelector('#destination').value,
            user_id: userId
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        if(res.details){
            toastr.success('Destination changed Successfully!');
            window.location.href="./userProfile.html"
        } else if (res.msg) {
            toastr.error(res.msg);
        }
    })
    .catch(err => console.log("error occured", err));
};

document.querySelector('#edit-form').addEventListener("submit", changeDestination);