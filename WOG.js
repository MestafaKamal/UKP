/*
Weighted-oredered greedy heuristic
Cette heuristique est très simple. On choisit le poids comme critère du meilleur objet. On prend
l'objet du poids minimum et on remplit le sac à dos par autant d'exemplaires possible. 

La complexité de cette algorithme est O(n) dû à la recherche de l'objet de poids minimum. 
Dans le pire des cas, on parcourt tout les objets.
*/
function WOG_UKP(W, val, wt) {

    P = 0;
    Zg = 0;
    X = []
    for (i = 0; i < wt.length; i++) {
        X.push({weight: wt[i], value: val[i]})
    }
    X.sort((a, b) => (a.weight) - (b.weight));
        Xi = W / X[0].weight;   
        P = P + X[0].weight * Xi;
        Zg = Zg + X[0].value * Xi;
    return Zg;
}

W = 17
wt = [2, 3, 5]
val = [50, 100, 140]

console.log(WOG_UKP(W,val, wt))