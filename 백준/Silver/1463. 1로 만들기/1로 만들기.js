const n = Number(require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim())

let dp = Array(n + 1).fill(0)  // 1에서 n을 만드는 최소 연산 횟수: dp[n]

// Bottom-Up 방식의 dp
for (let i = 2; i < n + 1; i++) {
    // 1 빼는 경우
    dp[i] = dp[i - 1] + 1
    // 3으로 나눠떨어지는 경우
    if (i % 3 == 0) dp[i] = Math.min(dp[i], dp[i / 3] + 1)
    // 2로 나눠떨어지는 경우
    if (i % 2 == 0) dp[i] = Math.min(dp[i], dp[i / 2] + 1)
}

console.log(dp[n])