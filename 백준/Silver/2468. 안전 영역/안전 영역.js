const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")

const n = Number(input[0])
let list = new Set()
let graph = []
for (let i = 1; i <= n; i++) {
    let g = input[i].split(" ").map(Number)
    graph.push(g)

    for (let a of g) list.add(a)
}
let arr = [...list].sort((a, b) => a - b)
let arrMax = Math.max(...arr)

const dx = [0, 0, -1, 1]
const dy = [-1, 1, 0, 0]
let visited = Array.from({ length: n }, () => Array(n).fill(false))

const bfs = (x, y, a) => {
    let queue = [[x, y]]
    visited[x][y] = true

    while (queue.length) {
        let [x, y] = queue.shift()

        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue

            if (!visited[nx][ny] && graph[nx][ny] > a) {
                queue.push([nx, ny])
                visited[nx][ny] = true
            }
        }
    }
}

let countArr = []
for (let a = 0; a <= arrMax; a++) {
    visited = Array.from({ length: n }, () => Array(n).fill(false))
    let count = 0

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (!visited[i][j] && graph[i][j] > a) {
                bfs(i, j, a)
                count++
            }
        }
    }
    countArr.push(count)
}

console.log(Math.max(...countArr))