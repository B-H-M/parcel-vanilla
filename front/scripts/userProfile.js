//getting items stored into local storage during login and registration
const firstname = localStorage.getItem('firstname');
const token = localStorage.getItem('token');
const description = localStorage.getItem('description');
const role = localStorage.getItem('role')


//preventing unauthorised users from accessing the page
if (!token){
    window.location.href = "./login.html"
}

else if (role === "admin"){
  window.location.href = "./adminPage.html"
}
else{
  const body = document.querySelector('body');
  body.style.display = 'block'
}


document.querySelector('#nameBar').innerHTML = firstname.toUpperCase();


//fetch request to render all user parcels into the table
const userId = localStorage.getItem("userId");

fetch(`https://parcel-sender-app-backend.herokuapp.com/api/v1/users/${userId}/parcels`, {
    method: 'GET',
    headers: {
        Authorization: token
    }
})
    .then(res => res.json())
    .then(data => {
      if(!data.length) {
          const showTable = document.querySelector('.displayTable');
          showTable.style.color = 'red';
          showTable.innerHTML = "You do not have any parcel Delivery order yet";

      } else {
        const ordersTable = document.querySelector(".parcelDetails"); 
            data.sort((a, b) => a.id - b.id);
            renderTableData(data, ordersTable);

            //numbers of orders
            document.querySelector("#ordersLength").innerHTML = `${data.length}`;

            //numbers of items in transit
            const transitOrder = data.filter(val => val.status === "in transit").length;
            document.querySelector('#transit').innerHTML = `${transitOrder}`;

            //number of delivered items
            const delivered = data.filter(val => val.status === "delivered").length;
            document.querySelector('#delivered').innerHTML = `${delivered}`;

            //number of cancelled items
            const cancelled = data.filter(val => val.status === "Cancelled").length;
            document.querySelector("#cancelled").innerHTML = `${cancelled}`;
        }
    });


    
    const renderTableData = (data, ordersTable) => {      
        data.forEach(parcel => {
            let parcelRow = document.createElement("tr");
            parcelRow.innerHTML = `<th scope="row" class="no-display">${parcel.id}</th>
                                        <td>${parcel.pickup_location}</td>
                                        <td class="remove-second">${parcel.destination}</td>
                                        <td>${parcel.recipient_name}</td>
                                        <td>${parcel.recipient_phone_no}</td>
                                        <td>${parcel.description}</td>
                                        <td>${parcel.status}</td>                                        
                                        <td><a class="text-success edit-parcel" onclick="showEditModal(${parcel.id})"><i class="fas fa-edit"></i></a></td>
                                        <td><a class="text-danger" onclick="cancelOrder(${parcel.id})"><i class="fas fa-minus-circle"></i></a></td>
                                        
                                `;
            ordersTable.append(parcelRow);
        
        });        
       
      };
         
//handling logout
const logout = document.querySelector('#logout');

logout.addEventListener('click',() => {
    localStorage.clear();
    window.location.href = "./login.html";
})


//handling menu bar
$(document).ready(() => {
    $(".burger-nav").on("click", () => {
      $("header nav ul").toggleClass("open");
    });
  
  });

  $(document).ready(() => {
    $("a.edit-parcel").click(function(event){
      event.preventDefault();
    });
  })

  function showEditModal(parcel_id){
    document.querySelector('#parcelId').value = parcel_id;
    $("#editDestinationModal").modal("show") 
  }

 