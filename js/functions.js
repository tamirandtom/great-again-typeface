var keymap = [];

keymap[97] = keymap[65] = 'a';
keymap[98] = keymap[66] = 'b';
keymap[99] = keymap[67] = 'c';
keymap[100] = keymap[68] = 'd';
keymap[101] = keymap[69] = 'e';
keymap[102] = keymap[70] = 'f';
keymap[103] = keymap[71] = 'g';
keymap[104] = keymap[72] = 'h';
keymap[105] = keymap[73] = 'i';
keymap[106] = keymap[74] = 'j';
keymap[107] = keymap[75] = 'k';
keymap[108] = keymap[76] = 'l';
keymap[109] = keymap[77] = 'm';
keymap[110] = keymap[78] = 'n';
keymap[111] = keymap[79] = 'o';
keymap[112] = keymap[80] = 'p';
keymap[113] = keymap[81] = 'q';
keymap[114] = keymap[82] = 'r';
keymap[115] = keymap[83] = 's';
keymap[116] = keymap[84] = 't';
keymap[117] = keymap[85] = 'u';
keymap[118] = keymap[86] = 'v';
keymap[119] = keymap[87] = 'w';
keymap[120] = keymap[88] = 'x';
keymap[121] = keymap[89] = 'y';
keymap[122] = keymap[90] = 'z';
keymap[49] = 'ex';
keymap[191] = 'ex';
keymap[188] = 'comma';
keymap[190] = 'dot';
$(document).ready(function () {

    var charcount = 0;
    $(document).keyup(function (e) {
        console.log('pressed' + e.which);
        if (keymap[e.which]) {
            charcount++;
            $('.block-word').last().append('<img class="block-letter" src="images/l/' + keymap[e.which] + '.jpg" />');
        } else if (e.which == 13) { // enter

        } else if (e.which == 16) { // shift

        } else if (e.which == 32) { // space
            $('<div class="block-word"></div>').insertBefore(".cursor");

        } else if (e.which == 8) { // backspace
            // if there is letters inside of the last word, remove last
            if ($('.block-word').last().children().length > 0) {
                $('.block-word img').last().remove();
                charcount--;
            } else {
                // if there is more than 1 space, remove last
                if ($('.block-word').length > 1) {
                    $('.block-word').last().remove();
                    charcount--;
                } else {
                    flashError();
                }

            }





        } else {
            flashError();            
        }
        // console.log('count : ' + charcount);
        changeSize(charcount);
    });

    function changeSize(num) {
        $('.block-letter').attr('class', 'block-letter size1');
        $('.cursor').attr('class', 'cursor blinking-cursor size1');
        if (num < 6) {
            $('.block-letter').addClass('size1');
            $('.cursor').addClass('size1');
        } else if (num < 18) {
            $('.block-letter').addClass('size2');
            $('.cursor').addClass('size2');
            
        } else if (num < 24) {
            $('.block-letter').addClass('size3');
            $('.cursor').addClass('size3');
            
        } else if (num < 32) {
            $('.block-letter').addClass('size4');
            $('.cursor').addClass('size4');
            
        } else if (num < 50) {
            $('.block-letter').addClass('size5');
            $('.cursor').addClass('size5');
            
        } else {
            $('.block-letter').addClass('size6');
            $('.cursor').addClass('size6');
            
        }
    }

    function flashError() {
        $('#frame').addClass('frameError');
        setTimeout(
            function () {
                $('#frame').removeClass('frameError');
            }, 300);
    }

    $("#save").click(function () {
        html2canvas(document.querySelector("#frame")).then(canvas => {
            // document.body.appendChild(canvas);
            canvas.toBlob(function (blob) {
                saveAs(blob, "Screenshot.png");
                
            });
        });
    });

    $("#fbshare").click(function () {

        // TODO
    //     html2canvas(document.querySelector("#frame")).then(canvas => {
    //         // document.body.appendChild(canvas);
    //         var data = canvas.toDataURL("image/png");
    //         var encodedPng = data.substring(data.indexOf(',') + 1, data.length);
    //         var decodedPng = Base64Binary.decode(encodedPng);
    //    window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');return false;
            
        // });
    });


});