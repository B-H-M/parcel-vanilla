const firstname = localStorage.getItem('firstname');
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

//preventing unauthorized users from accessing the page
if (!token){
    window.location.href = "./login.html"
}
else{
    const body = document.querySelector('body');
    body.style.display = 'block'
}

if(role !== 'admin') {
    window.location.href = './userProfile.html'
}

//handling logout
const logout = document.querySelector('#logout');

logout.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = './login.html'
});

document.querySelector('#nameBar').innerHTML = firstname.toUpperCase();

//fetch request to render all user parcels into the table
const userId = localStorage.getItem('userId');

fetch('https://parcel-sender-app-backend.herokuapp.com/api/v1/parcels', {
    method: 'GET',
    headers: {
        Authorization: token
    }
})
    .then(res => res.json())
    .then(data => {
        const ordersTable = document.querySelector('.parcelDetails');
        if(!data.length) {
            document.querySelector('#error-msg').innerHTML = "You do not have any parcel in the database!";
        } else {
          data.sort((a, b) => a.id - b.id);
          // renderTableData(data, ordersTable);
    
          const renderTableData = (data, ordersTable) => {
            data.forEach(parcel => {
              let parcelRow = document.createElement("tr");
              parcelRow.innerHTML = `<th scope="row" class="no-display">${parcel.id}</th>
                                    <td>${parcel.pickup_location}</td>
                                    <td class="remove-second">${parcel.destination}</td>
                                    <td>${parcel.recipient_name}</td>
                                    <td>${parcel.recipient_phone_no}</td>
                                    <td>${parcel.status}</td>
                                    <td><a class="text-success edit-parcel" onclick="showChangeStatusModal(${parcel.id})"><i class="fas fa-edit"></i>Change Status</a></td>
                                    <td><a class="text-success edit-parcel" onclick="showChangeLocationModal(${parcel.id})"><i class="fas fa-user-edit"></i>Change Location</a></td>

                                     `;
              ordersTable.append(parcelRow);
              return parcelRow
              
            });
          
          };
    
          renderTableData(data, ordersTable);

        //searching the table 
        const search = document.querySelector('#search');
        search.addEventListener('keyup', () => {
            // e.preventDefault();
            const searchValue = search.value.trim().toLowerCase();

            const filteredParcel = (searchValue) => {

                Array.from(ordersTable.children)
                    .filter(tableRow => !tableRow.textContent.toLowerCase().includes(searchValue))
                    .forEach(tableRow => tableRow.classList.add("filtered"));

                Array.from(ordersTable.children)
                    .filter(tableRow => tableRow.textContent.toLowerCase().includes(searchValue))
                    .forEach(tableRow => tableRow.classList.remove("filtered"))
            }
                filteredParcel(searchValue);
        }) 

        //checking status
        const select = document.querySelector(".select-table-filter")
        select.addEventListener('change', () => {
            
            const selectValue = select.value;
            
                if(selectValue === "Delivered"){
                    Array.from(ordersTable.children)
                        .filter(tableRow => !tableRow.innerHTML.includes("Delivered"))
                        .forEach(tableRow => tableRow.classList.add("filtered"));

                    Array.from(ordersTable.children)
                        .filter(tableRow => tableRow.innerHTML.includes("Delivered"))
                        .forEach(tableRow => tableRow.classList.remove("filtered"))

                } else if(selectValue === "in transit"){
                    Array.from(ordersTable.children)
                    .filter(tableRow => !tableRow.innerHTML.includes("in transit"))
                    .forEach(tableRow => tableRow.classList.add("filtered"));

                    Array.from(ordersTable.children)
                        .filter(tableRow => tableRow.innerHTML.includes("in transit"))
                        .forEach(tableRow => tableRow.classList.remove("filtered"))

                } else if(selectValue === "Cancelled"){
                    Array.from(ordersTable.children)
                    .filter(tableRow => !tableRow.innerHTML.includes("Cancelled"))
                    .forEach(tableRow => tableRow.classList.add("filtered"));

                    Array.from(ordersTable.children)
                        .filter(tableRow => tableRow.innerHTML.includes("Cancelled"))
                        .forEach(tableRow => tableRow.classList.remove("filtered"))

                } else {
                    Array.from(ordersTable.children)
                        .forEach(tableRow => tableRow.classList.remove("filtered"))
                }
            
             
            })             
       
          
        //   const dest = document.createElement('h2');
        //   dest.className = ('destination');
        //   dest.innerHTML = `<div class="top">
        //                       <a href="changeStatus.html" class="heya"> 
        //                           Change Status 
        //                       </a> 
        //                   </div>`;
        //   document.getElementById('dassh').append(dest);
          

        //   const cancel = document.createElement('h2');
        //   cancel.className = ('destination2');
        //   cancel.innerHTML =  `<div class="bottom">
        //                           <a href="changeLocation.html" class="hey"> 
        //                               Change Location 
        //                           </a>
        //                       </div>`;
        //   document.getElementById('dassh').append(cancel);
        }
    });



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

  function showChangeStatusModal(parcel_id){
    document.querySelector('#parcelId').value = parcel_id;
    $("#changeStatusModal").modal("show") 
  }

  function showChangeLocationModal(parcel_id){
    document.querySelector('#parcelsId').value = parcel_id;
    $("#changeLocationModal").modal("show") 
  }

