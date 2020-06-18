
$(document).ready(() => {
    $(".burger-nav").on("click", () => {
      $("header nav ul").toggleClass("open");
    });
  
    $(".banner").hide();
    $(".banner").fadeIn(2000);
    $(".form-section").slideUp(1);
    $(".form-section").slideDown(1000);
  });