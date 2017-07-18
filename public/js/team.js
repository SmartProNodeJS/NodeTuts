$(document).ready(function(){
  $('.sidebar .nav li a').click(function(e) {
    $('.sidebar .nav li').removeClass('active');
    var $this = $(this).closest('li');
    if (!$this.hasClass('active')) {
      $this.addClass('active');
    }
  });
});

function delete_team(_id){
  $.ajax({
    method: "DELETE",
    url: "/team/"+_id,
    success: function( msg ) {
      location.href="/team/";
    },
    error: function( msg ) {
      alert( "Error - " + msg.msgText );
    }
  });
}