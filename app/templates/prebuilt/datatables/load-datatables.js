define(['dataTables.bootstrap'], function (datatables) {
    return {
        loadDataTables: function() {
            // Add commas to numbers > 1000
            // Can be deleted if not used
            function numberFormat(nStr){
                nStr += '';
                x = nStr.split('.');
                x1 = x[0];
                x2 = x.length > 1 ? '.' + x[1] : '';
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(x1))
                  x1 = x1.replace(rgx, '$1' + ',' + '$2');
                return x1 + x2;
            }

            // DataTables formatting options
            // More options: http://datatables.net/plug-ins/sorting
            // Can be deleted if not used

            // Formatted numbers: i.e. numbers with commas
            jQuery.extend( jQuery.fn.dataTableExt.oSort, {
                "formatted-num-pre": function ( a ) {
                    a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
                    return parseFloat( a );
                },
                "formatted-num-asc": function ( a, b ) {
                    return a - b;
                },
                "formatted-num-desc": function ( a, b ) {
                    return b - a;
                }
            });
            // Currency
            jQuery.extend( jQuery.fn.dataTableExt.oSort, {
                "currency-pre": function ( a ) {
                    a = (a==="-") ? 0 : a.replace( /[^\d\-\.]/g, "" );
                    return parseFloat( a );
                },
                
                "currency-asc": function ( a, b ) {
                    return a - b;
                },
                
                "currency-desc": function ( a, b ) {
                    return b - a;
                }
            });

            // Load dataTables
            $('#content-table').dataTable({
                "sPaginationType": "bootstrap",
                "iDisplayLength": 25,
                "oLanguage": {
                    "sLengthMenu": "_MENU_ records per page"
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
        },
        // Mobile styles for DataTables
        mobileDatatablesOptions: function() {
            // Length options
            $('#description-box').append('<p><strong>Use the options below to search through the table.</strong></p>');
            $('.dataTables_length option').prepend('Records per page: ');
            $('.dataTables_length label').css({
                'font-size': '0px',
                'color': '#FFF'
            })

            // Search options
            $('.dataTables_filter label').css({
                'font-size': '0px',
                'color': '#FFF'
            })
            $('.dataTables_filter input').attr('placeholder', 'Search the table...');
        }
    // Close return
    }
});