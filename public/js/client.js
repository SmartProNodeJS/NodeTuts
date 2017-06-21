function test_client_js(){
    alert("Test Client Javascript");
}

function delete_user(ele){
  var tr = $(ele).closest('tr');
  if(tr){
      f_name = tr.find('td').eq(1).text();
      l_name = tr.find('td').eq(2).text();
  }
  alert(f_name+" "+l_name);

  $.ajax({
    method: "DELETE",
    url: "/users/"+l_name+"/"+f_name
  })
  .done(function( msg ) {
    alert( "Done - " + msg.msgText );
  });
}