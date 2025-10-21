const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const n = Number(input[0])
let arr = input[1].split(" ").map(Number)

// DP 테이블 1로 초기화
let dp = Array(n).fill(1)

for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
        if (arr[j] < arr[i])
            dp[i] = Math.max(dp[i], dp[j] + 1)
    }
}

// 가장 긴 증가하는 부분 수열의 길이값
console.log(Math.max(...dp))