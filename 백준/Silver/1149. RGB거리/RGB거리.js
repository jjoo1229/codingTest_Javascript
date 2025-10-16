const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")

const n = Number(input[0])
let house = []
for (let i = 1; i <= n; i++) {
    house.push(input[i].split(" ").map(Number))
}

let dp = Array.from({ length: n + 1 }, () => Array(3))

dp[1] = [house[0][0], house[0][1], house[0][2]]

// dp[j][k]는 j번째 줄에 대해 j-1번째 줄(윗줄)에서 다른 인덱스 중 합이 더 적었던 경우에 대해 k번째 원소를 더한 값
// 따라서 dp[j][0]의 경우 dp[j-1][1]나 dp[j-1][2] 중 더 작은 값에 0번째 값을 더해준 값
for (let j = 2; j <= n; j++) {
    dp[j][0] = Math.min(dp[j - 1][1], dp[j - 1][2]) + house[j - 1][0]
    dp[j][1] = Math.min(dp[j - 1][0], dp[j - 1][2]) + house[j - 1][1]
    dp[j][2] = Math.min(dp[j - 1][0], dp[j - 1][1]) + house[j - 1][2]
}

console.log(Math.min(...dp[n]))