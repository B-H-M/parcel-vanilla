const role = localStorage.getItem('role');

if (role === 'member') {
    window.location.href = './userProfile.html';
}
else if (role === 'admin') {
    window.location.href = './adminPage.html'
}

const login = event => {
    event.preventDefault()

    fetch('https://parcel-sender-app-backend.herokuapp.com/api/v1/users/login', {
        method: 'POST',
        headers: {
            'Accept' : 'application/json, text/plain, */*',
            'Content-type' : 'application/json',
        },
        body: JSON.stringify({
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        })
    }).then(res => res.json())
        .then(res => {
            console.log(res)
            if(res.token) {
                fetch('https://parcel-sender-app-backend.herokuapp.com/api/v1/me', {
                    headers: {
                    'Authorization' : res.token,
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log('coming from login', data);
                    if ((data.role === 'member') || (data.role === 'admin')) {
                        localStorage.setItem('token', res.token);
                        localStorage.setItem('userId', res.userId);
                        localStorage.setItem('firstname', data.first_name);
                        localStorage.setItem('role', data.role);
                        toastr.success(res.msg);
                        { data.role === 'member' ? (window.location.href = "./userProfile.html") : (window.location.href = './adminPage.html') };
                        
                    } 
                    else { 
                        toastr.error('Sorry only members can login to this page');
                    }
                })
                .catch(err => console.log("err occured", err))
            } else if(res.msg) {
                toastr.error(res.msg)
            }              
        })
        .catch(err => console.log('err occured', err))    
    }

    document.querySelector('#login-form').addEventListener('submit', login);

    const cancel = document.querySelector(".cancel");
    cancel.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector('#login-form').reset();
})

//handling menu bar
$(document).ready(() => {
    $(".burger-nav").on("click", () => {
      $("header nav ul").toggleClass("open");
    });
 });