const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, m] = input[0].split(" ").map(Number)

let graph = []

for (let i = 1; i <= n; i++) {
    graph.push(input[i].split("").map(Number))
}

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]

const bfs = (x, y) => {
    let queue = [[x, y]]

    while (queue.length) {
        let [x, y] = queue.shift()

        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue

            if (graph[nx][ny] == 1) {
                queue.push([nx, ny])
                graph[nx][ny] += graph[x][y]
            }
        }
    }
    console.log(graph[n - 1][m - 1])
}

bfs(0, 0)