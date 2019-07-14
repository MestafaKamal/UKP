/*
UKP with dynamic programming

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
