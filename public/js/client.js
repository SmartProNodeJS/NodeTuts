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

function edit_league(ele){
  var tr = $(ele).closest('tr');
  if(tr){
      id = tr.find('td').eq(0).text();
      name = tr.find('td').eq(1).text();
      start = tr.find('td').eq(2).text();
      end = tr.find('td').eq(3).text();
      place = tr.find('td').eq(4).text();
      sport = tr.find('td').eq(5).text();
      is_number = tr.find('td').eq(6).text();
      window.location = "/leagues/"+ id;
  }
  //alert(id + " " + name+" "+start + end + place + sport + is_number);
  //location.href = "/"+id;
  
}
function delete_league(ele){
  var tr = $(ele).closest('tr');
  if(tr){
      id = tr.find('td').eq(0).text();
      name = tr.find('td').eq(1).text();
      window.location = "/leagues/"+ id + "/" + name;
  }
  //alert(id + " " + name+" "+start + end + place + sport + is_number);
  //location.href = "/"+id;
  //window.location = "/leagues/"+ name;
  //$.ajax({
  //  method: "DELETE",
  //  url: "/leagues/"+id+"/"+name
  //})
  //.done(function( msg ) {
  //  alert( "Done - " + msg.msgText );
  //});

  
}

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

function onLoadGridPlayer(numbTab) {
    $("#team_list" + numbTab).kendoGrid({
        dataSource: null,
        noRecords: true,
        selectable: "row",
        // editable: {
        //     confirmation: false
        // },
        autoSync: true,
        resizable: true,
        navigatable: true,//tab key in cell
        //edit: gridCTX_ChiTiet_edit,
        // toolbar: [{ name: 'thanhtien', template: '#= Toolbar_custom(' + numbTab + ')#' }],
        messages: {
            noRecords: "Rỗng!"
        },
        // edit: changeTien,
        sortable: true,
        scrollable: true,
        columns: [
        {
            field: "_id",
            title: "ID", width: 200,
            headerAttributes: {
                style: "text-align: center; vertical-align: middle; font-weight:bold;",
            },
            hidden:true,
        },
        {
            field: "HOTEN",
            title: "Họ tên", width: 220, attributes: { class: "canhgiua" },
            headerAttributes: {
                style: "text-align: center; vertical-align: middle; font-weight:bold;",
            },
        },
       
        {
            //width: 80,
            field: "del",
            headerAttributes: {
                style: "text-align: center; vertical-align: middle; font-weight:bold;",
            },
            title: "Thao tác",
            command: [{
                name: "Xóa", imageClass: "k-icon k-i-close", click: function (e) {
                    e.preventDefault();
                    var dataItem = this.dataItem($(e.target).closest("tr"));
                    if (confirm('Bạn có muốn xóa Playernày?')) {
                        // var dataSource = $("#team_list" + numbTab).data("kendoGrid").dataSource;
                        // dataSource.remove(dataItem);
                        // dataSource.sync();
                        // sumThanhTien(numbTab);
                    }
                }
            }]
        }]
        , remove: function (e) {
            //Do your logic here before delete the record.
        }
    }).data("kendoGrid");

    // var grid = $("#team_list" + numbTab).data("kendoGrid");
    // grid.hideColumn("SOLONHAP");
    // grid.hideColumn("HANSUDUNG");
}
