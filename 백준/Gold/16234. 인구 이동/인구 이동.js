const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, l, r] = input[0].split(" ").map(Number)
let graph = []
for (let i = 1; i <= n; i++) graph.push(input[i].split(" ").map(Number))

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]

const spread = (arr) => {
    let n = arr.length
    let total = 0
    for (let [x, y] of arr) {
        total += graph[x][y]
    }
    return Math.floor(total / n)
}

let answer = 0

while (true) {
    let visited = Array.from({ length: n }, () => Array(n).fill(false))
    let moved = false

    const bfs = (x, y) => {
        let queue = [[x, y]]
        visited[x][y] = true
        let open = [[x, y]]

        while (queue.length) {
            let [x, y] = queue.shift()

            for (let i = 0; i < 4; i++) {
                let nx = x + dx[i]
                let ny = y + dy[i]

                if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue
                if (!visited[nx][ny] && Math.abs(graph[nx][ny] - graph[x][y]) >= l && Math.abs(graph[nx][ny] - graph[x][y]) <= r) {
                    visited[nx][ny] = true
                    queue.push([nx, ny])
                    open.push([nx, ny])
                }
            }
        }
        return open
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (!visited[i][j]) {
                let open = bfs(i, j)
                if (open.length > 1) {
                    let result = spread(open)
                    for (let [x, y] of open) {
                        graph[x][y] = result
                    }
                    moved = true
                }
            }
        }
    }
    if (moved == false) break
    answer++
}

console.log(answer)
