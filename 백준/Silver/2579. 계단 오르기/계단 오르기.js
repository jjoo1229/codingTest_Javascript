const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")
    .map(Number)

const n = input[0]

let dp = Array(n + 1)

dp[1] = input[1]  // 별도의 배열을 두지 않고 input을 그대로 갖다 쓴다
dp[2] = dp[1] + input[2]
dp[3] = Math.max(input[1], input[2]) + input[3]

for (let i = 4; i <= n; i++) {
    dp[i] = Math.max(dp[i - 3] + input[i - 1], dp[i - 2]) + input[i]
}

console.log(dp[n])