define(['jquery.dataTables'], function (datatables) {
    return {
        loadDataTables: function() {
            // Load dataTables
            $('#content-table').dataTable({
                "iDisplayLength": 25,
                "oLanguage": {
                    "sLengthM,enu": "_MENU_ records per page"
                },
                "aaSorting": [[ 0, "asc" ]],
                "aoColumns": [
                   {
                        "sWidth": "30%"
                        // "sType": "formatted-num" 
                    },{
                        "sWidth": "23%"
                        // "sType": "formatted-num" 
                    },{
                        "sWidth": "23%"
                        // "sType": "formatted-num" 
                    },{
                        "sWidth": "23%"
                        // "sType": "formatted-num" 
                    }
                ]
            // Close dataTable load
            });
        // Close loadDataTables
        }
    // Close return
    }
});