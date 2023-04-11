const letters = [
    {
        'lang': 'ไทย',
        'vowels': ['ะ', 'ั', 'า', 'ิ', 'ี', 'ึ', 'ื', 'ุ', 'ู', 'ฤ', 'ฦ', 'ๅ', 'เ', 'แ', 'โ', 'ำ', 'ไ', 'ใ', '๏', 'ๆ', 'ฯ', '๚', '๛'],
        'consonants': ['ก', 'ข', 'ฃ', 'ค', 'ฅ', 'ฆ', 'ง', 'จ', 'ฉ', 'ช', 'ซ', 'ฌ', 'ญ', 'ฎ', 'ฏ', 'ฐ', 'ฑ', 'ฒ', 'ณ', 'ด', 'ต', 'ถ', 'ท', 'ธ', 'น', 'บ', 'ป', 'ผ', 'พ', 'ภ', 'ม', 'ฝ', 'ฟ', 'ย', 'ร', 'ล', 'ว', 'ศ', 'ษ', 'ส', 'ห', 'ฬ', 'อ', 'ฮ'],
        'combinations': ['กะ', 'กั', 'กา', 'กิ', 'กี', 'กึ', 'กื', 'กุ', 'กู', 'กฤ', 'กฦ', 'กๅ', 'กเ', 'กแ', 'กโ', 'กำ', 'กไ', 'กใ', 'ก๏', 'กๆ', 'กฯ', 'ก๚', 'ก๛', 'ขะ', 'ขั', 'ขา', 'ขิ', 'ขี', 'ขึ', 'ขื', 'ขุ', 'ขู', 'ขฤ', 'ขฦ', 'ขๅ', 'ขเ', 'ขแ', 'ขโ', 'ขำ', 'ขไ', 'ขใ', 'ข๏', 'ขๆ', 'ขฯ', 'ข๚', 'ข๛', 'ฃะ', 'ฃั', 'ฃา', 'ฃิ', 'ฃี', 'ฃึ', 'ฃื', 'ฃุ', 'ฃู', 'ฃฤ', 'ฃฦ', 'ฃๅ', 'ฃเ', 'ฃแ', 'ฃโ', 'ฃำ', 'ฃไ', 'ฃใ', 'ฃ๏', 'ฃๆ', 'ฃฯ', 'ฃ๚', 'ฃ๛', 'คะ', 'คั', 'คา', 'คิ', 'คี', 'คึ', 'คื', 'คุ', 'คู', 'คฤ', 'คฦ', 'คๅ', 'คเ', 'คแ', 'คโ', 'คำ', 'คไ', 'คใ', 'ค๏', 'คๆ', 'คฯ', 'ค๚', 'ค๛', 'ฅะ', 'ฅั', 'ฅา', 'ฅิ', 'ฅี', 'ฅึ', 'ฅื', 'ฅุ', 'ฅู', 'ฅฤ', 'ฅฦ', 'ฅๅ', 'ฅเ', 'ฅแ', 'ฅโ', 'ฅำ', 'ฅไ', 'ฅใ', 'ฅ๏', 'ฅๆ', 'ฅฯ', 'ฅ๚', 'ฅ๛', 'ฆะ', 'ฆั', 'ฆา', 'ฆิ', 'ฆี', 'ฆึ', 'ฆื', 'ฆุ', 'ฆู', 'ฆฤ', 'ฆฦ', 'ฆๅ', 'ฆเ', 'ฆแ', 'ฆโ', 'ฆำ', 'ฆไ', 'ฆใ', 'ฆ๏', 'ฆๆ', 'ฆฯ', 'ฆ๚', 'ฆ๛', 'งะ', 'งั', 'งา', 'งิ', 'งี', 'งึ', 'งื', 'งุ', 'งู', 'งฤ', 'งฦ', 'งๅ', 'งเ', 'งแ', 'งโ', 'งำ', 'งไ', 'งใ', 'ง๏', 'งๆ', 'งฯ', 'ง๚', 'ง๛', 'จะ', 'จั', 'จา', 'จิ', 'จี', 'จึ', 'จื', 'จุ', 'จู', 'จฤ', 'จฦ', 'จๅ', 'จเ', 'จแ', 'จโ', 'จำ', 'จไ', 'จใ', 'จ๏', 'จๆ', 'จฯ', 'จ๚', 'จ๛', 'ฉะ', 'ฉั', 'ฉา', 'ฉิ', 'ฉี', 'ฉึ', 'ฉื', 'ฉุ', 'ฉู', 'ฉฤ', 'ฉฦ', 'ฉๅ', 'ฉเ', 'ฉแ', 'ฉโ', 'ฉำ', 'ฉไ', 'ฉใ', 'ฉ๏', 'ฉๆ', 'ฉฯ', 'ฉ๚', 'ฉ๛', 'ชะ', 'ชั', 'ชา', 'ชิ', 'ชี', 'ชึ', 'ชื', 'ชุ', 'ชู', 'ชฤ', 'ชฦ', 'ชๅ', 'ชเ', 'ชแ', 'ชโ', 'ชำ', 'ชไ', 'ชใ', 'ช๏', 'ชๆ', 'ชฯ', 'ช๚', 'ช๛', 'ซะ', 'ซั', 'ซา', 'ซิ', 'ซี', 'ซึ', 'ซื', 'ซุ', 'ซู', 'ซฤ', 'ซฦ', 'ซๅ', 'ซเ', 'ซแ', 'ซโ', 'ซำ', 'ซไ', 'ซใ', 'ซ๏', 'ซๆ', 'ซฯ', 'ซ๚', 'ซ๛', 'ฌะ', 'ฌั', 'ฌา', 'ฌิ', 'ฌี', 'ฌึ', 'ฌื', 'ฌุ', 'ฌู', 'ฌฤ', 'ฌฦ', 'ฌๅ', 'ฌเ', 'ฌแ', 'ฌโ', 'ฌำ', 'ฌไ', 'ฌใ', 'ฌ๏', 'ฌๆ', 'ฌฯ', 'ฌ๚', 'ฌ๛', 'ญะ', 'ญั', 'ญา', 'ญิ', 'ญี', 'ญึ', 'ญื', 'ญุ', 'ญู', 'ญฤ', 'ญฦ', 'ญๅ', 'ญเ', 'ญแ', 'ญโ', 'ญำ', 'ญไ', 'ญใ', 'ญ๏', 'ญๆ', 'ญฯ', 'ญ๚', 'ญ๛', 'ฎะ', 'ฎั', 'ฎา', 'ฎิ', 'ฎี', 'ฎึ', 'ฎื', 'ฎุ', 'ฎู', 'ฎฤ', 'ฎฦ', 'ฎๅ', 'ฎเ', 'ฎแ', 'ฎโ', 'ฎำ', 'ฎไ', 'ฎใ', 'ฎ๏', 'ฎๆ', 'ฎฯ', 'ฎ๚', 'ฎ๛', 'ฏะ', 'ฏั', 'ฏา', 'ฏิ', 'ฏี', 'ฏึ', 'ฏื', 'ฏุ', 'ฏู', 'ฏฤ', 'ฏฦ', 'ฏๅ', 'ฏเ', 'ฏแ', 'ฏโ', 'ฏำ', 'ฏไ', 'ฏใ', 'ฏ๏', 'ฏๆ', 'ฏฯ', 'ฏ๚', 'ฏ๛', 'ฐะ', 'ฐั', 'ฐา', 'ฐิ', 'ฐี', 'ฐึ', 'ฐื', 'ฐุ', 'ฐู', 'ฐฤ', 'ฐฦ', 'ฐๅ', 'ฐเ', 'ฐแ', 'ฐโ', 'ฐำ', 'ฐไ', 'ฐใ', 'ฐ๏', 'ฐๆ', 'ฐฯ', 'ฐ๚', 'ฐ๛', 'ฑะ', 'ฑั', 'ฑา', 'ฑิ', 'ฑี', 'ฑึ', 'ฑื', 'ฑุ', 'ฑู', 'ฑฤ', 'ฑฦ', 'ฑๅ', 'ฑเ', 'ฑแ', 'ฑโ', 'ฑำ', 'ฑไ', 'ฑใ', 'ฑ๏', 'ฑๆ', 'ฑฯ', 'ฑ๚', 'ฑ๛', 'ฒะ', 'ฒั', 'ฒา', 'ฒิ', 'ฒี', 'ฒึ', 'ฒื', 'ฒุ', 'ฒู', 'ฒฤ', 'ฒฦ', 'ฒๅ', 'ฒเ', 'ฒแ', 'ฒโ', 'ฒำ', 'ฒไ', 'ฒใ', 'ฒ๏', 'ฒๆ', 'ฒฯ', 'ฒ๚', 'ฒ๛', 'ณะ', 'ณั', 'ณา', 'ณิ', 'ณี', 'ณึ', 'ณื', 'ณุ', 'ณู', 'ณฤ', 'ณฦ', 'ณๅ', 'ณเ', 'ณแ', 'ณโ', 'ณำ', 'ณไ', 'ณใ', 'ณ๏', 'ณๆ', 'ณฯ', 'ณ๚', 'ณ๛', 'ดะ', 'ดั', 'ดา', 'ดิ', 'ดี', 'ดึ', 'ดื', 'ดุ', 'ดู', 'ดฤ', 'ดฦ', 'ดๅ', 'ดเ', 'ดแ', 'ดโ', 'ดำ', 'ดไ', 'ดใ', 'ด๏', 'ดๆ', 'ดฯ', 'ด๚', 'ด๛', 'ตะ', 'ตั', 'ตา', 'ติ', 'ตี', 'ตึ', 'ตื', 'ตุ', 'ตู', 'ตฤ', 'ตฦ', 'ตๅ', 'ตเ', 'ตแ', 'ตโ', 'ตำ', 'ตไ', 'ตใ', 'ต๏', 'ตๆ', 'ตฯ', 'ต๚', 'ต๛', 'ถะ', 'ถั', 'ถา', 'ถิ', 'ถี', 'ถึ', 'ถื', 'ถุ', 'ถู', 'ถฤ', 'ถฦ', 'ถๅ', 'ถเ', 'ถแ', 'ถโ', 'ถำ', 'ถไ', 'ถใ', 'ถ๏', 'ถๆ', 'ถฯ', 'ถ๚', 'ถ๛', 'ทะ', 'ทั', 'ทา', 'ทิ', 'ที', 'ทึ', 'ทื', 'ทุ', 'ทู', 'ทฤ', 'ทฦ', 'ทๅ', 'ทเ', 'ทแ', 'ทโ', 'ทำ', 'ทไ', 'ทใ', 'ท๏', 'ทๆ', 'ทฯ', 'ท๚', 'ท๛', 'ธะ', 'ธั', 'ธา', 'ธิ', 'ธี', 'ธึ', 'ธื', 'ธุ', 'ธู', 'ธฤ', 'ธฦ', 'ธๅ', 'ธเ', 'ธแ', 'ธโ', 'ธำ', 'ธไ', 'ธใ', 'ธ๏', 'ธๆ', 'ธฯ', 'ธ๚', 'ธ๛', 'นะ', 'นั', 'นา', 'นิ', 'นี', 'นึ', 'นื', 'นุ', 'นู', 'นฤ', 'นฦ', 'นๅ', 'นเ', 'นแ', 'นโ', 'นำ', 'นไ', 'นใ', 'น๏', 'นๆ', 'นฯ', 'น๚', 'น๛', 'บะ', 'บั', 'บา', 'บิ', 'บี', 'บึ', 'บื', 'บุ', 'บู', 'บฤ', 'บฦ', 'บๅ', 'บเ', 'บแ', 'บโ', 'บำ', 'บไ', 'บใ', 'บ๏', 'บๆ', 'บฯ', 'บ๚', 'บ๛', 'ปะ', 'ปั', 'ปา', 'ปิ', 'ปี', 'ปึ', 'ปื', 'ปุ', 'ปู', 'ปฤ', 'ปฦ', 'ปๅ', 'ปเ', 'ปแ', 'ปโ', 'ปำ', 'ปไ', 'ปใ', 'ป๏', 'ปๆ', 'ปฯ', 'ป๚', 'ป๛', 'ผะ', 'ผั', 'ผา', 'ผิ', 'ผี', 'ผึ', 'ผื', 'ผุ', 'ผู', 'ผฤ', 'ผฦ', 'ผๅ', 'ผเ', 'ผแ', 'ผโ', 'ผำ', 'ผไ', 'ผใ', 'ผ๏', 'ผๆ', 'ผฯ', 'ผ๚', 'ผ๛', 'พะ', 'พั', 'พา', 'พิ', 'พี', 'พึ', 'พื', 'พุ', 'พู', 'พฤ', 'พฦ', 'พๅ', 'พเ', 'พแ', 'พโ', 'พำ', 'พไ', 'พใ', 'พ๏', 'พๆ', 'พฯ', 'พ๚', 'พ๛', 'ภะ', 'ภั', 'ภา', 'ภิ', 'ภี', 'ภึ', 'ภื', 'ภุ', 'ภู', 'ภฤ', 'ภฦ', 'ภๅ', 'ภเ', 'ภแ', 'ภโ', 'ภำ', 'ภไ', 'ภใ', 'ภ๏', 'ภๆ', 'ภฯ', 'ภ๚', 'ภ๛', 'มะ', 'มั', 'มา', 'มิ', 'มี', 'มึ', 'มื', 'มุ', 'มู', 'มฤ', 'มฦ', 'มๅ', 'มเ', 'มแ', 'มโ', 'มำ', 'มไ', 'มใ', 'ม๏', 'มๆ', 'มฯ', 'ม๚', 'ม๛', 'ฝะ', 'ฝั', 'ฝา', 'ฝิ', 'ฝี', 'ฝึ', 'ฝื', 'ฝุ', 'ฝู', 'ฝฤ', 'ฝฦ', 'ฝๅ', 'ฝเ', 'ฝแ', 'ฝโ', 'ฝำ', 'ฝไ', 'ฝใ', 'ฝ๏', 'ฝๆ', 'ฝฯ', 'ฝ๚', 'ฝ๛', 'ฟะ', 'ฟั', 'ฟา', 'ฟิ', 'ฟี', 'ฟึ', 'ฟื', 'ฟุ', 'ฟู', 'ฟฤ', 'ฟฦ', 'ฟๅ', 'ฟเ', 'ฟแ', 'ฟโ', 'ฟำ', 'ฟไ', 'ฟใ', 'ฟ๏', 'ฟๆ', 'ฟฯ', 'ฟ๚', 'ฟ๛', 'ยะ', 'ยั', 'ยา', 'ยิ', 'ยี', 'ยึ', 'ยื', 'ยุ', 'ยู', 'ยฤ', 'ยฦ', 'ยๅ', 'ยเ', 'ยแ', 'ยโ', 'ยำ', 'ยไ', 'ยใ', 'ย๏', 'ยๆ', 'ยฯ', 'ย๚', 'ย๛', 'ระ', 'รั', 'รา', 'ริ', 'รี', 'รึ', 'รื', 'รุ', 'รู', 'รฤ', 'รฦ', 'รๅ', 'รเ', 'รแ', 'รโ', 'รำ', 'รไ', 'รใ', 'ร๏', 'รๆ', 'รฯ', 'ร๚', 'ร๛', 'ละ', 'ลั', 'ลา', 'ลิ', 'ลี', 'ลึ', 'ลื', 'ลุ', 'ลู', 'ลฤ', 'ลฦ', 'ลๅ', 'ลเ', 'ลแ', 'ลโ', 'ลำ', 'ลไ', 'ลใ', 'ล๏', 'ลๆ', 'ลฯ', 'ล๚', 'ล๛', 'วะ', 'วั', 'วา', 'วิ', 'วี', 'วึ', 'วื', 'วุ', 'วู', 'วฤ', 'วฦ', 'วๅ', 'วเ', 'วแ', 'วโ', 'วำ', 'วไ', 'วใ', 'ว๏', 'วๆ', 'วฯ', 'ว๚', 'ว๛', 'ศะ', 'ศั', 'ศา', 'ศิ', 'ศี', 'ศึ', 'ศื', 'ศุ', 'ศู', 'ศฤ', 'ศฦ', 'ศๅ', 'ศเ', 'ศแ', 'ศโ', 'ศำ', 'ศไ', 'ศใ', 'ศ๏', 'ศๆ', 'ศฯ', 'ศ๚', 'ศ๛', 'ษะ', 'ษั', 'ษา', 'ษิ', 'ษี', 'ษึ', 'ษื', 'ษุ', 'ษู', 'ษฤ', 'ษฦ', 'ษๅ', 'ษเ', 'ษแ', 'ษโ', 'ษำ', 'ษไ', 'ษใ', 'ษ๏', 'ษๆ', 'ษฯ', 'ษ๚', 'ษ๛', 'สะ', 'สั', 'สา', 'สิ', 'สี', 'สึ', 'สื', 'สุ', 'สู', 'สฤ', 'สฦ', 'สๅ', 'สเ', 'สแ', 'สโ', 'สำ', 'สไ', 'สใ', 'ส๏', 'สๆ', 'สฯ', 'ส๚', 'ส๛', 'หะ', 'หั', 'หา', 'หิ', 'หี', 'หึ', 'หื', 'หุ', 'หู', 'หฤ', 'หฦ', 'หๅ', 'หเ', 'หแ', 'หโ', 'หำ', 'หไ', 'หใ', 'ห๏', 'หๆ', 'หฯ', 'ห๚', 'ห๛', 'ฬะ', 'ฬั', 'ฬา', 'ฬิ', 'ฬี', 'ฬึ', 'ฬื', 'ฬุ', 'ฬู', 'ฬฤ', 'ฬฦ', 'ฬๅ', 'ฬเ', 'ฬแ', 'ฬโ', 'ฬำ', 'ฬไ', 'ฬใ', 'ฬ๏', 'ฬๆ', 'ฬฯ', 'ฬ๚', 'ฬ๛', 'อะ', 'อั', 'อา', 'อิ', 'อี', 'อึ', 'อื', 'อุ', 'อู', 'อฤ', 'อฦ', 'อๅ', 'อเ', 'อแ', 'อโ', 'อำ', 'อไ', 'อใ', 'อ๏', 'อๆ', 'อฯ', 'อ๚', 'อ๛', 'ฮะ', 'ฮั', 'ฮา', 'ฮิ', 'ฮี', 'ฮึ', 'ฮื', 'ฮุ', 'ฮู', 'ฮฤ', 'ฮฦ', 'ฮๅ', 'ฮเ', 'ฮแ', 'ฮโ', 'ฮำ', 'ฮไ', 'ฮใ', 'ฮ๏', 'ฮๆ', 'ฮฯ', 'ฮ๚', 'ฮ๛'],
    },


]
module.exports = {
    letters
}