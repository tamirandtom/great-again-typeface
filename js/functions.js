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



    //images loaded

    $('.imagesloaded').imagesLoaded()
        .always(function (instance) {
            console.log('all images loaded');

            goType();
        });




    var currAutoTypePos = 0;
    var url_string = window.location.href;
    var url = new URL(url_string);
    var type = url.searchParams.get("q");
    var cuttText = '';

    function goType() {

        $('.fade').removeClass('vis');

        if (type) {
            typeLetters(type);
        } else {
            typeLetters('great again!');

        }

    }



    // TODO: Loading screen for letters
    var charcount = 0;

    function typeLetters(str) {
        for (j = 0; j < str.length; j++) {
            setTimeout(function () {
                // console.log(str.charAt(currAutoTypePos));
                // take care of !?., and space
                var currChar = str.toLowerCase().charAt(currAutoTypePos);
                addChar(currChar);
                currAutoTypePos++
            }, (200 + (Math.random() * 40)) * j);
        }
    }

    function delPress() {
        if ($('.block-word').last().children().length > 0) {
            $('.block-word img').last().remove();
            charcount--;
            cuttText = cuttText.slice(0, -1);
            

        } else {
            // if there is more than 1 space, remove last
            if ($('.block-word').length > 1) {
                $('.block-word').last().remove();
                $('.block-space').last().remove();
                cuttText = cuttText.slice(0, -1);
                
                charcount--;
            } else {
                flashError();
            }

        }
        changeShareText();

    }

    function addChar(str) {
        var currChar;
        if (str == " ") {
            currChar = 32
        } else if (str == ".") {
            currChar = keymap.indexOf('dot');

        } else if (str == ",") {
            currChar = keymap.indexOf('comma');

        } else if (str == "!") {
            currChar = keymap.indexOf('ex');

        } else if (str == "?") {
            currChar = keymap.indexOf('ex');
        } else if (keymap.indexOf(str)) {
            currChar = keymap.indexOf(str);

        }

        addLetter(currChar);
        changeSize(charcount);

    }

    function getCharFromAscii(num) {
        var currChar;
        if (num == 32) {
            currChar = ' ';
        } else if (num == keymap.indexOf('dot')) {
            currChar = '.';

        } else if (num == keymap.indexOf('comma')) {
            currChar = ',';

        } else if (num == keymap.indexOf('ex')) {
            currChar = '!';

        } else if (keymap[num]) {
            currChar = keymap[num];

        } else {
            currChar = "";
        }
        return currChar;
    }


    function addLetter(ascii) {
        charcount++;
        if (ascii == 32) {
            $('<div class="block-space"></div><div class="block-word"></div>').insertBefore(".cursor");
        } else {
            $('.block-word').last().append('<img class="block-letter" src="images/l/' + keymap[ascii] + '.jpg" />');
        }
        cuttText = cuttText + getCharFromAscii(ascii);
        changeShareText();
    }

    function changeShareText() {
        $('#fb').attr('href','https://www.facebook.com/sharer/sharer.php?u=greatagaintype.com/?q='+encodeURI(cuttText)); 
    }

    $(document).keyup(function (e) {
        // console.log('pressed' + e.which);
        if (keymap[e.which]) {
            addLetter(e.which);
        } else if (e.which == 13) { // enter

        } else if (e.which == 16) { // shift

        } else if (e.which == 32) { // space
            addLetter(e.which);



        } else if (e.which == 8) { // backspace
            // if there is letters inside of the last word, remove last

            delPress();




        } else {
            flashError();
        }
        // console.log('count : ' + charcount);
        changeSize(charcount);
        console.log(cuttText);
    });

    function changeSize(num) {
        $('.block-letter').attr('class', 'block-letter size1');
        $('.cursor').attr('class', 'cursor blinking-cursor size1');
        $('.block-space').attr('class', 'block-space');
        if (num < 6) {

            $('.block-letter, .cursor, .block-space').addClass('size1');

        } else if (num < 18) {
            $('.block-letter, .cursor, .block-space').addClass('size2');


        } else if (num < 24) {
            $('.block-letter, .cursor, .block-space').addClass('size3');

        } else if (num < 32) {
            $('.block-letter, .cursor, .block-space').addClass('size4');


        } else if (num < 50) {
            $('.block-letter, .cursor, .block-space').addClass('size5');

        } else {
            $('.block-letter, .cursor, .block-space').addClass('size6');


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