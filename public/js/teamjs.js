$(function () {
    // $('.selectpicker').selectpicker({
    //     size: 10,
    //     liveSearchStyle: 'contains'
    // });

    //Get_List_Team();
    onLoadGridPlayer();

 
});

function Get_List_Team() {
    $('#AddTeam').empty();
    $("<option value=" + 0 + ">" + "Vui lòng chọn." + " </option>").appendTo($('#AddTeam'));
    $.getJSON("/team/GeT_List_Player" )
    .done(function (data) {  
        $.each(data, function (key, item) {
            // Add a list item for the product.
            $("<option value=" + item._id + ">" + item.first_name + " " + item.last_name + " </option>").appendTo($('#AddTeam'));
        });
        $('#AddTeam').selectpicker('refresh');
    });
}

function onLoadGridPlayer() {
    $("#team_list").kendoGrid({
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
        // toolbar: [{ name: 'thanhtien', template: '#= Toolbar_custom()#' }],
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
            //hidden:true,
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
                        // var dataSource = $("#team_list").data("kendoGrid").dataSource;
                        // dataSource.remove(dataItem);
                        // dataSource.sync();
                        // sumThanhTien();
                    }
                }
            }]
        }]
        , remove: function (e) {
            //Do your logic here before delete the record.
        }
    }).data("kendoGrid");

    // var grid = $("#team_list").data("kendoGrid");
    // grid.hideColumn("SOLONHAP");
    // grid.hideColumn("HANSUDUNG");
}
function AddTeamToList(){
    var value = $("#AddTeam").val();
    var text = $("option:selected",$("#AddTeam")).text(); 
    var grid_data = $("#team_list").data("kendoGrid").dataSource;
    grid_data.add({ _id: value, HOTEN: text});
}