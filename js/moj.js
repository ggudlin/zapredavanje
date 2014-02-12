$(document).ready(function () {

    $('form').submit(function (e) { e.preventDefault(); return false; });

    $("#nekidiv").html("Partneri").addClass("btn btn-default ");

    $.backstretch(["pic/2.jpg"]);

    $("#nekidiv,.partneriicon").on('click', function () {
        //$("#lista").toggle('slow');
        DajZadjnePartnere();
    });

    PieChart();
    StackedColumn();
    //DajZadjnePartnere();

    $("#sectiongadgetdetail").hide();


    function DajZadjnePartnere() {
        var formatiraniHTML = "";
        var i = 0;
        $.ajax({
            url: "http://www.spin.hr/ng/servicezapredavajne/",
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 10000,
            success: function (data, status) {
                $.each(data, function (i, item) {

                    i = i + 1;

                    formatiraniHTML = formatiraniHTML + '<div class="col-md-4"><div class="mojitem clearfix" data-partneriid="' + item.partneriid + '" >'
                        + '<span class="col-xs-7  ">'
                        + item.naziv + '<br/>' 
                        + item.mjestanaziv + '<br/>' 
                        + item.adresa 
                        + '</span>'
                        + '<span class="col-xs-5">'
                        + '<h4>'
                        + item.vrijednostspdv
                        + 'kn</h4>'
                        + '</span>'
                        + '</div></div>';

                    if (i == 3) { formatiraniHTML = formatiraniHTML + '<div class="clearfix"></div>'; i = 0; }

                });
                $("#lista").html(formatiraniHTML);
                $(".mojitem").on('click', function () { PartneriDet($(this).attr("data-partneriid")); });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });
    }



    function PartneriDet(id) {
        alert(id);
    }



    function PieChart() {

        // Radialize the colors
        Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
            return {
                radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
                stops: [
		            [0, color],
		            [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        });

        // Build the chart
        $('#container1').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Browser market shares at a specific website, 2010'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function () {
                            return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['Firefox', 45.0],
                    ['IE', 26.8],
                    {
                        name: 'Chrome',
                        y: 12.8,
                        sliced: true,
                        selected: true
                    },
                    ['Safari', 8.5],
                    ['Opera', 6.2],
                    ['Others', 0.7]
                ]
            }]
        });
    }


    

    function StackedColumn() {
        $('#container2').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Stacked column chart'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -70,
                verticalAlign: 'top',
                y: 20,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: [{
                name: 'John',
                data: [5, 3, 4, 7, 2]
            }, {
                name: 'Jane',
                data: [2, 2, 3, 2, 1]
            }, {
                name: 'Joe',
                data: [3, 4, 4, 2, 5]
            }]
        });
    }




});


