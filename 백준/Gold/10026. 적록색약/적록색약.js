const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const n = Number(input[0])
const graph = []
const graph2 = []

for (let i = 1; i <= n; i++) {
    graph.push(input[i].split(""))
    graph2.push(input[i].replaceAll("G", "R").split(""))
}

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]
let visited = Array.from({ length: n }, () => Array(n).fill(false))
let visited2 = Array.from({ length: n }, () => Array(n).fill(false))

// 색약 아닌 사람이 봤을 때
const bfs = (x, y) => {
    let queue = [[x, y]]
    visited[x][y] = true
    let color = graph[x][y]

    while (queue.length) {
        let [x, y] = queue.shift()

        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue
            if (!visited[nx][ny] && graph[nx][ny] == color) {
                queue.push([nx, ny])
                visited[nx][ny] = true
            }
        }
    }
}

// 색약인 사람이 봤을 때
const bfs2 = (x, y) => {
    let queue = [[x, y]]
    visited2[x][y] = true
    let color = graph2[x][y]

    while (queue.length) {
        let [x, y] = queue.shift()

        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue
            if (!visited2[nx][ny] && graph2[nx][ny] == color) {
                queue.push([nx, ny])
                visited2[nx][ny] = true
            }
        }
    }
}

let area = 0
let area2 = 0
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (!visited[i][j]) {
            bfs(i, j)
            area++
        }
        if (!visited2[i][j]) {
            bfs2(i, j)
            area2++
        }
    }
}
console.log(area, area2)