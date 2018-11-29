
/*
let genes = []
let health = []

// original
// const rawGenes = 'ogwwsenipa obsehkjfcj dhqvptquuu kkdgivnvfc ytdqxmciue rznhvdcnxw kihnqpkdnp hlimdfbfnv mguznrcpfc nrmweeookb drolersfwh ckpykeqotx sioefulviv wnmkasbuzz ddkscwwukr rfzhjgbwbl rzagjaymua mxdyrhunbg eulfdxogtr rnrrtctrpp tdmzbfgxsi fyereiquol liyebrhvly kgbzfeembz wgxazdirzx flfdrgxydi woqzpwdvkg ugpuiqxrix qnkxsbfpcj zazqaqmdly mgebaorzfz yxoiuhmayo lyqkoqacwn aivgjxucxc cxzsgwbuya klyavotxsp muzickfwmc aqccjiakey mojmqgajfu yrozzqjfpw jrmltxvtkz twpejgmlpr gqlwpknbre xdvlqplmkv ngtfmelzsc qyudukojnh nkmjxdairm fgublhhygz byxvcuhsdu btgocgreqk syqnzeuicc ifahdebmwh jaapoexhio rcmjpnnlxq nfvonauqnt xwtznjdlqn bjqnshcgtz yghvwuwrml kmhdlumrhe einwxhebpx bnfilcejts ufebiqxwjh cnprmnysoq rrfwbqahzv atagwkwwif dkvsbjhcby surxqvqter oenpljzjhi rkuofwxoaa osugrmdjfh bwoolbzmkh wdtrrypqpp qdjmlcbomi wpekdpleex nabhtuhinw zfcksnntcb dyqiktzxzd ungxuzubkh almcwgrlbt mftcndxoaw sxjawdzshl zjxonvwegy ysfruuxtiz payzavecpn ppwofjjbop bojghfaeyj golgpodtst hhifwprhqf xuvgacodjm orcbxrpbnj uwtebrtsyl zxfugizuli gzzjawcszp btnwxrnqlm enljjrrile ssdtdgsfar xdlmaidpbp dhepqngkws oomuipccwc ttfeihplxs'

// small and large gene sizes
const rawGenes = 'ogwwsenipa obsehkjfcj dhqvptquuu kkdgivnvfc ytdqxmciue rznhvdcnxw kihnqpkdnp hlimdfbfnv mguznrcpfc nrmweeookb drolersfwh ckpykeqotx sioefulviv wnmkasbuzz ddkscwwukr rfzhjgbwbl rzagjaymua mxdyrhunbg eulfdxogtr rnrrtctrpp tdmzbfgxsi fyereiquol liyebrhvly kgbzfeembz wgxazdirzx flfdrgxydi woqzpwdvkg ugpuiqxrix qnkxsbfpcj zazqaqmdly mgebaorzfz yxoiuhmayo lyqkoqacwn aivgjxucxc cxzsgwbuya klyavotxsp muzickfwmc aqccjiakey mojmqgajfu yrozzqjfpw jrmltxvtkz twpejgmlpr gqlwpknbre xdvlqplmkv ngtfmelzsc qyudukojnh nkmjxdairm fgublhhygz byxvcuhsdu btgocgreqk syqnzeuicc ifahdebmwh jaapoexhio rcmjpnnlxq nfvonauqnt xwtznjdlqn bjqnshcgtz yghvwuwrml kmhdlumrhe einwxhebpx bnfilcejts ufebiqxwjh cnprmnysoq rrfwbqahzv atagwkwwif dkvsbjhcby surxqvqter oenpljzjhi rkuofwxoaa osugrmdjfh bwoolbzmkh wdtrrypqpp qdjmlcbomi wpekdpleex nabhtuhinw zfcksnntcb dyqiktzxzd ungxuzubkh almcwgrlbt mftcndxoaw sxjawdzshl zjxonvwegy ysfruuxtiz payzavecpn ppwofjjbop bojghfaeyj golgpodtst hhifwprhqf xuvgacodjm orcbxrpbnj uwtebrtsyl zxfugizuli gzzjawcszp btnwxrnqlm enljjrrile ssdtdgsfar xdlmaidpbp dhepqngkws oomuipccwc ttfeihplxs'
// const rawGenes = 'ogwwsenipa obs dhqvp kkf ytdqxmciue rznhvdcnxw kihnqpkdnp hlimdfbfnv mguznrcpfc nrmweeookb drolersfwh ckpykeqotx sioefulviv wnmkasbuzz ddkscwwukr rfzhjgbwbl rzagjaymua mxdyrhunbg eulfdxogtr rnrrtctrpp tdmzbfgxsi fyereiquol liyebrhvly kgbzfeembz wgxazdirzx flfdrgxydi woqzpwdvkg ugpuiqxrix qnkxsbfpcj zazqaqmdly mgebaorzfz yxoiuhmayo lyqkoqacwn aivgjxucxc cxzsgwbuya klyavotxsp muzickfwmc aqccjiakey mojmqgajfu yrozzqjfpw jrmltxvtkz twpejgmlpr gqlwpknbre xdvlqplmkv ngtfmelzsc qyudukojnh nkmjxdairm fgublhhygz byxvcuhsdu btgocgreqk syqnzeuicc ifahdebmwh jaapoexhio rcmjpnnlxq nfvonauqnt xwtznjdlqn bjqnshcgtz yghvwuwrml kmhdlumrhe einwxhebpx bnfilcejts ufebiqxwjh cnprmnysoq rrfwbqahzv atagwkwwif dkvsbjhcby surxqvqter oenpljzjhi rkuofwxoaa osugrmdjfh bwoolbzmkh wdtrrypqpp qdjmlcbomi wpekdpleex nabhtuhinw zfcksnntcb dyqiktzxzd ungxuzubkh almcwgrlbt mftcndxoaw sxjawdzshl zjxonvwegy ysfruuxtiz payzavecpn ppwofjjbop bojghfaeyj golgpodtst hhifwprhqf xuvgacodjm orcbxrpbnj uwtebrtsyl zxfugizuli gzzjawcszp btnwxrnqlm enljjrrile ssdtdgsfar xdlmaidpbp dhepqngkws oomuipccwc ttfeihplxs'

// One gene has multiple health values
// const rawGenes = 'ogwwsenipa obsehkjfcj dhqvptquuu kkdgivnvfc ytdqxmciue rznhvdcnxw kihnqpkdnp hlimdfbfnv mguznrcpfc nrmweeookb drolersfwh ckpykeqotx sioefulviv wnmkasbuzz ddkscwwukr rfzhjgbwbl rzagjaymua mxdyrhunbg eulfdxogtr rnrrtctrpp tdmzbfgxsi fyereiquol liyebrhvly kgbzfeembz wgxazdirzx flfdrgxydi woqzpwdvkg ugpuiqxrix qnkxsbfpcj zazqaqmdly jrmltxvtkz yxoiuhmayo lyqkoqacwn aivgjxucxc cxzsgwbuya klyavotxsp muzickfwmc aqccjiakey mojmqgajfu yrozzqjfpw jrmltxvtkz twpejgmlpr gqlwpknbre xdvlqplmkv ngtfmelzsc qyudukojnh nkmjxdairm fgublhhygz byxvcuhsdu btgocgreqk syqnzeuicc ifahdebmwh jaapoexhio rcmjpnnlxq nfvonauqnt xwtznjdlqn bjqnshcgtz yghvwuwrml kmhdlumrhe einwxhebpx bnfilcejts ufebiqxwjh cnprmnysoq rrfwbqahzv atagwkwwif dkvsbjhcby surxqvqter oenpljzjhi rkuofwxoaa osugrmdjfh bwoolbzmkh wdtrrypqpp qdjmlcbomi wpekdpleex nabhtuhinw zfcksnntcb dyqiktzxzd ungxuzubkh almcwgrlbt mftcndxoaw sxjawdzshl zjxonvwegy ysfruuxtiz payzavecpn ppwofjjbop bojghfaeyj golgpodtst hhifwprhqf xuvgacodjm orcbxrpbnj uwtebrtsyl zxfugizuli gzzjawcszp btnwxrnqlm enljjrrile ssdtdgsfar xdlmaidpbp dhepqngkws oomuipccwc ttfeihplxs'

const rawHealth = '4462805 1916916 2870812 3407597 5169525 4087301 4005965 1803633 3357388 1112112 5656776 4438527 3841975 4102090 2113339 2977711 1709727 1666821 4167887 3742911 1948785 3057238 1940358 4574138 4598641 2922682 1839758 4562812 1508583 2531144 3192788 4971388 3448060 2579952 4895338 5133938 5667253 5417655 3453923 3024642 5529768 3110699 3979521 5888095 3729142 2609212 2865806 1955221 3276034 3550045 4698132 1741171 5607283 5638490 2831662 1722277 2561172 3671420 5285089 5586108 5202564 4994229 2073848 5166977 1574181 5969186 1817267 1241435 2903194 1787542 5782429 4949314 1414593 1278302 4837409 4143735 2887514 4219567 5098956 2679900 1769612 1313440 5937424 3893247 3468283 2769086 2131876 5029455 2956858 3933318 2131915 4675774 2927547 3205764 1359103 1018081 5691302 2176370 3775868 2594496'
*/


const genes = ['ogwwsenipa',
'obsehkjfcj',
'dhqvptquuu',
'kkdgivnvfc',
'ytdqxmciue',
'rznhvdcnxw',
'kihnqpkdnp',
'hlimdfbfnv',
'mguznrcpfc',
'nrmweeookb',
'drolersfwh',
'ckpykeqotx',
'sioefulviv',
'wnmkasbuzz',
'ddkscwwukr',
'rfzhjgbwbl',
'rzagjaymua',
'mxdyrhunbg',
'eulfdxogtr',
'rnrrtctrpp',
'tdmzbfgxsi',
'fyereiquol',
'liyebrhvly',
'kgbzfeembz',
'wgxazdirzx',
'flfdrgxydi',
'woqzpwdvkg',
'ugpuiqxrix',
'qnkxsbfpcj',
'zazqaqmdly',
'mgebaorzfz',
'yxoiuhmayo',
'lyqkoqacwn',
'aivgjxucxc',
'cxzsgwbuya',
'klyavotxsp',
'muzickfwmc',
'aqccjiakey',
'mojmqgajfu',
'yrozzqjfpw',
'jrmltxvtkz',
'twpejgmlpr',
'gqlwpknbre',
'xdvlqplmkv',
'ngtfmelzsc',
'qyudukojnh',
'nkmjxdairm',
'fgublhhygz',
'byxvcuhsdu',
'btgocgreqk',
'syqnzeuicc',
'ifahdebmwh',
'jaapoexhio',
'rcmjpnnlxq',
'nfvonauqnt',
'xwtznjdlqn',
'bjqnshcgtz',
'yghvwuwrml',
'kmhdlumrhe',
'einwxhebpx',
'bnfilcejts',
'ufebiqxwjh',
'cnprmnysoq',
'rrfwbqahzv',
'atagwkwwif',
'dkvsbjhcby',
'surxqvqter',
'oenpljzjhi',
'rkuofwxoaa',
'osugrmdjfh',
'bwoolbzmkh',
'wdtrrypqpp',
'qdjmlcbomi',
'wpekdpleex',
'nabhtuhinw',
'zfcksnntcb',
'dyqiktzxzd',
'ungxuzubkh',
'almcwgrlbt',
'mftcndxoaw',
'sxjawdzshl',
'zjxonvwegy',
'ysfruuxtiz',
'payzavecpn',
'ppwofjjbop',
'bojghfaeyj',
'golgpodtst',
'hhifwprhqf',
'xuvgacodjm',
'orcbxrpbnj',
'uwtebrtsyl',
'zxfugizuli',
'gzzjawcszp',
'btnwxrnqlm',
'enljjrrile',
'ssdtdgsfar',
'xdlmaidpbp',
'dhepqngkws',
'oomuipccwc',
'ttfeihplxs']

const health = [4462805,
  1916916,
  2870812,
  3407597,
  5169525,
  4087301,
  4005965,
  1803633,
  3357388,
  1112112,
  5656776,
  4438527,
  3841975,
  4102090,
  2113339,
  2977711,
  1709727,
  1666821,
  4167887,
  3742911,
  1948785,
  3057238,
  1940358,
  4574138,
  4598641,
  2922682,
  1839758,
  4562812,
  1508583,
  2531144,
  3192788,
  4971388,
  3448060,
  2579952,
  4895338,
  5133938,
  5667253,
  5417655,
  3453923,
  3024642,
  5529768,
  3110699,
  3979521,
  5888095,
  3729142,
  2609212,
  2865806,
  1955221,
  3276034,
  3550045,
  4698132,
  1741171,
  5607283,
  5638490,
  2831662,
  1722277,
  2561172,
  3671420,
  5285089,
  5586108,
  5202564,
  4994229,
  2073848,
  5166977,
  1574181,
  5969186,
  1817267,
  1241435,
  2903194,
  1787542,
  5782429,
  4949314,
  1414593,
  1278302,
  4837409,
  4143735,
  2887514,
  4219567,
  5098956,
  2679900,
  1769612,
  1313440,
  5937424,
  3893247,
  3468283,
  2769086,
  2131876,
  5029455,
  2956858,
  3933318,
  2131915,
  4675774,
  2927547,
  3205764,
  1359103,
  1018081,
  5691302,
  2176370,
  3775868,
  2594496]

const strands = [
  // [7, 93, 'zjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtrzjxonvwegyeulfdxogtr'],
  [7, 93, 'zjxonvwegyeulfdxogtr'],
  [0, 77, 'dkvsbjhcbyrzagjaymua'],
  [13, 90, 'ddkscwwukrrfzhjgbwbl'],
  [9, 85, 'xdvlqplmkvwgxazdirzx'],
  [7, 77, 'jaapoexhiofgublhhygz'],
  [10, 77, 'yghvwuwrmlbjqnshcgtz'],
  [19, 91, 'ifahdebmwhxdvlqplmkv'],
  [6, 84, 'jrmltxvtkzwgxazdirzx'],
  [12, 85, 'oenpljzjhirkuofwxoaa'],
  [11, 90, 'atagwkwwifmxdyrhunbg'],
  [12, 70, 'dkvsbjhcbyfyereiquol'],
  [3, 87, 'drolersfwhxwtznjdlqn'],
  [6, 80, 'wnmkasbuzzrcmjpnnlxq'],
  [14, 75, 'qnkxsbfpcjyxoiuhmayo'],
  [8, 77, 'aivgjxucxczfcksnntcb'],
  [16, 89, 'aivgjxucxcppwofjjbop'],
  [8, 71, 'bjqnshcgtzugpuiqxrix'],
  [8, 90, 'ppwofjjbopalmcwgrlbt'],
  [2, 80, 'woqzpwdvkggqlwpknbre'],
  [4, 91, 'kihnqpkdnpddkscwwukr'],
  [0, 92, 'yrozzqjfpwdyqiktzxzd'],
  [14, 77, 'xwtznjdlqneinwxhebpx'],
  [8, 80, 'aivgjxucxcckpykeqotx'],
  [19, 81, 'zjxonvwegyliyebrhvly'],
  [0, 81, 'flfdrgxydinrmweeookb'],
  [8, 87, 'xwtznjdlqngolgpodtst'],
  [2, 89, 'ugpuiqxrixwpekdpleex'],
  [14, 75, 'rnrrtctrppcxzsgwbuya'],
  [9, 69, 'ddkscwwukrkmhdlumrhe'],
  [0, 86, 'mftcndxoawnkmjxdairm'],
  [11, 75, 'liyebrhvlyaivgjxucxc'],
  [3, 83, 'einwxhebpxzjxonvwegy'],
  [18, 73, 'qdjmlcbomidkvsbjhcby'],
  [9, 78, 'nkmjxdairmwdtrrypqpp'],
  [10, 92, 'rfzhjgbwblbojghfaeyj'],
  [16, 85, 'syqnzeuiccqyudukojnh'],
  [3, 85, 'yxoiuhmayomuzickfwmc'],
  [11, 85, 'byxvcuhsdutwpejgmlpr'],
  [2, 75, 'bnfilcejtsaqccjiakey'],
  [18, 90, 'kgbzfeembzlyqkoqacwn'],
  [10, 75, 'woqzpwdvkgrrfwbqahzv'],
  [10, 82, 'ugpuiqxrixkmhdlumrhe'],
  [13, 72, 'jaapoexhiorzagjaymua'],
  [4, 76, 'jrmltxvtkzjaapoexhio'],
  [15, 73, 'wgxazdirzxqnkxsbfpcj'],
  [2, 93, 'woqzpwdvkgxwtznjdlqn'],
  [2, 81, 'wpekdpleexddkscwwukr'],
  [14, 86, 'fgublhhygzdyqiktzxzd'],
  [0, 72, 'klyavotxsprznhvdcnxw'],
  [8, 87, 'muzickfwmcbtgocgreqk'],
  [13, 85, 'bnfilcejtsjaapoexhio'],
  [8, 81, 'fyereiquoljrmltxvtkz'],
  [11, 71, 'woqzpwdvkgwoqzpwdvkg'],
  [18, 90, 'xdvlqplmkvwpekdpleex'],
  [11, 93, 'zazqaqmdlypayzavecpn'],
  [3, 75, 'ckpykeqotxtwpejgmlpr'],
  [6, 89, 'dkvsbjhcbynabhtuhinw'],
  [18, 70, 'liyebrhvlykmhdlumrhe'],
  [17, 87, 'klyavotxspfyereiquol'],
  [7, 87, 'yrozzqjfpwsioefulviv'],
  [15, 79, 'yghvwuwrmlungxuzubkh'],
  [17, 71, 'lyqkoqacwnyghvwuwrml'],
  [4, 76, 'rkuofwxoaakmhdlumrhe'],
  [0, 92, 'ifahdebmwhatagwkwwif'],
  [8, 77, 'kgbzfeembzmxdyrhunbg'],
  [6, 92, 'byxvcuhsduwnmkasbuzz'],
  [9, 74, 'wdtrrypqppnfvonauqnt'],
  [18, 89, 'nfvonauqntpayzavecpn'],
  [11, 88, 'yxoiuhmayojaapoexhio'],
  [4, 75, 'ddkscwwukrosugrmdjfh'],
  [18, 92, 'wgxazdirzxmgebaorzfz'],
  [11, 72, 'yxoiuhmayobyxvcuhsdu'],
  [3, 86, 'syqnzeuiccdrolersfwh'],
  [5, 93, 'muzickfwmcnfvonauqnt'],
  [0, 76, 'hlimdfbfnvwgxazdirzx'],
  [13, 86, 'aqccjiakeybjqnshcgtz'],
  [19, 90, 'nkmjxdairmxuvgacodjm'],
  [2, 76, 'syqnzeuicccnprmnysoq'],
  [17, 72, 'kgbzfeembzjrmltxvtkz'],
  [9, 73, 'eulfdxogtrliyebrhvly'],
  [3, 69, 'oenpljzjhibyxvcuhsdu'],
  [19, 76, 'ugpuiqxrixzazqaqmdly'],
  [15, 86, 'atagwkwwifbyxvcuhsdu'],
  [5, 82, 'nrmweeookbrkuofwxoaa'],
  [4, 74, 'qdjmlcbomikihnqpkdnp'],
  [4, 82, 'surxqvqterfgublhhygz'],
  [8, 73, 'nkmjxdairmliyebrhvly'],
  [5, 72, 'ckpykeqotxlyqkoqacwn'],
  [13, 72, 'qdjmlcbomirfzhjgbwbl'],
  [2, 73, 'wpekdpleexliyebrhvly'],
  [12, 90, 'nkmjxdairmngtfmelzsc'],
  [4, 72, 'twpejgmlpreulfdxogtr'],
  [5, 93, 'rnrrtctrppzazqaqmdly'],
  [14, 83, 'syqnzeuiccatagwkwwif'],
  [3, 74, 'qdjmlcbomisioefulviv'],
  [18, 85, 'qnkxsbfpcjdkvsbjhcby'],
  [14, 86, 'xwtznjdlqneulfdxogtr'],
  [1, 93, 'ifahdebmwhqnkxsbfpcj'],
  [5, 79, 'ckpykeqotxgqlwpknbre'],
  [1, 79, 'liyebrhvlymojmqgajfu'],
]


/*
const genes = ['a', 'b', 'c', 'aa', 'd', 'b']
const health = [1, 2, 3, 4, 5, 6]
const strands = [
  [1, 5, 'caaab'],
  [0, 4, 'xyz'],
  [2, 4, 'bcdybc'],
]
*/

/*
const genes = ['a', 'b', 'c', 'aa', 'd', 'b', 'b']
const health = [1, 2, 3, 4, 5, 6, 7]
const strands = [
  [1, 6, 'caaab'],
  [0, 4, 'xyz'],
  [2, 4, 'bcdybc'],
]
*/

/*
const genes = ['a', 'b', 'c', 'aa', 'd', 'b']
const health = [6, 5, 4, 3, 2, 1]
const strands = [
  [1, 5, 'caaab'],
  [0, 4, 'xyz'],
  [2, 4, 'bcdybc'],
]
*/

const genesLookup = {}
let minSize = Infinity
let maxSize = 1
let geneSizes = []

function addGeneToLookup(gene, index) {
  const geneLength = gene.length

  const foundSize = geneSizes.find(geneSize => geneSize === geneLength)

  if (foundSize === undefined) {
    geneSizes = [...geneSizes, geneLength]
  }

  minSize = geneLength < minSize ? geneLength : minSize
  maxSize = geneLength > maxSize ? geneLength : maxSize

  genesLookup[gene] = genesLookup[gene] ? {
    healthValues: [...genesLookup[gene].healthValues, health[index]],
  } : {
    healthValues: [health[index]],
  }
}

function createGenesLookup() {
  genes.map(addGeneToLookup)
  // console.log(geneSizes)
}

function getGenesBlockHealthValue(block, first, last) {
  let genesBlockHealth = []
  let firstMatchFound = false

  if (block.length === 1) {
    const { healthValues } = genesLookup[block[0]]

    if (healthValues.length === 1) {
      for (let i = first; i <= last; i += 1) {
        if (health[i] === healthValues[0]) {
          genesBlockHealth = [...genesBlockHealth, healthValues[0]]
        }
      }
    }

    if (healthValues.length > 1) {
      healthValues.map((healthValue) => {
        for (let i = first; i <= last; i += 1) {
          if (health[i] === healthValue) {
            genesBlockHealth = [...genesBlockHealth, healthValue]
          }
        }
        return false
      })
    }
  }

  if (block.length > 1) {
    block.map((gene) => {
      const { healthValues } = genesLookup[gene]

      if (!firstMatchFound) {
        if (healthValues.length === 1) {
          for (let i = first; i <= last; i += 1) {
            if (health[i] === healthValues[0]) {
              genesBlockHealth = [...genesBlockHealth, healthValues[0]]
              firstMatchFound = true
            }
          }
        }

        if (healthValues.length > 1) {
          healthValues.map((healthValue) => {
            for (let i = first; i <= last; i += 1) {
              if (health[i] === healthValue) {
                genesBlockHealth = [...genesBlockHealth, healthValue]
                firstMatchFound = true
              }
            }
            return false
          })
        }
      }
      return false
    })
  }

  return genesBlockHealth
}

/*
function addCandidates(geneSize, d, candidates) {
  const candidate = d.substring(index, index + geneSize)
  // console.log(candidate, geneSize)
  candidates = (genesLookup[candidate] && candidate.length === geneSize) ? [...candidates, candidate] : candidates
  return false
}
*/

function processStrand({
  first,
  last,
  d,
}) {
  // console.log(minSize, maxSize, first, last, d)
  let geneCombinations = []
  // const strand = d.substring(0, d.length - minSize + 1).split('')
  const strand = d.split('')

  // console.log(strand)
  let candidates = []
  let firstCharIndex = 0
  let lastCharIndex = strand.length - 1

  for (firstCharIndex; firstCharIndex <= lastCharIndex; firstCharIndex += 1) {
    for (let a = 0; a <= geneSizes.length - 1; a += 1) {
      const candidate = d.substring(firstCharIndex, firstCharIndex + geneSizes[a])

      if (genesLookup[candidate] && candidate.length === geneSizes[a]) {
        candidates = [...candidates, candidate]
        console.log('before: ' + strand)
        console.log(firstCharIndex)
        console.log('candidate: ' + candidate)
        strand.splice(firstCharIndex, geneSizes[a])
        console.log('after: ' + strand)
        firstCharIndex = -1
        lastCharIndex = strand.length - 1
        console.log('last: '  + lastCharIndex)
      }
    }

    if (candidates.length > 0) {
      // console.log(candidates)
      geneCombinations = [...geneCombinations, candidates]
    }

    /*
    geneSizes.map((geneSize) => {
      const candidate = d.substring(index, index + geneSize)
      // console.log(candidate, geneSize)
      candidates = (genesLookup[candidate] && candidate.length === geneSize) ? [...candidates, candidate] : candidates
      return false
    })
    */

    /*
    if (strand[firstCharIndex] === 'b') {
      console.log('found at ' + firstCharIndex)
      strand.splice(0, firstCharIndex)
      console.log('new length: ' + strand.length)
      lastCharIndex = strand.length - 1
      firstCharIndex = 0
    }
    */
  }

  /*
  strand.map((gene, index) => {
    let candidates = []

    geneSizes.map((geneSize) => {
      const candidate = d.substring(index, index + geneSize)
      // console.log(candidate, geneSize)
      candidates = (genesLookup[candidate] && candidate.length === geneSize) ? [...candidates, candidate] : candidates
      return false
    })

    if (candidates.length > 0) {
      // console.log(candidates)
      geneCombinations = [...geneCombinations, candidates]
    }
    return false
  })
  */

  // console.log(geneCombinations)

  let geneBlockHealthValues = []

  if (geneCombinations.length > 0) {
    for (let i = 0; i <= geneCombinations.length - 1; i += 1) {
      const block = getGenesBlockHealthValue(geneCombinations[i], first, last)

      if (block.length === 1) {
        geneBlockHealthValues = [...geneBlockHealthValues, block[0]]
      }

      if (block.length > 1) {
        for (let h = 0; h <= block.length - 1; h += 1) {
          geneBlockHealthValues = [...geneBlockHealthValues, block[h]]
        }
      }
    }
  }

  return geneBlockHealthValues
}

function processStrandHealthValues(strandHealthValues) {
  // console.log(strandHealthValues)

  const healthSums = strandHealthValues.map((strand) => {
    let sum = 0

    if (strand.length > 0) {
      strand.map((healthValue) => {
        sum += healthValue
        return false
      })
    }
    return sum
  })

  const maxHealth = Math.max.apply(null, healthSums)
  const minHealth = Math.min.apply(null, healthSums)
  const values = [minHealth, maxHealth]

  return values
}

const main = () => {
  console.time('GenesLookup')
  createGenesLookup()
  
  //console.log(genesLookup)
  // console.log(`Min: ${minSize} - Max gene size: ${maxSize} - Set: ${geneSizes}`)

  let strandHealthValues = []

  strands.map((strand) => {
    const strandData = {
      first: strand[0],
      last: strand[1],
      d: strand[2],
    }

    const strandHealthValue = processStrand(strandData)
    strandHealthValues = [...strandHealthValues, strandHealthValue]
    // console.log(strandHealthValue)
    return false
  })

  // console.log(strandHealthValues)
  const maxMinHealth = processStrandHealthValues(strandHealthValues)
  // console.log(maxMinHealth[0], maxMinHealth[1])
  // console.log('3218660 11137051 = Correct answer')
  console.timeEnd('GenesLookup')
  // console.log(genesLookup)
}

/*
function createGenes(genesString) {
  return new Promise((resolve) => {
    resolve(genesString.split(' '))
  })
}

createGenes(rawGenes).then((resolveGenes) => {
  genes = resolveGenes
  // console.log(genes)
  return new Promise((resolve) => {
    const healthStrings = rawHealth.split(' ')
    resolve(healthStrings)
  })
}).then((resolveHealthStrings) => {
  const healthStrings = resolveHealthStrings
  // console.log(healthStrings)
  return new Promise((resolve) => {
    healthStrings.map((healthString) => {
      health = [...health, parseInt(healthString, 10)]
      return false
    })
    resolve(health)
  })
}).then(() => {
  main()
  return false
})
*/

main()
