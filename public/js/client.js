$(document).ready(function(){
  $('.sidebar .nav li a').click(function(e) {
    $('.sidebar .nav li').removeClass('active');
    var $this = $(this).closest('li');
    if (!$this.hasClass('active')) {
      $this.addClass('active');
    }
  });
});

function delete_player(_id){
  $.ajax({
    method: "DELETE",
    url: "/player/"+_id,
    success: function( msg ) {
      location.href="/player/";
    },
    error: function( msg ) {
      alert( "Error - " + msg.msgText );
    }
  });
}

function edit_player(_id){
  $.ajax({
    method: "GET",
    url: "/player/"+_id,
    success: function( msg ) {
      location.href="/player/";
    },
    error: function( msg ) {
      alert( "Error - " + msg.msgText );
    }
  });
}