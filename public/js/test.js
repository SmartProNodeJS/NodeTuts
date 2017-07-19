var numbCurrentTab;
var arrayTab = [1];
var arrayClone = [1];
var dts_duoc;
var arrayAddKH = [];
var ErrorIns;
var CurrentNumbTab;

//arrayAddKH.push('txtTenKH', 'txtDiaChi');
arrayAddKH.push('txtTenKHIns');

$(function () {
    $('#dateNgaySinhIns').val("01/01/1971");
    Get_Menu_TTP_Ins();

    addBtnAdd();
    onLoadGridCTX(1);

    dts_duoc = {
        transport: {
            read: {
                contentType: "application/json; charset=utf-8",
                url: "/ExportMedicine/GET_DS_DUOC_TON_KHO",
                type: 'POST',
                dataType: "json",
                global: false
            }
        }
    };

    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    curDate = (day < 10 ? '0' : '') + day + '/' +
        (month < 10 ? '0' : '') + month + '/' +
        d.getFullYear();

    $('.selectpicker').selectpicker({
        size: 10,
        liveSearchStyle: 'contains'
    });

    $('.date-picker').datepicker({
        autoclose: true,
        todayHighlight: true
    }).next().on(ace.click_event, function () {
        $(this).prev().focus();
    });

    loadKhachHang();
    loadKhoXuat();
    loadTrangThai();
    loadCoSo();
    loadLoaiPX();
    LoadDuoc(1);
    loadNguoiXuat();
});

function addTab(e) {
    var nextTab;

    if (($('#tabXuatKho li').size() == 1 && arrayTab.length <= 1) || ($('#tabXuatKho li').size() == 1 && arrayTab.length > 1)) {
        nextTab = 1;
        arrayTab = [1];
    }
    else {
        nextTab = Math.max.apply(Math, arrayClone) + 1;
    }

    if ($('#tabXuatKho li').size() <= 10) {
        // Xóa active tab hiện tại
        $('#tabXuatKho > li').attr('class', '');

        // Xóa active content-tab hiện tại
        $('.tab-content:first > div').attr('class', 'tab-pane');

        var content = '<div class="row"> <div class="col-sm-8"> <div class="row"> <div class="col-sm-8"> <input id="cmbDuocPham' + nextTab + '" name="cmbDuocPham' + nextTab + '" style="width: 100%;"/> </div><div class="col-sm-2 form-inline"> SL:&nbsp; <input type="number" id="txtSoLuong' + nextTab + '" name="txtSoLuong' + nextTab + '" class="form-control" value="0" min="0" style="height:30px;text-align:right;width:70px;"> </div><div class="col-sm-2"> <button class="btn btn-xs btn-success" style="width:100%;" href="#" id="toolbar-add_ct' + nextTab + '" name="toolbar-add_ct' + nextTab + '" onclick="addCTD(' + nextTab + ')"><i class="ace-icon fa fa-pencil align-top bigger-110"></i> THÊM</button> </div></div><div class="space space-6"></div><div id="grid_DS_CTX_ChiTiet' + nextTab + '"></div></div><div class="col-sm-4"> <div class="tabbable tabs-below"> <div class="tab-content" style="background-color:#d9edf7;"> <div id="thongtin' + nextTab + '" class="tab-pane active"> <table class="table table-borderless"> <tbody> <tr> <td style="text-align:right;vertical-align:middle;"> Số chứng từ </td><td> <input type="text" readonly="readonly" id="txtSoPX' + nextTab + '" name="txtSoPX' + nextTab + '" class="form-control" style="height:30px;"><input type="hidden" id="CTX_ID' + nextTab + '" name="CTX_ID' + nextTab + '" class="form-control" style="height:30px;"> </td></tr><tr> <td style="text-align:right;vertical-align:middle;"> Loại phiếu xuất </td><td> <select id="cmbLoaiPX' + nextTab + '" name="cmbLoaiPX' + nextTab + '" class="form-control" data-live-search="true"></select> </td></tr><tr> <td style="text-align:right;vertical-align:middle;"> Ngày xuất </td><td><div class="input-group"> <input type="text" id="dateNgayXuat' + nextTab + '" name="dateNgayXuat' + nextTab + '" class="form-control date-picker" style="height:30px;text-align:right;" data-date-format="dd/mm/yyyy" value="' + curDate + '"> <span class="input-group-addon"> <i class="fa fa-calendar bigger-110"></i> </span> </div></td></tr><tr> <td style="text-align:right;vertical-align:middle;"> Cơ sở </td><td> <select id="cmbCoSo' + nextTab + '" name="cmbCoSo' + nextTab + '" class="form-control" data-live-search="true"></select> </td></tr><tr> <td style="text-align:right;vertical-align:middle;"> Kho xuất </td><td> <select id="cmbKhoXuat' + nextTab + '" name="cmbKhoXuat' + nextTab + '" class="form-control" data-live-search="true"></select> </td></tr><tr> <td style="text-align:right;vertical-align:middle;"> Khách hàng </td><td> <select id="cmbKhachHang' + nextTab + '" name="cmbKhachHang' + nextTab + '" class="form-control" data-live-search="true"></select> </td></tr><tr> <td colspan="2" style="text-align:center;"> <button class="btn btn-sm btn-success" id="btnThemKH' + nextTab + '" name="btnThemKH' + nextTab + '" onclick="ShowAddCustomer(' + nextTab + ');"> <i class="fa fa-plus"></i> Thêm khách hàng </button> <button class="btn btn-sm btn-yellow" id="btnLichSu' + nextTab + '" name="btnLichSu' + nextTab + '" onclick="ShowHistory(' + nextTab + ');"> <i class="fa fa-shopping-cart"></i> Lịch sử mua thuốc </button> </td></tr></tbody> </table> </div><div id="morong' + nextTab + '" class="tab-pane"> <table class="table table-borderless"> <tbody> <tr> <td style="text-align:right;vertical-align:middle;"> Trạng thái </td><td> <select id="cmbTrangThai' + nextTab + '" name="cmbTrangThai' + nextTab + '" class="form-control" data-live-search="true"></select> </td></tr><tr> <td style="text-align:right;vertical-align:middle;"> Người xuất </td><td> <select id="cmbNguoiXuat' + nextTab + '" name="cmbNguoiXuat' + nextTab + '" class="selectpicker form-control" data-live-search="true"></select> </td></tr><tr> <td style="text-align:right;vertical-align:middle;"> Ghi chú </td><td> <input type="text" id="txtGhiChu' + nextTab + '" name="txtGhiChu' + nextTab + '" class="form-control" style="height:30px;"> </td></tr></tbody> </table> </div></div><ul class="nav nav-tabs" id="myTab2"> <li class="active"> <a data-toggle="tab" href="#thongtin' + nextTab + '" aria-expanded="true">Thông tin</a> </li><li class=""> <a data-toggle="tab" href="#morong' + nextTab + '" aria-expanded="false">Mở rộng</a> </li></ul> </div><div class="space space-6"></div><div style="text-align:center;"> <button class="btn btn-app btn-primary btn-sm radius-4" id="btnSavePX' + nextTab + '" name="btnSavePX' + nextTab + '" onclick="SavePX(' + nextTab + ')"> <i class="ace-icon fa fa-floppy-o bigger-160"></i> LƯU </button> <button class="btn btn-app btn-yellow btn-sm radius-4" id="btnInPX' + nextTab + '" name="btnInPX' + nextTab + '" disabled="disabled" onclick="InPhieuXuat(' + nextTab + ')"> <i class="ace-icon fa fa-print bigger-160"></i> IN PHIẾU </button> <a class="btn btn-app btn-pink btn-sm radius-4" href="/Warehouse/ExportDocument" target="_blank"> <i class="ace-icon fa fa-th-list bigger-160"></i> DS PHIẾU </a></div></div></div>';

        // Tạo tab mới
        $('#tabXuatKho li:last').before($('<li id="litab' + nextTab + '" class="active"><a href="#tabHoaDon' + nextTab + '" data-toggle="tab">Hóa đơn ' + nextTab + ' <i id="close' + nextTab + '"' + ' class="fa fa-times" onmouseover="onhover(this)" onmouseout="outhover(this)" onclick="CloseTab(' + nextTab + ')"></i></a></li>'));

        // Tạo nội dung cho tab mới
        $('<div class="tab-pane active" id="tabHoaDon' + nextTab + '">' + content + '</div>').appendTo('.tab-content:first');

        if (nextTab == 2) {
            cloneDanhMuc(nextTab, 1);
        }
        else if (nextTab == 1) {
            loadKhachHang();
            loadKhoXuat();
            loadTrangThai();
            loadCoSo();
            loadLoaiPX();
            loadNguoiXuat();
        }
        else {
            cloneDanhMuc(nextTab, arrayClone[Math.floor(Math.random() * arrayClone.length)]);
        }

        $('.date-picker').datepicker({
            autoclose: true,
            todayHighlight: true
        }).next().on(ace.click_event, function () {
            $(this).prev().focus();
        });
        onLoadGridCTX(nextTab);
        LoadDuoc(nextTab);
        arrayTab.push(nextTab);
        arrayClone.push(nextTab);
    }
    else {
        toastyNotification('THÔNG BÁO', 'Chỉ có thể mở tối đa 10 tab!', 'plain', 'error', 'top-right', false, 2500);
    }
}

function onhover(scope) {
    $('#' + scope.id).css({ "color": "#ff9999", "cursor": "pointer" });
}

function outhover(scope) {
    $('#' + scope.id).css({ "color": "", "cursor": "" });
}

Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function CloseTab(scope) {
    if (scope == Math.max.apply(Math, arrayTab)) {
        $('#litab' + scope).remove();
        $('#tabHoaDon' + scope).remove();
        arrayTab.remove(scope);
        $('#tabXuatKho > li').attr('class', '');
        $('.tab-content:first > div').attr('class', 'tab-pane');
        $('#tabXuatKho li:nth-last-child(2)').attr('class', 'active open');
        $('.tab-content:first > div:nth-last-child(1)').attr('class', 'tab-pane active');
    }
    else if ($('#tabXuatKho li:nth-last-child(3)').attr('class') == 'active' && $('.tab-content:first div:nth-last-child(2)').attr('class') == 'tab-pane active') {
        $('#tabXuatKho li').attr('class', '');
        $('.tab-content:first > div').attr('class', 'tab-pane');
        $('#tabXuatKho li:nth-last-child(2)').attr('class', 'active open');
        $('.tab-content:first > div:nth-last-child(1)').attr('class', 'tab-pane active');
        $('#litab' + scope).remove();
        $('#tabHoaDon' + scope).remove();
    }
    else {
        $('#litab' + scope).remove();
        $('#tabHoaDon' + scope).remove();
    }

    arrayClone.remove(scope);
}

function addBtnAdd() {
    return $('<li><a href="#" id="btnAdd" onclick="addTab();"><i class="fa fa-plus"></i></a></li>').appendTo('#tabXuatKho');
}

function KendoEditNumber(container, options) {
    $('<input data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "{0:n0}",
            decimals: 0,
            min: 0,
            spinners: false
        });
}

function gridCTX_ChiTiet_edit(e) {
    var lCellIdx = -1, loInput;
    try {
        loInput = e.container.find("input");
        if (loInput) {
            setTimeout(function () {
                loInput.select();
            }, 25);
            if (e.container.length > 0)
                lCellIdx = e.container[0].cellIndex;
            if (lCellIdx > 1) {
                if (lCellIdx == 4)
                    loInput.attr('maxlength', '5');
                else
                    loInput.attr('maxlength', '12');
                loInput.blur(function () {
                    ChangeTienCTN(e, lCellIdx)
                });
            }
        }
        //$('#msg').html('col = ' + lcell + ', row = ' + $("#grid").data("kendoGrid").select()[0].rowIndex); //selectable: "row",
    } catch (ex) {
        alert(ex.message);
    }
}

function GetDataSourceGridKendo(psId) {
    var lDataSource = null;
    try {
        psId = ConcatSharp(psId);
        lDataSource = $(psId).data("kendoGrid").dataSource;
    } catch (ex) {
        alert('{GetDataSourceGridKendo} ID = ' + psId + ', Lỗi: ' + ex.message);
    }
    return lDataSource;
}

function KendoCboEditor(container, options, pdataValueField, pdataTextField, url) {
    $('<input type="text" name="' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({//kendoDropDownList
            autoBind: false,
            minLength: 1,
            dataValueField: pdataValueField,
            dataTextField: pdataTextField,
            dataSource: {
                transport: {
                    read: {
                        url: url,
                        contentType: "application/json",
                        dataType: "json",
                        global: false
                    }
                },
                error: function (e) {// handle error
                    alert('{KendoCboEditor} Lỗi: ' + e.xhr.responseText + ', ' + e.errors + ', Status: ' + e.status + '; Error message: ' + e.errorThrown);
                }
            }
        });
}

function onLoadGridCTX(numbTab) {
    $("#grid_DS_CTX_ChiTiet" + numbTab).kendoGrid({
        dataSource: null,
        noRecords: true,
        selectable: "row",
        editable: {
            confirmation: false
        },
        autoSync: true,
        resizable: true,
        navigatable: true,//tab key in cell
        //edit: gridCTX_ChiTiet_edit,
        toolbar: [{ name: 'thanhtien', template: '#= Toolbar_custom(' + numbTab + ')#' }],
        messages: {
            noRecords: "Rỗng!"
        },
        edit: changeTien,
        sortable: true,
        scrollable: true,
        columns: [
        {
            field: "TENDUOCDAYDU",
            title: "Dược phẩm", width: 100, attributes: { class: "canhgiua" },
            headerAttributes: {
                style: "text-align: center; vertical-align: middle; font-weight:bold;",
            },
            width: 200,
            editor: function (container, options) {
                container.text(options.model[options.field]);
            }
        },
        {
            field: "TENDONVITINH",
            title: "Đơn vị tính", width: 120, attributes: { class: "canhgiua" },
            headerAttributes: {
                style: "text-align: center; vertical-align: middle; font-weight:bold;",
            },
            width: 100,
            editor: function (container, options) {
                container.text(options.model[options.field]);
            }
        },
        {
            field: "SOLUONG",
            title: "Số lượng",
            width: 60, format: "{0:#.##}",
            attributes: { class: "canhphai" },
            headerAttributes: {
                style: "text-align: center; vertical-align: middle; font-weight:bold;",
            }
        },
        {
            field: "DONGIABAN_CHUOI",
            title: "Đơn giá",
            width: 150,
            format: "{0:#,##}",
            attributes: { class: "canhphai" },
            headerAttributes: {
                style: "text-align: center; vertical-align: middle; font-weight:bold;",
            },
            editor: numberEditor
            //,
            //editor: function (container, options) {
            //    container.text(options.model[options.field]);
            //}
        },
        {
            field: "THANHTIENBAN",
            title: "Thành tiền",
            width: 150, format: "{0:#,##}",
            attributes: { class: "canhphai" },
            headerAttributes: {
                style: "text-align: center; vertical-align: middle; font-weight:bold;",
            },
            editor: function (container, options) {
                container.text(options.model[options.field]);
            }
        },
        {
            field: "SOLONHAP",
            title: "Số lô hàng hóa",
            width: 200,
            attributes: { class: "canhgiua" },
            headerAttributes: {
                style: "text-align: center; vertical-align: middle; font-weight:bold;",
            },
            editor: function (container, options) {
                container.text(options.model[options.field]);
            }
        },
        {
            field: "HANSUDUNG",
            title: "Hạn sử dụng",
            width: 120, format: "{0:dd/MM/yyyy}",
            attributes: { class: "canhgiua" },
            headerAttributes: {
                style: "text-align: center; vertical-align: middle; font-weight:bold;",
            },
            editor: function (container, options) {
                container.text(options.model[options.field]);
            }
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
                    if (confirm('Bạn có muốn xóa Dược phẩm này?')) {
                        var dataSource = $("#grid_DS_CTX_ChiTiet" + numbTab).data("kendoGrid").dataSource;
                        dataSource.remove(dataItem);
                        dataSource.sync();
                        sumThanhTien(numbTab);
                    }
                }
            }]
        }]
        , remove: function (e) {
            //Do your logic here before delete the record.
        }
    }).data("kendoGrid");

    var grid = $("#grid_DS_CTX_ChiTiet" + numbTab).data("kendoGrid");
    grid.hideColumn("SOLONHAP");
    grid.hideColumn("HANSUDUNG");
}

function changeTien(e) {
    var gridName = e.sender._cellId.replace('_active_cell', '');
    var lCellIdx = -1, loInput;
    try {
        loInput = e.container.find("input");
        if (loInput) {
            setTimeout(function () {
                loInput.select();
            }, 25);
            if (e.container.length > 0)
                lCellIdx = e.container[0].cellIndex;
            if (lCellIdx > 1) {
                loInput.blur(function () {
                    changeThanhTien(e, lCellIdx, gridName);
                });
            }
        }
        //$('#msg').html('col = ' + lcell + ', row = ' + $("#grid").data("kendoGrid").select()[0].rowIndex); //selectable: "row",
    } catch (ex) {
        //alert('{gridCTN_ChiTiet_edit} Lỗi: ' + ex.message);
    }
}

function changeThanhTien(e, cellIndex, gridName) {
    lSoLuong = parseFloat(e.model.SOLUONG);
    if (cellIndex == 2) {
        if (lSoLuong > parseFloat(e.model.SOLUONGTON)) {
            var lDonGia = e.model.DONGIABAN_CHUOI.toString().indexOf(',') >= 0 ? parseFloat(e.model.DONGIABAN_CHUOI.replace(',', '')) : parseFloat(e.model.DONGIABAN_CHUOI);
            toastyNotification('THÔNG BÁO', 'Số lượng bán phải nhỏ hơn số lượng tồn!', 'plain', 'error', 'top-right', false, 2500);
            $('#' + gridName).data('kendoGrid').refresh();
            lColIdx_SoLuong = KendoGetColumnIndex(gridName, 'SOLUONG');
            $('#' + gridName).find("tr[data-uid='" + e.model.uid + "'] td:eq(" + lColIdx_SoLuong + ")").text(formatNumber(e.model.SOLUONGTON));
            e.model.THANHTIENBAN = parseFloat(e.model.SOLUONGTON) * lDonGia;//Chưa có Vat
            lColIdx = KendoGetColumnIndex(gridName, 'THANHTIENBAN');
            $('#' + gridName).find("tr[data-uid='" + e.model.uid + "'] td:eq(" + lColIdx + ")").text(formatNumber(e.model.THANHTIENBAN));
            sumThanhTien(gridName.replace('grid_DS_CTX_ChiTiet', ''));
        }
        else {
            var lDonGia = e.model.DONGIABAN_CHUOI.toString().indexOf(',') >= 0 ? parseFloat(e.model.DONGIABAN_CHUOI.replace(',', '')) : parseFloat(e.model.DONGIABAN_CHUOI);
            e.model.THANHTIENBAN = lSoLuong * lDonGia;//Chưa có Vat
            lColIdx = KendoGetColumnIndex(gridName, 'THANHTIENBAN');
            $('#' + gridName).find("tr[data-uid='" + e.model.uid + "'] td:eq(" + lColIdx + ")").text(formatNumber(e.model.THANHTIENBAN));
            sumThanhTien(gridName.replace('grid_DS_CTX_ChiTiet', ''));
        }
    }
    else {
        var lDonGia = e.model.DONGIABAN_CHUOI.toString().indexOf(',') >= 0 ? parseFloat(e.model.DONGIABAN_CHUOI.replace(',', '')) : parseFloat(e.model.DONGIABAN_CHUOI);
        e.model.THANHTIENBAN = lSoLuong * lDonGia;//Chưa có Vat
        lColIdx = KendoGetColumnIndex(gridName, 'THANHTIENBAN');
        $('#' + gridName).find("tr[data-uid='" + e.model.uid + "'] td:eq(" + lColIdx + ")").text(formatNumber(e.model.THANHTIENBAN));
        sumThanhTien(gridName.replace('grid_DS_CTX_ChiTiet', ''));
    }
}

function LoadDuoc(numbTab) {
    $("#cmbDuocPham" + numbTab).kendoDropDownList({
        filter: "contains",
        dataTextField: "TENDUOCDAYDU",
        dataValueField: "DUOC_ID",
        footerTemplate: 'Tổng cộng: #: instance.dataSource.total() # dược phẩm.',
        valueTemplate: '<span>#:data.TENDUOCDAYDU# | ĐVT: #:data.DONVITINH# | Số tồn: #:data.SOLUONG# | Đơn giá: #:data.DONGIABAN_CHUOI#</span>',
        //template: '<span class="k-state-default" style="background-image: url(\'../..#:data.HINHANH#\')"></span><h4>#: data.TENDUOCDAYDU #</h4><span>ĐVT: #: data.DONVITINH #</span><br/><span>Số lượng tồn: #: data.SOLUONG #</span><br/><span>Đơn giá: #: data.DONGIABAN_CHUOI #</span>',
        template: '<span class="k-state-default" style="background-image: url(\'../..#:data.HINHANH#\')"></span>' +
                    '<span class="k-state-default"><h3>#: data.TENDUOCDAYDU #</h3>ĐVT: #: data.DONVITINH #</br>Số lượng tồn: #: data.SOLUONG #</br>Đơn giá: #: data.DONGIABAN_CHUOI #</span>',
        dataSource: dts_duoc,
        height: 400
    });
}

function addCTD(numbTab) {
    var grid_data = $("#grid_DS_CTX_ChiTiet" + numbTab).data("kendoGrid").dataSource;
    var dataString = GetSelectItemDropdownKendo('cmbDuocPham' + numbTab);

    var DUOC_ID = dataString.DUOC_ID;
    var SOLUONGTON = dataString.SOLUONG;
    var DONVITINH_ID = dataString.DONVITINH_ID;
    var DONVITINH = dataString.DONVITINH;
    var DONGIABAN = dataString.DONGIABAN;
    var DONGIABAN_CHUOI = dataString.DONGIABAN_CHUOI;
    var SOLONHAP_ID = dataString.SOLONHAP_ID;
    var SOLONHAP = dataString.SOLONHAP;
    var HANSUDUNG = dataString.HANSUDUNG;
    var SOLUONG = $('#txtSoLuong' + numbTab).val();
    var TENDUOCDAYDU = dataString.TENDUOCDAYDU;

    if ($('#txtSoLuong' + numbTab).val() == 0 || $('#txtSoLuong' + numbTab).val() == '' || $('#txtSoLuong' + numbTab).length == 0) {
        toastyNotification('THÔNG BÁO', 'Vui lòng nhập Số lượng bán!', 'plain', 'error', 'top-right', false, 2500);
    }
    else if (parseInt($('#txtSoLuong' + numbTab).val()) > parseInt(SOLUONGTON)) {
        toastyNotification('THÔNG BÁO', 'Số lượng bán phải nhỏ hơn Số lượng tồn!', 'plain', 'error', 'top-right', false, 2500);
    }
    else {
        var data = $("#grid_DS_CTX_ChiTiet" + numbTab).data("kendoGrid").dataSource.data();

        for (item in data) {
            if (data[item].DUOC_ID == DUOC_ID) {
                data[item].SOLUONG = parseInt($('#txtSoLuong' + numbTab).val());
                data[item].THANHTIENBAN = parseFloat($('#txtSoLuong' + numbTab).val()) * parseFloat(data[item].DONGIABAN);
                $('#grid_DS_CTX_ChiTiet' + numbTab).data('kendoGrid').refresh();
                sumThanhTien(numbTab);
                return false;
            }
        }

        var THANHTIEN = SOLUONG * DONGIABAN;
        grid_data.add({ DUOC_ID: DUOC_ID, TENDUOCDAYDU: TENDUOCDAYDU, DONVITINH_ID: DONVITINH_ID, TENDONVITINH: DONVITINH, DONGIABAN: DONGIABAN, DONGIABAN_CHUOI: DONGIABAN_CHUOI, SOLONHAP_ID: SOLONHAP_ID, SOLONHAP: SOLONHAP, HANSUDUNG: HANSUDUNG, THANHTIENBAN: THANHTIEN, SOLUONG: SOLUONG, SOLUONGTON: SOLUONGTON });
        sumThanhTien(numbTab);
    }
}

function sumThanhTien(numbTab) {
    var sumTT = 0;
    var data = $("#grid_DS_CTX_ChiTiet" + numbTab).data("kendoGrid").dataSource.data();

    for (i = 0; i < data.length; i++) {
        var THANHTIENBAN_ = parseFloat(data[i].THANHTIENBAN);
        if (THANHTIENBAN_ == null) {
            THANHTIENBAN_ = 0;
        }
        sumTT += THANHTIENBAN_;
    }
    $('#txtTongTien' + numbTab).text(formatNumber(sumTT) + ' VNĐ');
}

function Toolbar_custom(numbTab) {
    return 'Tổng tiền: <label id="txtTongTien' + numbTab + '"></label>';
};

function loadKhachHang() {
    $.getJSON("/ExportMedicine/GET_DS_KHACHHANG")
    .done(function (data) {
        $('#cmbKhachHang1').empty();
        $.each(data, function (key, item) {
            // Add a list item for the product.
            $("<option value=" + item.KHACHHANG_ID + '#' + item.KHACHHANG_CODE + ">" + item.TEN_KHACHHANG + "</option>").appendTo($('#cmbKhachHang1'));
        });
        $('#cmbKhachHang1').selectpicker('refresh');
    });
}

function loadKhoXuat() {
    $.getJSON("/ExportMedicine/GET_KHOXUAT_HIENTAI")
    .done(function (data) {
        $('#cmbKhoXuat1').empty();
        $.each(data, function (key, item) {
            // Add a list item for the product.
            $("<option value=" + item.WAREHOUSE_ID + "|" + item.WAREHOUSE_CODE + ">" + item.WAREHOUSE_NAME + "</option>").appendTo($('#cmbKhoXuat1'));
        });
        $('#cmbKhoXuat1').selectpicker('refresh');
    });
}

function loadTrangThai() {
    $.getJSON("/ExportMedicine/GET_DS_TRANGTHAI")
    .done(function (data) {
        $('#cmbTrangThai1').empty();
        $.each(data, function (key, item) {
            // Add a list item for the product.
            $("<option value=" + item.TRANGTHAICHUNGTU_ID + "|" + item.TRANGTHAICHUNGTU_CODE + ">" + item.TRANGTHAICHUNGTU_NAME + "</option>").appendTo($('#cmbTrangThai1'));
        });
        $('#cmbTrangThai1').selectpicker('refresh');
    });
}

function loadCoSo() {
    $.getJSON("/ExportMedicine/GET_COSO_HIENTAI")
    .done(function (data) {
        $('#cmbCoSo1').empty();
        $.each(data, function (key, item) {
            // Add a list item for the product.
            $("<option value=" + item.DEPARTMENT_ID + ">" + item.DEPARTMENT_NAME + "</option>").appendTo($('#cmbCoSo1'));
        });
        $('#cmbCoSo1').selectpicker('refresh');
    });
}

function loadNguoiXuat() {
    $.getJSON("/ExportMedicine/GET_NGUOIXUAT_HIENTAI")
    .done(function (data) {
        $('#cmbNguoiXuat1').empty();
        $.each(data, function (key, item) {
            // Add a list item for the product.
            $("<option value=" + item.NHANVIEN_ID + "|" + item.MANHANVIEN + ">" + item.HOTEN + "</option>").appendTo($('#cmbNguoiXuat1'));
        });
        $('#cmbNguoiXuat1').selectpicker('refresh');
    });
}

function loadLoaiPX() {
    $.getJSON("/ExportMedicine/GET_DS_LOAIPX")
    .done(function (data) {
        $('#cmbLoaiPX1').empty();
        $.each(data, function (key, item) {
            // Add a list item for the product.
            $("<option value=" + item.MUCDICHCHUNGTU_ID + "|" + item.MAMUCDICHCHUNGTU + ">" + item.TENMUCDICHCHUNGTU + "</option>").appendTo($('#cmbLoaiPX1'));
        });
        $('#cmbLoaiPX1').selectpicker('refresh');
    });
}

function SavePX(numbTab) {
    var data = $("#grid_DS_CTX_ChiTiet" + numbTab).data("kendoGrid").dataSource.data();
    if (data.length == 0) {
        toastyNotification('THÔNG BÁO', 'Vui lòng nhập chi tiết chứng từ!', 'plain', 'error', 'top-right', false, 2500);
    }
    else {
        if ($('#dateNgayXuat' + numbTab).val().length == 0) {
            toastyNotification('THÔNG BÁO', 'Vui lòng nhập Ngày xuất!', 'plain', 'error', 'top-right', false, 2500);
        }
        else {
            var WAREHOUSE_TEMP = $('#cmbKhoXuat' + numbTab + ' option:selected').val().split('|');
            var TRANGTHAICHUNGTU_TEMP = $('#cmbTrangThai' + numbTab + ' option:selected').val().split('|');
            $.ajax({
                type: 'POST',
                url: '/ExportMedicine/Index?t=' + Math.random(),
                data: {
                    NGAYXUAT: $('#dateNgayXuat' + numbTab).val(),
                    GHICHU: $('#txtGhiChu' + numbTab).val(),
                    KHACHHANG_ID: $('#cmbKhachHang' + numbTab).val().split('#')[0],
                    KHACHHANG_NAME: $('#cmbKhachHang' + numbTab + ' option:selected').text(),
                    WAREHOUSE_ID: WAREHOUSE_TEMP[0],
                    WAREHOUSE_CODE: WAREHOUSE_TEMP[1],
                    WAREHOUSE_NAME: $('#cmbKhoXuat' + numbTab + ' option:selected').text(),
                    TRANGTHAICHUNGTU_ID: TRANGTHAICHUNGTU_TEMP[0],
                    TRANGTHAICHUNGTU_CODE: TRANGTHAICHUNGTU_TEMP[1],
                    MUCDICHCHUNGTU_ID: $('#cmbLoaiPX' + numbTab).val(),
                    DEPARTMENT_ID: $('#cmbCoSo' + numbTab).val(),
                    THANHTIEN: $('#txtTongTien' + numbTab).val().replace(' VNĐ', ''),
                    gData: JSON.stringify($("#grid_DS_CTX_ChiTiet" + numbTab).data("kendoGrid").dataSource.data()),
                    LOAI: 'INSERT'
                },
                //async: true,
                dataType: 'text',
                success: function (html) {
                    var temp = html.split('|');
                    if (temp[0] == "...") {
                        //ShowAlert("Thông báo", 'Tạo Phiếu xuất thành công!');
                        toastyNotification('THÔNG BÁO', 'Tạo phiếu xuất thành công!', 'plain', 'success', 'bottom-right', true, 2000);
                        $('#txtSoPX' + numbTab).val(temp[1]);
                        $('#CTX_ID' + numbTab).val(temp[2]);
                        $('#btnInPX' + numbTab).prop('disabled', false);
                        $('#toolbar-add_ct' + numbTab).prop('disabled', true);
                        $('#btnSavePX' + numbTab).prop('disabled', true);
                        $('#txtSoLuong' + numbTab).prop('disabled', true);
                        onReloadGrid(numbTab, temp[2]);
                    }
                    else {
                        toastyNotification('THÔNG BÁO', html, 'plain', 'error', 'top-right', false, 2500);
                    }

                },
            })
                .fail(
                    function (jqXHR, textStatus, err) {
                        toastyNotification('THÔNG BÁO', err, 'plain', 'error', 'bottom-right', false, 2500);
                    });
        }
    }
}

function InPhieuXuat(numbTab) {
    //Lam edit
    var lCtx_id, lsBustCache, url;
    try {
        //lCtx_id = CHUNGTUXUAT_ID;
        lCtx_id = $('#CTX_ID' + numbTab).val();
        if (!$.isNumeric(lCtx_id))
            lCtx_id = 0;
        if (lCtx_id <= 0) {
            $.toast({
                heading: 'THÔNG BÁO',
                text: 'Vui lòng chọn hóa đơn cần in!',
                showHideTransition: 'plain',
                icon: 'error',
                position: 'top-right',
                stack: false,
                hideAfter: 2000,
                showHideTransition: 'plain'
            });
            return false;
        }

        lsBustCache = "&bustcache=" + new Date().getTime();
        url = '/Warehouse/ExportMedicine/InPhieuXuat_Buid?Ctx_id=' + lCtx_id + lsBustCache;
        PopupCenter(url, 'PrintRpt', 600, 500);

    } catch (ex) {
        alert('{InPhieuXuat} ' + ex.message);
    }
    return false;
    //end edit

    //var lCtx_id, lsBustCache, url;
    //try {
    //    lCtx_id = $('#CTX_ID' + numbTab).val();
    //    if (!$.isNumeric(lCtx_id))
    //        lCtx_id = 0;
    //    if (lCtx_id <= 0) {
    //        $.toast({
    //            heading: 'THÔNG BÁO',
    //            text: 'Vui lòng chọn hóa đơn cần in!',
    //            showHideTransition: 'plain',
    //            icon: 'error',
    //            position: 'top-right',
    //            stack: false,
    //            hideAfter: 2000,
    //            showHideTransition: 'plain'
    //        });
    //        return false;
    //    }

    //    lsBustCache = "&bustcache=" + new Date().getTime();
    //    url = '/Warehouse/ExportMedicine/InPhieuXuat?Ctx_id=' + lCtx_id + lsBustCache;
    //    PopupCenter(url, 'PrintRpt', 600, 500);

    //} catch (ex) {
    //    alert('{InPhieuXuat} ' + ex.message);
    //}
    //return false;
}

function resetField() {
    $(':input')
    .removeAttr('checked')
    .removeAttr('selected')
    .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
    .val('');
    $('#txtTongTien1').text('');
    var data = $("#grid_DS_CTX_ChiTiet").data("kendoGrid").dataSource.read();
}

function cloneCombo(psType, numTab, cloneTab) {
    var lsIdSource, lsIdDes;
    try {
        lsIdSource = '#' + psType + cloneTab;
        lsIdDes = '#' + psType + numTab;
        $(lsIdDes).selectpicker({
            size: 10,
            liveSearchStyle: 'contains'
        });
        $(lsIdDes).empty();
        $(lsIdSource + " option").each(function () {
            // Add a list item for the combo.
            $("<option value='" + $(this).val() + "'>" + $(this).text() + "</option>").appendTo($(lsIdDes));
        });
        $(lsIdDes).selectpicker('refresh');
    } catch (ex) {
        alert('{cloneCombo} ' + ex.message);
    }
}

function cloneDanhMuc(numTab, cloneTab) {
    cloneCombo('cmbKhachHang', numTab, cloneTab);
    cloneCombo('cmbKhoXuat', numTab, cloneTab);
    cloneCombo('cmbTrangThai', numTab, cloneTab);
    cloneCombo('cmbCoSo', numTab, cloneTab);
    cloneCombo('cmbLoaiPX', numTab, cloneTab);
    cloneCombo('cmbNguoiXuat', numTab, cloneTab);
}

function onReloadGrid(numbTab, PX_ID) {
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                contentType: "application/json; charset=utf-8",
                url: "/ExportMedicine/GET_CTPX_BY_ID/" + PX_ID,
                type: 'GET',
                dataType: "json"
            }
        },
        pageSize: 100,
        schema: {
            model: {
                id: "DUOC_ID",
                fields: {
                    DUOC_ID: { type: "number", editable: false, nullable: true },
                    MADUOC: { type: "string", editable: false, nullable: true },
                    TENDUOCDAYDU: { type: "string", editable: false, nullable: true },
                    DONVITINH_ID: { type: "number", editable: false, nullable: true },
                    TENDONVITINH: { type: "string", editable: false, nullable: true },
                    SOLUONG: { type: "number", editable: false, nullable: true, format: "{0:#.##}" },
                    DONGIABAN: { type: "number", editable: false, nullable: true },
                    DONGIABAN_CHUOI: { type: "number", editable: false, nullable: true },
                    SOLONHAP: { type: "string", editable: false, nullable: true },
                    HANSUDUNG: { type: "string", editable: false, nullable: true },
                    THANHTIENBAN: { type: "number", editable: false, nullable: true }
                }
            }
        }
    });

    var grid = $("#grid_DS_CTX_ChiTiet" + numbTab).data("kendoGrid");
    grid.setDataSource(dataSource);

    grid.showColumn("SOLONHAP");
    grid.showColumn("HANSUDUNG");
    grid.hideColumn("del");
}

function ShowAddCustomer(numbTab) {
    //Lam edit
    Get_Menu_TTP_Ins();
    Get_Menu_QH_InsALL();
    $('#cbbTTPKHIns').on('changed.bs.select', function (e) {
        e.preventDefault();
        Get_Menu_QH_InsALL();
    });
    $('#cbbQHKHIns').on('changed.bs.select', function (e) {
        e.preventDefault();
        Get_Menu_PX_Ins();
    });
    //end edit

    HideError(arrayAddKH);
    $('#pvAddCustomer').appendTo("body").modal('show');
    CurrentNumbTab = numbTab;
}

function AddCustomer() {
    ShowHideError(arrayAddKH);
    ErrorIns = ErrorBool(arrayAddKH);
    //lam edit
    if (ErrorIns == true) {
        $.ajax({
            type: 'POST',
            url: '/ExportMedicine/AddCustomer',
            data: {
                TEN_KHACHHANG: $('#txtTenKHIns').val(),
                NGAYSINH: $('#dateNgaySinhIns').val(),
                DIEN_THOAI: $('#txtSDTKHIns').val(),
                DIEN_THOAI_LH: $('#txtSDTLHKHIns').val(),
                SONHA: $('#txtSoNhaKHIns').val(),
                //HOATDONG: $('#chkTrangThaiKHIns').is(":checked") ? 'True' : 'False',
                HOATDONG: 'true',
                TINHTHANH_CODE: $('#cbbTTPKHIns').val(),
                QUANHUYEN_CODE: $('#cbbQHKHIns').val(),
                PHUONGXA_CODE: $('#cbbPXKHIns').val(),

            },
            //async: true,
            dataType: 'text',
            success: function (html) {
                var khachhang_temp = html.split('|');
                if (khachhang_temp[0] == "...") {
                    Get_Menu_TTP_Ins();
                    Get_Menu_QH_InsALL();
                    reloadKhachHang(CurrentNumbTab, khachhang_temp[1]);
                    $('#txtTenKHIns').val("");
                    $('#txtSDTKHIns').val("");
                    $('#txtSDTLHKHIns').val("");
                    $('#txtSoNhaKHIns').val("");
                    $('#cbbTTPKHIns').val(0);
                    $('#cbbQHKHIns').val(0);
                    $('#cbbPXKHIns').val(0);
                    $('#dateNgaySinhIns').val("01/01/1971");
                    toastyNotification('THÔNG BÁO', 'Thêm khách hàng thành công!', 'plain', 'success', 'bottom-right', true, 2000);
                }
                else {
                    toastyNotification('THÔNG BÁO', "Thêm khách hàng thất bại!", 'plain', 'error', 'top-right', true, 2000);
                }
            }
        })
        .fail(
            function (jqXHR, textStatus, err) {
                toastyNotification('THÔNG BÁO', err, 'plain', 'error', 'top-right', true, 2000);
            });
    }
}
////end edit
//    if (ErrorIns == true) {
//        $.ajax({
//            type: 'POST',
//            url: '/ExportMedicine/AddCustomer',
//            data: {
//                TEN_KHACHHANG: $('#txtTenKH').val(),
//                DIEN_THOAI: $('#txtDienThoai').val(),
//                DIA_CHI: $('#txtDiaChi').val()
//            },
//            //async: true,
//            dataType: 'text',
//            success: function (html) {
//                var khachhang_temp = html.split('|');
//                if (khachhang_temp[0] == "...") {
//                    reloadKhachHang(CurrentNumbTab, khachhang_temp[1]);
//                    toastyNotification('THÔNG BÁO', 'Thêm khách hàng thành công!', 'plain', 'success', 'bottom-right', true, 2000);
//                }
//                else {
//                    toastyNotification('THÔNG BÁO', "Thêm khách hàng thất bại!", 'plain', 'error', 'top-right', true, 2000);
//                }
//            }
//        })
//        .fail(
//            function (jqXHR, textStatus, err) {
//                toastyNotification('THÔNG BÁO', err, 'plain', 'error', 'top-right', true, 2000);
//            });
//    }
//}

function reloadKhachHang(numbTab, KHACHHANG_ID) {
    $('.selectpicker').selectpicker({
        size: 5,
        liveSearchStyle: 'contains'
    });

    $.getJSON("/ExportMedicine/GET_DS_KHACHHANG")
    .done(function (data) {
        $('#cmbKhachHang' + numbTab).empty();
        $.each(data, function (key, item) {
            // Add a list item for the product.
            $("<option value=" + item.KHACHHANG_ID + '#' + item.KHACHHANG_CODE + ">" + item.TEN_KHACHHANG + "</option>").appendTo($('#cmbKhachHang' + numbTab));
            //$("<option value=" + item.KHACHHANG_ID + ">" + item.TEN_KHACHHANG + "</option>").appendTo($('#cmbKhachHang' + numbTab));
        });
        $('select[name=cmbKhachHang' + numbTab + ']').val(KHACHHANG_ID);
        $('#cmbKhachHang' + numbTab).selectpicker('refresh');
    });
}

function numberEditor(container, options) {
    $('<input data-bind="value:' + options.field + '" required/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "{0:n0}",
            decimals: 0,
            min: 0,
            spinners: false
        });
}

String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
}

function ShowHistory(numbTab) {
    var value_temp = $('#cmbKhachHang' + numbTab).val();
    var value = value_temp.split('#')[1].replaceAll('.', '_');
    var text = $('#cmbKhachHang' + numbTab + ' option:selected').text();
    var history = window.open('/Report/SaleHistory?v=' + value + '&t=' + text, '_blank');
    history.focus();
}

function Get_Menu_TTP_Ins() {
    $('#cbbTTPKHIns').empty();
    $("<option value=" + 0 + ">" + "Vui lòng chọn." + " </option>").appendTo($('#cbbTTPKHIns'));
    $.getJSON("/DM_KhachHang/GET_DS_TTP")
    .done(function (data) {

        $.each(data, function (key, item) {
            // Add a list item for the product.
            $("<option value=" + item.PROVINCE_ID + ">" + item.PROVINCE_NAME + " </option>").appendTo($('#cbbTTPKHIns'));
        });
        $('#cbbTTPKHIns').selectpicker('refresh');
    });
}
function Get_Menu_QH_InsALL() {

    $('#cbbQHKHIns').empty();
    $("<option value=" + 0 + ">" + "Vui lòng chọn." + " </option>").appendTo($('#cbbQHKHIns'));
    $.getJSON("/DM_KhachHang/GET_DS_QH")
    .done(function (data) {

        $.each(data, function (key, item) {
            // Add a list item for the product.
            if ($('#cbbTTPKHIns').val() == null) {
                $("<option value=" + item.DISTRICT_ID + ">" + item.DISTRICT_NAME + " </option>").appendTo($('#cbbQHKHIns'));
            }
            else {
                if (item.PROVINCE_ID == $('#cbbTTPKHIns').val().trim()) {
                    $("<option value=" + item.DISTRICT_ID + ">" + item.DISTRICT_NAME + " </option>").appendTo($('#cbbQHKHIns'));
                }
            }


        });
        $('#cbbQHKHIns').selectpicker('refresh');
        Get_Menu_PX_Ins();
    });
}
function Get_Menu_PX_Ins() {
    $('#cbbPXKHIns').empty();
    $("<option value=" + 0 + ">" + "Vui lòng chọn." + " </option>").appendTo($('#cbbPXKHIns'));
    $.getJSON("/DM_KhachHang/GET_DS_PX/" + $('#cbbQHKHIns').val().trim())
    .done(function (data) {

        $.each(data, function (key, item) {
            // Add a list item for the product.
            if (item.DISTRICT_ID == $('#cbbQHKHIns').val().trim()) {
                $("<option value=" + item.WARD_ID + ">" + item.WARD_NAME + " </option>").appendTo($('#cbbPXKHIns'));
            }

        });
        $('#cbbPXKHIns').selectpicker('refresh');
    });
}

