$(document).ready(function () {
    /*$('.join-now-mobile-button').click(function (e) {
      e.preventDefault();
      $('html, body').animate({scrollTop: $(".join-now-wrapper").offset().top}, 800);
    });
*/

  $('a.job-list-apply').on('click', function(){
    var ref_nid = $(this).next("a").attr('data-nid');
    responsiveCreateCookie('ref_nid', ref_nid,'10');
  });

  /******************** Company page locatin filters. **************/

  $('#referral-filters .country, #referral-filters .state').change(function (event) {
    var select = $(this),
      val = select.val(),
      name = select.attr('name'),
      country = name == 'country' ? val : $('[name="country"]').val(),
      province = name == 'state' ? val : '';
    select.parent().nextAll().addClass('disabled');
    select.parent().nextAll().find('select:not([disabled])').val('').trigger('change');

    if (val != '') {
      if(country == 0) {
        country = 'us';
      }

      $.ajax({
        url: '/referral-get-ajax-locations-options/' + country + '/' + province,
        success: function (data) {
          select.parent().next().find('select').html(data);
          select.parent().next().removeClass('disabled');

          select.parent().next().find('select').data("selectBoxIt").enable(); // selectBoxIt
          select.parent().next().find('select').data("selectBoxIt").refresh(); // selectBoxIt
        }
      });
    }
  });

});


function responsiveCreateCookie(name,value,time) {
  //time refeers in minutes
  if (time) {
    var date = new Date();
    date.setTime(date.getTime()+(time*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  var host = location.host;
  document.cookie = name+"="+value+expires+"; path=/; domain="+host;
}