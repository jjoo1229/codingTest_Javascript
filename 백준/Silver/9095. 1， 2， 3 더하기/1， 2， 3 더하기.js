const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")

const t = Number(input[0])

let dp = Array(11).fill(0)
dp[0] = 1
dp[1] = 1
dp[2] = 2
for (let d = 3; d <= 11; d++) {
    dp[d] = dp[d - 1] + dp[d - 2] + dp[d - 3]
}

for (let i = 1; i <= t; i++) {
    console.log(dp[Number(input[i])])
}