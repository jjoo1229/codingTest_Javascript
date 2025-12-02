const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, m] = input[0].split(" ").map(Number)
let graph = []
for (let i = 1; i <= n; i++) {
    graph.push(input[i].trim().split(""))
}

let visited = Array.from({ length: n }, () => Array(m).fill(false))
const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]
let meet = 0

const bfs = (x, y) => {
    let queue = [[x, y]]
    visited[x][y] = true

    while (queue.length) {
        let [x, y] = queue.shift()

        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue
            if (graph[nx][ny] !== "X" && !visited[nx][ny]) {
                visited[nx][ny] = true
                queue.push([nx, ny])
                if (graph[nx][ny] === "P") meet++
            }
        }
    }
    console.log(meet === 0 ? "TT" : meet)
}


for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (graph[i][j] === "I") bfs(i, j)
    }
}