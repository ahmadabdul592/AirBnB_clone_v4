$(function() {
    id = {};
    $('input[type=checkbox]').on('change', function() {
        if (this.checked) {
            $(this).removeClass('checkbox').addClass('checked')
            id[this.getAttribute('data-name')] = this.getAttribute('data-id')
        } else {
            $(this).removeClass('checked').addClass('checkbox')
            for (let key in id) {
                if (id[key] === $(this).attr('data-id')) delete id[key]
                break;
            }
        }
        const h4 = $('h4')
        h4.text('')
        for (let key in id) {
            let name = key.replace('_', ' ')
            h4.text(name)
        }
    })
})
