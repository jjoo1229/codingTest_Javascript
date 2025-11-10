const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, k] = input[0].split(" ").map(Number)

const dp = Array.from({ length: k + 1 }, () => Array(n + 1).fill(0))

// dp[i][j] : 숫자 i개끼리 더해서 j를 만드는 경우의 수

// 1개의 숫자로 특정 숫자 n을 만드는 경우의 수는 그 숫자(n) 하나로 만드는 경우 한 가지뿐이다.
for (let i = 0; i <= n; i++) dp[1][i] = 1

for (let i = 2; i <= k; i++) {
    for (let j = 0; j <= n; j++) {
        if (j == 0) dp[i][j] = 1
        else dp[i][j] = (dp[i][j - 1] + dp[i - 1][j]) % 1000000000
    }
}

console.log(dp[k][n])