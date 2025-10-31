// dp 풀이

const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const n = Number(input[0])

let graph = []
for (let i = 1; i <= n; i++) {
    graph.push(input[i].split(" ").map(Number))
}

// dp[x][y][dir] 형식으로 저장할 것이기 때문에 3차원 배열 선언
// dir은 0(가로), 1(세로), 2(대각선)
let dp = Array.from({ length: n }, () => Array.from({ length: n }, () => Array(3).fill(0)))

// 초기 상태: (0, 1)에 가로 파이프(0)로 시작
dp[0][1][0] = 1

for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
        if (graph[x][y] == 1) continue

        // 가로 이동
        if (y + 1 < n && graph[x][y + 1] == 0) {
            dp[x][y + 1][0] += dp[x][y][0] + dp[x][y][2]
        }

        // 세로 이동
        if (x + 1 < n && graph[x + 1][y] == 0) {
            dp[x + 1][y][1] += dp[x][y][1] + dp[x][y][2]
        }

        // 대각선 이동
        if (x + 1 < n && y + 1 < n && graph[x + 1][y] == 0 && graph[x][y + 1] == 0 && graph[x + 1][y + 1] == 0) {
            dp[x + 1][y + 1][2] += dp[x][y][0] + dp[x][y][1] + dp[x][y][2]
        }
    }
}
let answer = dp[n - 1][n - 1][0] + dp[n - 1][n - 1][1] + dp[n - 1][n - 1][2]
console.log(answer)
