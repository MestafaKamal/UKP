/*
Density-oredered greedy heuristic

*/
function DOG_UKP(W, val, wt) {

    P = 0;
    Zg = 0;
    X = []
    for (i = 0; i < wt.length; i++) {
        X.push({weight: wt[i], value: val[i]})
    }
    X.sort((a, b) => (a.value / a.weight) - (b.value / b.weight)).reverse()

    W1 = W;
    i = 0;
    while(i < wt.length && W1 > 0){
        Xi = W1 / X[i].weight;   
        P = P + X[i].weight * Xi;
        Zg = Zg + X[i].value * Xi;
        W1 = W1 - P;
    }

     
    return Zg;
}

W = 17
wt = [2, 3, 5]
val = [50, 100, 140]

console.log(DOG_UKP(W,val, wt))
