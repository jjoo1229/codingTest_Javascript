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

const dx = [1, 0]
const dy = [0, 1]
let visited = Array.from({ length: n }, () => Array(n).fill(false))

const dfs = (x, y) => {
    let stack = [[x, y]]
    visited[x][y] = true

    while (stack.length) {
        let [x, y] = stack.pop()

        if (x === n - 1 & y === n - 1) {
            console.log("HaruHaru")
            return
        }
        for (let i = 0; i < 2; i++) {
            let move = graph[x][y]
            let nx = x + dx[i] * move
            let ny = y + dy[i] * move

            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue
            if (!visited[nx][ny]) {
                stack.push([nx, ny])
                visited[nx][ny] = true
            }
        }
    }
    console.log("Hing")
}
dfs(0, 0)