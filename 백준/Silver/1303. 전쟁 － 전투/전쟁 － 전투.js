const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, m] = input[0].split(" ").map(Number)
let graph = []
for (let i = 1; i <= m; i++) {
    graph.push(input[i].trim().split(""))
}

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]
let visited = Array.from({ length: m }, () => Array(n).fill(false))

const bfs = (x, y) => {
    let areaW = 0
    let areaB = 0
    let queue = [[x, y]]
    visited[x][y] = true
    if (graph[x][y] == "W") areaW++
    else areaB++

    while (queue.length) {
        let [x, y] = queue.shift()
        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue
            if (!visited[nx][ny] && graph[x][y] == graph[nx][ny]) {
                visited[nx][ny] = true
                queue.push([nx, ny])
                if (graph[nx][ny] == "W") {
                    areaW++
                } else {
                    areaB++
                }
            }
        }
    }
    return [areaW, areaB]
}

let areaW = 0
let areaB = 0

for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (!visited[i][j]) {
            let [w, b] = bfs(i, j)
            areaW += w * w
            areaB += b * b
        }
    }
}
console.log(areaW, areaB)