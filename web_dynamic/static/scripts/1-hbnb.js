$(function () {
  const id = {};
  const h4 = $('.amenities h4');
  $('.amenities input[type=checkbox]').css('margin-right', '10px');
  $('.amenities input[type=checkbox]').on('change', function () {
    if (this.checked) id[$(this).attr('data-name')] = $(this).attr('data-id');
    else {
      for (const key in id) {
        if (id[key] === $(this).attr('data-id')) {
          delete id[key];
          break;
        }
      }
    }
    h4.text(Object.keys(id).join(', '))
      .css({
        height: '16px',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      });
  });
});
