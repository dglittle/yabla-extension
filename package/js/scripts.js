$().ready(function() {
    if (typeof(Application) !== 'undefined') {          // check created object Application
        if (Application.opts.media_lang_id == "es" && Application.opts.translation_lang_id == "en") {       // check languages
            Application.vc.bind('captionchange', addTranslation);           // listen event 'captionchange'
        }
    }
})

function addTranslation(e, d) {
    var ind = d.caption_index;
    if(ind !== null && ind !== undefined) {
        var words = Application.vc.captions[ind].transcript_words;          // get current line words
        var translatedWords = [];
        var cnt = 0;
        var wordsCnt = words.length;
        for (var i = 0; i < wordsCnt; i++) {
            (function(j) {
                $.getJSON(                          // try to get translation
                    'player_service.php',
                    {
                        action: 'lookup',
                        word: words[j].word,
                        word_lang_id: Application.opts.media_lang_id,
                        output_lang_id: Application.opts.translation_lang_id
                    },
                    function(data) {
                        translatedWords[j] = parseTranslation(data.text, data.word);        // parse response
                        cnt++;
                        if (cnt == wordsCnt) {
                            addTranslationLine(translatedWords);
                        }
                    });
            })(i);
        }
    }
}

function parseTranslation(text, word) {
    var res = text.match(/<p class=.*?<\/span><br><b>.*?<\/b>.*?<br>(.+?)\s*<br>/i);
    if (res && res[1]) {
        res = res[1].split(/[,;]/)[0];
    } else {
        res = "_";
    }
    return res;
}

function addTranslationLine(wordArr) {                      // generate dom object of translation line
    var html = "<div class='translate'>";
    for (var i = 0; i < wordArr.length; i++) {
        html += "<span>" + wordArr[i] + "</span> ";
    }
    html += "</div>";

    $(".wrap .transcript.text").append(html);

    alignWords();
}

function alignWords() {
    var original = $(".wrap .transcript.text .word");
    var translated = $(".wrap .transcript.text .translate span");

    for (var i = 0; i < original.length; i++) {
        var or = original.eq(i);
        var tr = translated.eq(i);
        var orWidth = or.width();
        var trWidth = tr.width();
        if (orWidth > trWidth) {
            tr.width(orWidth);
        } else {
            or.width(trWidth);
        }
        var orOffset = or.offset();
        tr.offset({
            left: orOffset.left,
            top: orOffset.top + 15
        });
    }
    for (var i = 0; i < original.length; i++) {
        var orOffset = original.eq(i).offset();
        translated.eq(i).offset({
            left: orOffset.left,
            top: orOffset.top + 15
        });
    }
}
