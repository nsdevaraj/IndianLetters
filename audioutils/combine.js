var letters=[];
for( var i=0; i<lang.length; i++ ) {
    letters.push( [] );
}
var langIndex = 0;
vowelSignLangs.forEach(vowelSignLang => {
    letters[langIndex][0] = []
    consonantLangs[langIndex][0].forEach(consonant => {
        vowelSignLang.forEach(vowelsign => {
            letters[langIndex].push(consonant+vowelsign)        
        });
    });
    langIndex++
});