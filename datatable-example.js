/**
 * 绘制服务器分页表格
 * @param {string} id 表格id
 * @param {Object} config 配置
 * @param {Array} url url
 * @param {Array} args 参数
 */
$.grid.createServerTable = function (seletor, config, url, args) {
    var curConfig = {
        displayLength: 10,
        columnDefs: [],
        order: [],
        destroy: true,
        filter: true,
        info: true,
        lengthChange: false,
        autoWidth: false,
        language: $.grid.zhCn,
        searchable: false,
        orderMulti: false,
        // used HTML5 `localStorage` to save table display information
        bStateSave: true,
        // 'two_button' | 'simple_numbers'
        paginationType: 'simple_numbers',
        // bProcessing: true,
        bServerSide: true,
        ajax: {
            url: url,
            type: 'post',
            data: args,
            // 服务端分页开启的时候， 下面的会报错。
            // dataSrc: function (res) {
            //     console.log(res);
            //     return res;
            // }
        }
    };

    if (config && typeof(config) === 'object') {
        for (var i in config) {
            curConfig[i] = config[i];
        }
    }

    $('#' + seletor).dataTable(curConfig);
};

/**
 * 绘制客户端分页表格
 * @param {string} seletor 表格id
 * @param {Object} config 配置
 * @param {Array} data 数据
 */
$.grid.createClientTable_v2 = function (seletor, config, data) {
    var curConfig = {
        displayLength: 10,
        columnDefs: [],
        order: [],
        destroy: true,
        filter: true,
        info: true,
        lengthChange: false,
        autoWidth: false,
        language: $.grid.zhCn,
        searchable: false,
        orderMulti: false,
        paginationType: 'simple_numbers'
    };

    if (config && typeof(config) === 'object') {
        for (var i in config) {
            curConfig[i] = config[i];
        }
    }

    if (data) {
        curConfig['data'] = data;
        $(seletor).dataTable(curConfig);
    }
    else {
        curConfig['data'] = [];
        $(seletor).dataTable(curConfig);
    }
};

$.grid.example = function () {


    var thArr = [
        {
            data: 'task_id'
        },
        {
            data: 'car_id'
        }
    ];
    var param = {
        tableName: 'tableName',
        other: ''
    };
    // 服务端分页

    // 服务端的返回的结果
    // 传过去的参数
    // 点击下一页，搜索，排序会发送请求
    // $_POST[''] 自带了一些基本信息如 页码，查询条件，排序条件
    // 返回的格式必须是，不可以用dataSrc格式化
    // {
    //     data: [],
    //     iTotalRecords: 10,
    //     iTotalDisplayRecords: 10
    // }
    var serveDataTable = $('#result').dataTable({
        ajax: {
            url: '/tableview/querynew',
            type: 'POST',
            // 传参
            data: param
        },
        'columns': thArr,
        'scrollX': 'true',
        'scrollY': '400px',
        'bAutoWidth': true,
        'bStateSave': false,
        'bScrollCollapse': true,
        'bLengthChange': false,
        'iDisplayLength': 10,
        'bServerSide': true,
        'searching': false,
        'sort': false,
        'processing': true,
        'language': $.grid.zhCn,
        'fnCreatedRow': function (nRow, aData, iDataIndex) {

            var tr = $(nRow);
            var td = tr.find('td');

            tr.attr('data-rowkey', aData.rowkey);

            for(var i = 0, len = td.length; i < len; i++) {
                var item = $(td[i]);
                var name = schema[i];
                item.attr('data-colname', name);
                var pos = 0;

                if (name.indexOf('.') != -1 || name === 'rowkey') {
                    item.attr('data-type', 'sys');
                }
                else {
                    item.attr('data-type', 'user');
                }
            }

        }
    });

    // 客户端分页

    var clientDataTable = $('#result').dataTable({
        ajax: {
            url: '/tableview/querynew',
            type: 'POST',
            // 传参
            data: param,
            dataSrc: function (rse) {
                // 返回格式
                // data: [
                //     {
                //         task_id: "1",
                //         car_id: 2
                //     },
                //     {
                //         task_id: "2",
                //         car_id: 3
                //     }
                // ]
                return res.data;
            },
            columns: [
                {
                    data: 'task_id'
                },
                {
                    data: 'car_id'
                }
            ]
        },
        'bServerSide': false
    });

}

$.grid.zhCn = {
    search: '',
    sLengthMenu: '_MENU_',
    sProcessing: '处理中...',
    sZeroRecords: '没有匹配结果',
    sInfo: '显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项',
    sInfoEmpty: '显示第 0 至 0 项结果，共 0 项',
    sInfoFiltered: '(由 _MAX_ 项结果过滤)',
    sInfoPostFix: '',
    sUrl: '',
    sEmptyTable: '暂无数据',
    sLoadingRecords: '载入中...',
    sInfoThousands: '',
    sSearch: '表格信息模糊搜索：',
    oPaginate: {
        sFirst: '首页',
        sPrevious: '上页',
        sNext: '下页',
        sLast: '末页'
    },
    oAria: {
        sSortAscending: '以升序排列此列',
        sSortDescending: '以降序排列此列'
    }
};