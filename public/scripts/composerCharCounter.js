$(document).ready(function(){
    $('textarea').keypress(function() {
        let remaining = 140;
        const counter = $(this).siblings('.counter');

        counter.text(remaining -$(this).val().length);
        if(counter.text() < 0){
            counter.css('color', 'red');
        }
    });
});