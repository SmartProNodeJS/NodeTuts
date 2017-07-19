var teamSelected = [];
$(document).ready(function(){
  $('.sidebar .nav li a').click(function(e) {
    $('.sidebar .nav li').removeClass('active');
    var $this = $(this).closest('li');
    if (!$this.hasClass('active')) {
      $this.addClass('active');
    }
  });

  $('#match_date').datepicker({
    autoclose: true, 
    todayHighlight: true,
    format: 'dd/mm/yyyy'
  });

  $('#match_time').clockpicker({
      placement: 'bottom'
      , align: 'left'
      , autoclose: true
      , 'default': 'now'
  });

  $('#match_team_list').multiselect({
    maxHeight: '300',
    buttonWidth: '100%',
    nonSelectedText: 'Choose Teams',
    numberDisplayed: 10,
    onChange: function(element, checked) {
        teamSelected = [];
        var teams = $('#match_team_list option:selected');
        $(teams).each(function(index, player){
            teamSelected.push(JSON.parse($(this).val()));
        });
        console.log(teamSelected);
    }
  });
});

function delete_match(_id){
  $.ajax({
    method: "DELETE",
    url: "/match/"+_id,
    success: function(msg) {
      location.href="/match/";
    },
    error: function( msg ) {
      alert( "Error - " + msg.msgText );
    }
  });
}

function edit_match(_id){
  $.ajax({
    method: "GET",
    url: "/match/"+_id,
    success: function( msg ) {
      location.reload();
    },
    error: function( msg ) {
      alert( "Error - " + msg.msgText );
    }
  });
}

function onchangeSport_Match(){
  $.ajax({
    method: "GET",
    url: "/category/list_match_teams/"+$('#sport_id').val(),
    success: function(data) {
      $('#match_team_list').empty();
      $.each(data, function(index, value){
        $("<option value=" + value + ">" + value.team_name + " </option>").appendTo($('#match_team_list'));
      });
      $('#match_team_list').multiselect('rebuild');
    }
  });
}

function delete_match_team(team_id){
  $.ajax({
    method: "DELETE",
    url: "/match/deleteteam/"+ $('#obj_id').val() +"/"+team_id,
    success: function(msg) {
      location.reload();
    },
    error: function(msg) {
      alert( "Error - Cannot delete");
    }
  });
}

function add_team(){
  $.ajax({
    method: "POST",
    url: "/match/addteam",
    data:{
      id: $('#obj_id').val(),
      match_team_list: JSON.stringify(teamSelected)
    },
    success: function(msg) {
      location.reload();
    }
  });
}