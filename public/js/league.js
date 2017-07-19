var matchSelected =[];
$(document).ready(function(){
  $('.sidebar .nav li a').click(function(e) {
    $('.sidebar .nav li').removeClass('active');
    var $this = $(this).closest('li');
    if (!$this.hasClass('active')) {
      $this.addClass('active');
    }
  });
  $('#league_match_list').multiselect({
    maxHeight: '300',
    buttonWidth: '100%',
    nonSelectedText: 'Choose Matches',
    numberDisplayed: 10,
    onChange: function(element, checked) {
        matchSelected = [];
        var matches = $('#league_match_list option:selected');
        $(matches).each(function(index, match){
            matchSelected.push(JSON.parse(JSON.stringify($(this).val())));
        });
        console.log(matchSelected);
    }
  });
  onchangeSport_League();
});

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
    url: "/match/"+_id,
    success: function( msg ) {
      location.href="/league/";
    },
    error: function( msg ) {
      alert( "Error - " + msg.msgText );
    }
  });
}
function onchangeSport_League(){
  var info = '';
  $.ajax({
    method: "GET",
    url: "/category/list_match_league/"+$('#sport_id').val(),
    success: function(data) {
      $('#league_match_list').empty();
      $.each(data, function(index, value){
        for(var i = 0; i < value.team_list.length; i++){
          if(i != value.team_list.length - 1){
            info +=  value.team_list[i].team_name + " vs ";
          }
          else{
            info += value.team_list[i].team_name;
          }
        }
        $("<option value=" + value + ">" + value.match_time + " - " + value.match_date + ": " + info + " </option>").appendTo($('#league_match_list'));
      });
      $('#league_match_list').multiselect('rebuild');
    }
  });
}
function add_league_match(){
  $.ajax({
    method: "POST",
    url: "/league/addmatch",
    data:{
      id: $('#obj_id').val(),
      league_match_list: JSON.stringify(matchSelected)
    },
    success: function(msg) {
      location.reload();
    }
  });
}
function delete_league_match(match_id){
  $.ajax({
    method: "DELETE",
    url: "/league/deletematch/"+ $('#obj_id').val() +"/"+match_id,
    success: function(msg) {
      location.reload();
    },
    error: function(msg) {
      alert( "Error - Cannot delete");
    }
  });
}