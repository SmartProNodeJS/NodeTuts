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

function edit_team(_id){
  $.ajax({
    method: "GET",
    url: "/team/"+_id,
    success: function( msg ) {
      location.href="/team/";
    },
    error: function( msg ) {
      alert( "Error - " + msg.msgText );
    }
  });
}

function delete_league(_id){
  $.ajax({
    method: "DELETE",
    url: "/league/"+_id,
    success: function( msg ) {
      location.href="/league/";
    },
    error: function( msg ) {
      alert( "Error - " + msg.msgText );
    }
  });
}

function edit_league(_id){
  $.ajax({
    method: "GET",
    url: "/league/"+_id,
    success: function( msg ) {
      location.href="/league/";
    },
    error: function( msg ) {
      alert( "Error - " + msg.msgText );
    }
  });
}