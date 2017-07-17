$(document).ready(function(){
  $('.sidebar .nav li a').click(function(e) {
    $('.sidebar .nav li').removeClass('active');
    var $this = $(this).closest('li');
    if (!$this.hasClass('active')) {
      $this.addClass('active');
    }
  });
});

function delete_teamer(_id){
  $.ajax({
    method: "DELETE",
    url: "/teamer/"+_id,
    success: function( msg ) {
      location.href="/teamer/";
    },
    error: function( msg ) {
      alert( "Error - " + msg.msgText );
    }
  });
}

function edit_teamer(_id){
  $.ajax({
    method: "GET",
    url: "/teamer/"+_id,
    success: function( msg ) {
      location.href="/teamer/";
    },
    error: function( msg ) {
      alert( "Error - " + msg.msgText );
    }
  });
}