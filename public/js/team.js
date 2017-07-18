var playerSelected = [];
$(document).ready(function(){
  $('.sidebar .nav li a').click(function(e) {
    $('.sidebar .nav li').removeClass('active');
    var $this = $(this).closest('li');
    if (!$this.hasClass('active')) {
      $this.addClass('active');
    }
  });


  $('#team_player_list').multiselect({
    maxHeight: '300',
    buttonWidth: '100%',
    nonSelectedText: 'Choose Players',
    numberDisplayed: 10,
    onChange: function(element, checked) {
        playerSelected = [];
        var players = $('#team_player_list option:selected');
        $(players).each(function(index, player){
            playerSelected.push(JSON.parse($(this).val()));
        });
        console.log(playerSelected);
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

function edit_team(_id){
  $.ajax({
    method: "GET",
    url: "/team/"+_id,
    success: function( msg ) {
      location.reload();
    },
    error: function( msg ) {
      alert( "Error - " + msg.msgText );
    }
  });
}

function onchangeSport(){
  $.ajax({
    method: "GET",
    url: "/player/list_players/"+$('#sport_id').val(),
    success: function(data) {
      $('#team_player_list').empty();
      $.each(data, function(index, value){
        $("<option value=" + value + ">" + value.first_name + " " + value.last_name + " </option>").appendTo($('#team_player_list'));
      });
      $('#team_player_list').multiselect('rebuild');
    }
  });
}

function delete_team_player(player_id){
  $.ajax({
    method: "DELETE",
    url: "/team/deleteplayer/"+ $('#obj_id').val() +"/"+player_id,
    success: function(msg) {
      location.reload();
    },
    error: function(msg) {
      alert( "Error - Cannot delete");
    }
  });
}

function add_team_player(){
  $.ajax({
    method: "POST",
    url: "/team/addplayer",
    data:{
      id: $('#obj_id').val(),
      team_player_list: JSON.stringify(playerSelected)
    },
    success: function(msg) {
      location.reload();
    }
  });
}