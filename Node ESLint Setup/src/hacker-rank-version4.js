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

function processStrand({
  first,
  last,
  d,
}) {
  let geneCombinations = []
  const strand = d.substring(0, d.length - minSize + 1).split('')

  strand.map((gene, index) => {
    let candidates = []

    geneSizes.map((geneSize) => {
      const candidate = d.substring(index, index + geneSize)
      candidates = (genesLookup[candidate] && candidate.length === geneSize) ? [...candidates, candidate] : candidates
      return false
    })

    if (candidates.length > 0) {
      geneCombinations = [...geneCombinations, candidates]
    }
    return false
  })

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

function main() {
  const n = parseInt(readLine(), 10);

  genes = readLine().split(' ');

  health = readLine().split(' ').map(healthTemp => parseInt(healthTemp, 10));

  const s = parseInt(readLine(), 10);

  createGenesLookup()

  let strandHealthValues = []

  for (let sItr = 0; sItr < s; sItr++) {
    const firstLastd = readLine().split(' ');

    const first = parseInt(firstLastd[0], 10);

    const last = parseInt(firstLastd[1], 10);

    const d = firstLastd[2];

    const strandData = {
      first,
      last,
      d,
    }

    const strandHealthValue = processStrand(strandData)
    strandHealthValues = [...strandHealthValues, strandHealthValue]
  }

  const maxMinHealth = processStrandHealthValues(strandHealthValues)
  console.log(maxMinHealth[0], maxMinHealth[1])
}
