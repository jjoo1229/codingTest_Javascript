// dfs 풀이

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

let answer = 0

// dir은 0(가로), 1(세로), 2(대각선)
const dfs = (x, y, dir) => {
    if (x == n - 1 && y == n - 1) {
        answer++
        return
    }

    // 가로 이동
    if (dir == 0 || dir == 2) {
        if (y + 1 < n && graph[x][y + 1] == 0) {
            dfs(x, y + 1, 0)
        }
    }

    // 세로 이동
    if (dir == 1 || dir == 2) {
        if (x + 1 < n && graph[x + 1][y] == 0) {
            dfs(x + 1, y, 1)
        }
    }

    // 대각선 이동
    if (x + 1 < n && y + 1 < n && graph[x + 1][y] == 0 && graph[x][y + 1] == 0 && graph[x + 1][y + 1] == 0) {
        dfs(x + 1, y + 1, 2)
    }
}

dfs(0, 1, 0) // (0, 1)에서 시작, 가로 방향
console.log(answer)