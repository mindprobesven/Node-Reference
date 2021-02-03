
/*
let genes = []
let health = []

const rawGenes = 'ogwwsenipa obsehkjfcj dhqvptquuu kkdgivnvfc ytdqxmciue rznhvdcnxw kihnqpkdnp hlimdfbfnv mguznrcpfc nrmweeookb drolersfwh ckpykeqotx sioefulviv wnmkasbuzz ddkscwwukr rfzhjgbwbl rzagjaymua mxdyrhunbg eulfdxogtr rnrrtctrpp tdmzbfgxsi fyereiquol liyebrhvly kgbzfeembz wgxazdirzx flfdrgxydi woqzpwdvkg ugpuiqxrix qnkxsbfpcj zazqaqmdly mgebaorzfz yxoiuhmayo lyqkoqacwn aivgjxucxc cxzsgwbuya klyavotxsp muzickfwmc aqccjiakey mojmqgajfu yrozzqjfpw jrmltxvtkz twpejgmlpr gqlwpknbre xdvlqplmkv ngtfmelzsc qyudukojnh nkmjxdairm fgublhhygz byxvcuhsdu btgocgreqk syqnzeuicc ifahdebmwh jaapoexhio rcmjpnnlxq nfvonauqnt xwtznjdlqn bjqnshcgtz yghvwuwrml kmhdlumrhe einwxhebpx bnfilcejts ufebiqxwjh cnprmnysoq rrfwbqahzv atagwkwwif dkvsbjhcby surxqvqter oenpljzjhi rkuofwxoaa osugrmdjfh bwoolbzmkh wdtrrypqpp qdjmlcbomi wpekdpleex nabhtuhinw zfcksnntcb dyqiktzxzd ungxuzubkh almcwgrlbt mftcndxoaw sxjawdzshl zjxonvwegy ysfruuxtiz payzavecpn ppwofjjbop bojghfaeyj golgpodtst hhifwprhqf xuvgacodjm orcbxrpbnj uwtebrtsyl zxfugizuli gzzjawcszp btnwxrnqlm enljjrrile ssdtdgsfar xdlmaidpbp dhepqngkws oomuipccwc ttfeihplxs'
const rawHealth = '4462805 1916916 2870812 3407597 5169525 4087301 4005965 1803633 3357388 1112112 5656776 4438527 3841975 4102090 2113339 2977711 1709727 1666821 4167887 3742911 1948785 3057238 1940358 4574138 4598641 2922682 1839758 4562812 1508583 2531144 3192788 4971388 3448060 2579952 4895338 5133938 5667253 5417655 3453923 3024642 5529768 3110699 3979521 5888095 3729142 2609212 2865806 1955221 3276034 3550045 4698132 1741171 5607283 5638490 2831662 1722277 2561172 3671420 5285089 5586108 5202564 4994229 2073848 5166977 1574181 5969186 1817267 1241435 2903194 1787542 5782429 4949314 1414593 1278302 4837409 4143735 2887514 4219567 5098956 2679900 1769612 1313440 5937424 3893247 3468283 2769086 2131876 5029455 2956858 3933318 2131915 4675774 2927547 3205764 1359103 1018081 5691302 2176370 3775868 2594496'
const strands = [
  [7, 93, 'zjxonvwegyeulfdxogtr'],
  [0, 77, 'dkvsbjhcbyrzagjaymua'],
  [13, 90, 'ddkscwwukrrfzhjgbwbl'],
]
*/

const genes = ['a', 'b', 'c', 'aa', 'd', 'b']
const health = [1, 2, 3, 4, 5, 6]
const strands = [
  [1, 5, 'caaab'],
  [0, 4, 'xyz'],
  [2, 4, 'bcdybc'],
]


/*
const genes = ['a', 'b', 'c', 'aa', 'd', 'b', 'a']
const health = [1, 2, 3, 4, 5, 6, 7]
const strands = [
  [0, 6, 'caaab'],
  [0, 4, 'axyaz'],
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

let genesLookup = {}

function createGenesLookup() {
  genesLookup = []
  genes.map((gene, index) => {
    genesLookup[gene] = genesLookup[gene] ? {
      healthValues: [...genesLookup[gene].healthValues, health[index]],
      current: genesLookup[gene].healthValues[0],
    } : {
      healthValues: [health[index]],
      current: health[index],
    }
    return false
  })
}

function getMaxGeneSize() {
  let maxSize = 1

  Object.keys(genesLookup).forEach((gene) => {
    const geneLength = gene.length
    maxSize = geneLength > maxSize ? geneLength : maxSize
  })

  return maxSize
}

function filterGeneCombinations(geneCombinations) {
  let filteredCombinations = []
  geneCombinations.map((set) => {
    let filteredSet = []
    set.map((geneToFilter) => {
      if (genesLookup[geneToFilter]) {
        filteredSet = [...filteredSet, geneToFilter]
      }
      return false
    })

    if (filteredSet.length > 0) {
      filteredCombinations = [...filteredCombinations, filteredSet]
    }

    return false
  })
  return filteredCombinations
}

function processGeneBlock(block, first, last) {
  let genesBlockHealth = []

  block.map((gene) => {
    const { healthValues, current } = genesLookup[gene]
    console.log(gene, healthValues, current)

    if (healthValues.length === 1) {
      for (let i = first; i <= last; i += 1) {
        if (health[i] === healthValues[0]) {
          // console.log('match')
          // console.log(`Single: ${healthValues[0]}`)
          genesBlockHealth = [...genesBlockHealth, healthValues[0]]
        }
      }
    }

    if (healthValues.length > 1) {
      let candidates = []
      healthValues.map((healthValue) => {
        for (let i = first; i <= last; i += 1) {
          if (health[i] === healthValue) {
            // console.log('match')
            // console.log(`Candidate: ${healthValue}`)
            candidates = [...candidates, healthValue]
          }
        }
        return false
      })

      candidates.map((candidate) => {
        if (candidate === current) {
          console.log(`Current: ${current}`)
          genesBlockHealth = [...genesBlockHealth, candidate]
        }
        return false
      })

      const currentIndex = healthValues.indexOf(current)
      if (healthValues[currentIndex + 1]) {
        genesLookup[gene].current = healthValues[currentIndex + 1]
      } else {
        const firstHealthValue = healthValues[0]
        genesLookup[gene].current = firstHealthValue
      }
    }

    return false
  })
  return genesBlockHealth
}

function getGenesBlockHealthValue(genesBlock, first, last, filteredCombinations) {
  let genesBlockHealth = []
  if (genesBlock) {
    genesBlockHealth = processGeneBlock(genesBlock, first, last)
    return genesBlockHealth
  }

  const lastGeneBlock = filteredCombinations[filteredCombinations.length - 1]
  if (lastGeneBlock) {
    genesBlockHealth = processGeneBlock(lastGeneBlock, first, last)
    return genesBlockHealth
  }
  return [0]
}

function processStrand({
  maxGeneSize,
  first,
  last,
  d,
}) {
  console.log(maxGeneSize, first, last, d)
  let geneCombinations = []
  const strand = d.split('')
  strand.map((gene, index) => {
    let candidates = []
    for (let chars = 1; chars <= maxGeneSize; chars += 1) {
      const candidate = d.substring(index, index + chars).trim()
      candidates = candidate.length === chars ? [...candidates, candidate] : candidates
    }
    geneCombinations = [...geneCombinations, candidates]
    return false
  })
  // console.log(geneCombinations)
  const filteredCombinations = filterGeneCombinations(geneCombinations)
  console.log(filteredCombinations)

  const totalHealthValues = last - first + 1
  console.log(`Total health values: ${totalHealthValues}`)

  let geneBlockHealthValues = []
  let geneBlockId = 0

  while (geneBlockHealthValues.length <= totalHealthValues - 1) {
    const block = getGenesBlockHealthValue(filteredCombinations[geneBlockId], first, last, filteredCombinations)
    if (block.length > 0) {
      geneBlockHealthValues = [...geneBlockHealthValues, block[0]]
    }
    geneBlockId += 1
  }

  return geneBlockHealthValues
}

function processStrandHealthValues(strandHealthValues) {
  // console.log(strandHealthValues)

  const healthSums = strandHealthValues.map((strand) => {
    let sum = 0
    strand.map((healthValue) => {
      sum += healthValue
      return false
    })
    return sum
  })

  const maxHealth = Math.max.apply(null, healthSums)
  const minHealth = Math.min.apply(null, healthSums)
  const values = [minHealth, maxHealth]

  return values
}

const main = () => {
  let strandHealthValues = []
  strands.map((strand) => {
    createGenesLookup()
    console.log(genesLookup)

    const maxGeneSize = getMaxGeneSize()
    console.log(`Max gene size: ${maxGeneSize}`)

    const strandData = {
      maxGeneSize,
      first: strand[0],
      last: strand[1],
      d: strand[2],
    }

    const strandHealthValue = processStrand(strandData)
    strandHealthValues = [...strandHealthValues, strandHealthValue]
    console.log(strandHealthValue)
    return false
  })

  // console.log(strandHealthValues)
  const maxMinHealth = processStrandHealthValues(strandHealthValues)
  console.log(maxMinHealth[0], maxMinHealth[1])
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
