// 1. dp 풀이
const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, d] = input[0].split(" ").map(Number)
let graph = input.slice(1).map(line => line.split(" ").map(Number)).filter(([s, a, l]) => a <= d && l < a - s)

const dp = Array(d + 1).fill(Infinity)
dp[0] = 0

// 지름길들을 start 기준으로 묶음
const shortCuts = {}
for (let [start, arrive, length] of graph) {
    if (!shortCuts[start]) shortCuts[start] = []
    shortCuts[start].push({ arrive, length })
}

for (let i = 0; i < d; i++) {
    dp[i + 1] = Math.min(dp[i + 1], dp[i] + 1)

    if (shortCuts[i]) {
        for (let sc of shortCuts[i]) {
            dp[sc.arrive] = Math.min(dp[sc.arrive], dp[i] + sc.length)
        }
    }
}

console.log(dp[d])