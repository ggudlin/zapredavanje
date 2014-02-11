$(document).ready(function () {

    $('form').submit(function (e) { e.preventDefault(); return false; });

    $("#nekidiv").html("Partneri").addClass("btn btn-default ");

    $.backstretch(["pic/2.jpg"]);

    $("#nekidiv,.partneriicon").on('click', function () {
        //$("#lista").toggle('slow');
        DajZadjnePartnere();
    });



    function DajZadjnePartnere() {
        var formatiraniHTML = "";

        $.ajax({
            url: "http://www.spin.hr/ng/servicezapredavajne/",
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 10000,
            success: function (data, status) {
                $.each(data, function (i, item) {
                    formatiraniHTML = formatiraniHTML + '<div class="col-md-4"><div class="mojitem" data-id="' + item.partneriid + '" >' +
                        item.naziv + '<br/>' +
                        item.mjestanaziv + '<br/>' +
                        item.adresa +
                        '</div></div>';
                });
                $("#lista").html(formatiraniHTML);
                $(".mojitem").on('click', function () { PartneriDet($(this).attr("data-id")); });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });
    }



    function PartneriDet(id) {
        alert(id);
    }



});


