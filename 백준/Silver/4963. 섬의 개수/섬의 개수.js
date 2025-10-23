const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const countNumber = (graph) => {
    const n = graph.length  // h
    const m = graph[0].length  // w
    const dx = [-1, -1, -1, 0, 0, 1, 1, 1]
    const dy = [-1, 0, 1, -1, 1, -1, 0, 1]

    let visited = Array.from({ length: n }, () => Array(m).fill(false))

    const bfs = (x, y) => {
        let queue = [[x, y]]
        visited[x][y] = true

        while (queue.length) {
            let [cx, cy] = queue.shift()

            for (let i = 0; i < 8; i++) {
                let nx = cx + dx[i]
                let ny = cy + dy[i]

                if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue
                if (!visited[nx][ny] & graph[nx][ny] == 1) {
                    queue.push([nx, ny])
                    visited[nx][ny] = true
                }
            }
        }
    }

    let count = 0
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (!visited[i][j] & graph[i][j] == 1) {
                bfs(i, j)
                count++
            }
        }
    }
    return count
}

let i = 0
while (true) {
    let [w, h] = input[i].split(" ").map(Number)
    if (w == 0 && h == 0) break
    let graph = []
    for (let j = i + 1; j <= i + h; j++) {
        graph.push(input[j].split(" ").map(Number))
    }
    console.log(countNumber(graph))
    i += h + 1
}