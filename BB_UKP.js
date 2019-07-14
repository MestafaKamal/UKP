/*
Rédaction de l'explication du branch and bound pour le knapsack UNBOUND
Pour chaque objet on peut en prendre autant qu'on le veut
Pour le branch and bound il dit il a déduit son code du support du cours


Afin de résoudre le problème avec la méthode de Branch and Bound, on commence par poser une solution première que l'on essaye d'améliorer. La solution première est composée d'un tuple d'objets ayant les plus grands rapports valeur/poids, c'est à dire qu'on cherche des objects ayant de grandes valeurs par rapport à leurs poids.

*/


function Knapsack_BB(W, wt, v) {
    nodes = []
    sortedObjects = sortObjects(wt, v)
    AcctualSolution = findSolution(W, X)
    tuple = [-1]
    separationArray = separate(W, sortedObjects, tuple)
    console.log("separationArray " + separationArray)
    for (let i of separationArray) {
        tuple[0] = i
        evaluation = evaluate(W, sortedObjects, tuple)
        if (evaluation.isAsloution) {
            if (evaluation.value > AcctualSolution.value) {
                AcctualSolution.value = evaluation.value
                AcctualSolution.tuple = evaluation.tuple
            }
        } else {
            if (evaluation.value > AcctualSolution.value + 1)
                nodes.push({depth: 0, tuple: [...tuple], eval: evaluation.value}) //depth n'est pas nécessaire
        }
    }
    while (nodes.length) {
        activeNode = nodes.pop()
        if (activeNode.eval > AcctualSolution.value + 1) {
            tuple = activeNode.tuple
            tuple.push(-1)
            separationArray = separate(W, sortedObjects, tuple)
            for (let i of separationArray) {
                tuple[activeNode.depth + 1] = i
                evaluation = evaluate(W, sortedObjects, tuple)
                if (evaluation.isAsloution) {
                    if (evaluation.value > AcctualSolution.value) {
                        AcctualSolution.value = evaluation.value
                        AcctualSolution.tuple = evaluation.tuple
                    }
                } else {
                    if (evaluation.value > AcctualSolution.value + 1)
                        nodes.push({depth: activeNode.depth + 1, tuple: [...tuple], eval: evaluation.value})
                }
            }
        }
    }
    return AcctualSolution
}

function separate(W, sortedObjects, tuple) {
    j = 0
    for (i of tuple) {
        if (i != -1) {
            W -= i * sortedObjects[j].weight
            j++
        }
    }
    maxIndex = 0
    while (1) {
        if (W - (maxIndex + 1) * sortedObjects[j].weight >= 0)
            maxIndex++
        else break
    }
    returnedArray = []
    for (i = 0; i <= maxIndex; i++)
        returnedArray.push(i)
    return returnedArray
}

function isAsoltion(W, sortedObjects, tuple) {
    j = 0
    for (i of tuple) {
        W -= i * sortedObjects[j].weight
        j++
    }
    while (j < sortedObjects.length) {
        if (W - sortedObjects[j].weight >= 0)
            break
        else j++
    }
    return j === sortedObjects.length
}

function evaluate(W, sortedObjects, tuple) {

    if (isAsoltion(W, sortedObjects, tuple)) {
        sum = 0
        for (i = 0; i < tuple.length; i++) {
            sum += tuple[i] * sortedObjects[i].value
        }
        while (tuple.length < sortedObjects.length)
            tuple.push(0)
        return {isAsloution: true, value: sum, tuple: tuple}
    }
    j = 0
    sum = 0
    for (i of tuple) {
        W -= i * sortedObjects[j].weight
        sum += i * sortedObjects[j].value
        j++
    }
    // console.log("tuple== ",tuple)
    // console.log("j== ",j)
    sum += (W / sortedObjects[j].weight) * sortedObjects[j].value
    return {isAsloution: false, value: sum, tuple: tuple}
}

function sortObjects(wt, v) {
    X = []
    for (i = 0; i < wt.length; i++) {
        X.push({weight: wt[i], value: v[i]})
    }
    X.sort((a, b) => (a.value / a.weight) - (b.value / b.weight)).reverse()
    return X
}

function findSolution(W, sortedObjects) {
    objIndex = 0
    val = 0
    tuple = Array(sortedObjects.length).fill(0)
    while (objIndex < sortedObjects.length) {
        if (W >= sortedObjects[objIndex].weight) {
            W -= sortedObjects[objIndex].weight
            val += sortedObjects[objIndex].value
            tuple[objIndex]++
        } else
            objIndex++
    }
    return {tuple: tuple, value: val}
}

v = [ 50, 100, 140]
wt = [2,3,5]
X = sortObjects(wt, v)
console.log("sorted objects:")
console.log(X)
console.log("----")
// console.log(isAsoltion(130, X, [3]) )
console.log(Knapsack_BB(17, wt, v))
