'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

let genes = []
let health = []
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
  let firstMatchFound = false

  block.map((gene) => {
    const { healthValues, current } = genesLookup[gene]

    if (!firstMatchFound) {
      // console.log(gene, healthValues, current)

      if (healthValues.length === 1) {
        for (let i = first; i <= last; i += 1) {
          if (health[i] === healthValues[0]) {
            // console.log(`Single: ${healthValues[0]}`)
            genesBlockHealth = [...genesBlockHealth, healthValues[0]]
            firstMatchFound = true
          }
        }
      }

      if (healthValues.length > 1) {
        healthValues.map((healthValue) => {
          for (let i = first; i <= last; i += 1) {
            if (health[i] === healthValue) {
              // console.log(`Candidate: ${healthValue}`)
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
  return genesBlockHealth
}

function getGenesBlockHealthValue(genesBlock, first, last) {
  let genesBlockHealth = []

  if (genesBlock) {
    genesBlockHealth = processGeneBlock(genesBlock, first, last)
    // console.log('Returned gene block: ' + genesBlockHealth)
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
  // console.log(maxGeneSize, first, last, d)
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
  // console.log(filteredCombinations)

  let geneBlockHealthValues = []
  // console.log(filteredCombinations.length)

  for (let i = 0; i <= filteredCombinations.length - 1; i += 1) {
    const block = getGenesBlockHealthValue(filteredCombinations[i], first, last)
    if (block.length > 0) {
      // console.log('Gene block length: ' + block.length)
      for (let h = 0; h <= block.length - 1; h += 1) {
        geneBlockHealthValues = [...geneBlockHealthValues, block[h]]
      }
    }
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

function main() {
    const n = parseInt(readLine(), 10);

    genes = readLine().split(' ');

    health = readLine().split(' ').map(healthTemp => parseInt(healthTemp, 10));

    const s = parseInt(readLine(), 10);
    
    let strandHealthValues = []
    
    for (let sItr = 0; sItr < s; sItr++) {
        const firstLastd = readLine().split(' ');

        const first = parseInt(firstLastd[0], 10);

        const last = parseInt(firstLastd[1], 10);

        const d = firstLastd[2];
        
        createGenesLookup()
        // console.log(genesLookup)

        const maxGeneSize = getMaxGeneSize()
        // console.log(`Max gene size: ${maxGeneSize}`)

        const strandData = {
          maxGeneSize,
          first,
          last,
          d,
        }

        const strandHealthValue = processStrand(strandData)
        strandHealthValues = [...strandHealthValues, strandHealthValue]
        // console.log(strandHealthValue)
    }
    
    const maxMinHealth = processStrandHealthValues(strandHealthValues)
    console.log(maxMinHealth[0], maxMinHealth[1])
}
