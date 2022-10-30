$(function () {
  const id = {};
  const h4 = $('.amenities h4');
  $('.amenities input[type=checkbox]').css('margin-right', '10px');
  $('.amenities input[type=checkbox]').on('change', function () {
    if (this.checked) id[$(this).attr('data-name')] = $(this).attr('data-id');
    else delete id[$(this).attr('data-name')];
    h4.text(Object.keys(id).join(', '))
      .css({
        height: '16px',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      });
  });
  $.ajax({
    type: 'GET',
    // Use http://0.0.0.0:5001/api/v1/status instead
    // However, note that loopback 0.0.0.0 on windows
    // spill errors.
    url: 'http://127.0.0.1:5001/api/v1/status/',
    success: function (response) {
      const status = response.status;
      if (status === 'OK') $('DIV#api_status').addClass('available');
      else $('DIV#api_status').removeClass('available');
    }
  });
});
