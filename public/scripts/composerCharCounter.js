$(document).ready(function(){
    $('textarea').keydown(function() {
        let remaining = 140;
        const counter = $(this).siblings('.counter');

        counter.css('color', 'black');
        counter.text(remaining -$(this).val().length);
        
        if(counter.text() < 0){
            counter.css('color', 'red');
        }
    });
});