$(document).ready(function(){
   //onclick product change with ajax
    $('.filter').on('click',function(){
        var size = $(this).attr('value') || ''
        var filter = $('.filter:checked').attr('data') || ''
        var cat = $('.pCat').attr('data') || ''
        console.log(size+filter+cat);
        $.ajax({
            url:'/filter/sizes',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({filter:filter,category:cat,size:size}),
            success:function(d){
                $('#plist').html(d)
            }
        })
      })
})