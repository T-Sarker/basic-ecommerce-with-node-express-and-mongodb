$(document).ready(function () {
    //onclick product change with ajax
    $('.filter').on('click', function () {
        var size = $(this).attr('value') || ''
        var filter = $('.filter:checked').attr('data') || ''
        var cat = $('.pCat').attr('data') || ''
        console.log(size + filter + cat);
        $.ajax({
            url: '/filter/sizes',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                filter: filter,
                category: cat,
                size: size
            }),
            success: function (d) {
                $('#plist').html(d)
            }
        })
    })

    //onclick product change with ajax
    // var id = []
    // $('.addToCart').on('click', function (e) {
    //     // e.preventDefault();

    //     var data = $(this).attr('id').replace('pdct', '')
    //     id.push(data)
    //     console.log(id);
    //     $.ajax({
    //         url: '/cart/addcart',
    //         method: 'POST',
    //         contentType: 'application/json',
    //         data: JSON.stringify({
    //             cart: id
    //         }),
    //         success: function (d) {
    //             console.log(d);
    //             $('.cartCount').text(d)

    //             console.log('success');
    //         }
    //     })



    // })

    //onclick product change with ajax
    var id = []
    $('.addToCart').on('click', function (e) {
        // e.preventDefault();
        var data = $(this).attr('id').replace('pdct', '')
        console.log(data);
        if (localStorage.getItem('plist')==null) {
            id.push(data)
            console.log(id);
            localStorage.setItem('plist', JSON.stringify(id))
        } else {
            if (localStorage.getItem('plist').includes(data)) {
                alert(data + " is already available")
            } else {
                var retrievedObject = localStorage.getItem("plist");
                var stored = JSON.parse(retrievedObject);
                stored.push(data)
                localStorage.setItem('plist', JSON.stringify(stored))
            }

        }

        // var data = $(this).attr('id').replace('pdct', '')

        // console.log(id);
        // localStorage.setItem('plist',JSON.stringify(id))

        console.log(localStorage.getItem('plist'));
         $.ajax({
             url: '/cart/addcart',
             method: 'POST',
             contentType: 'application/json',
             data: JSON.stringify({
                 cart: localStorage.getItem('plist')
             }),
             success: function (d) {
                 console.log(d);
                 $('.cartCount').text(d)

                 console.log('success');
             }
         })



    })


})