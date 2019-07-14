/*
Apparemment regarde dynamic programming de UKP
Pour le DP normalement tu vas trouver sur google l'explication pour le cas UKP

*/

/*
Dans le cas de UKP, on peut prendre une ou plusieurs istance d'un objet. Afin de ustifier le problème par la programmation dynamique, nous définissons un sous problème propre à un sac à dos de capacté i compris entre 0 et W. Nous utilisons un vecteur dp[W+1] de sorte que 
dp[i] contient la valeur maximale pouvant être atteinte en utilisant tous les articles et un sac à dos de capacité i. 
A chaque itération de i, on parcours les objets et on choisit de prendre celui dont la valeur est supérieure à la valeur actuelle, et cela sans dépasser la capacité i du sac.
La solution au problème global est celle où i atteint W.

*/


function DP_UKP(W, val, wt) {
    dp = Array(W+ 1).fill(0)
    for (i = 0; i <= W; i++) {
        for (j = 0; j < wt.length; j++) {
            if (wt[j] <= i) {
            	
                dp[i] = Math.max(dp[i], dp[i - wt[j]] + val[j])
                console.log("i= " + i + "; j= "+ j + "; dpi= " + dp[i]) 
            }
        }
    }
    return dp[W]
}

W = 17
wt = [2, 3, 5]
val = [50, 100, 140]

console.log(DP_UKP(W,val, wt))
