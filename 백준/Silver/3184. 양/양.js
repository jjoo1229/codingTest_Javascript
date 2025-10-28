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

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]
let visited = Array.from({ length: n }, () => Array(m).fill(false))

const bfs = (x, y) => {
    let queue = [[x, y]]
    visited[x][y] = true
    let sheep = 0
    let wolf = 0
    if (graph[x][y] == "o") sheep++
    else if (graph[x][y] == "v") wolf++

    while (queue.length) {
        let [x, y] = queue.shift()
        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            if (nx < 0 || nx >= n || ny < 0 || ny >= m || graph[nx][ny] == "#") continue
            if (!visited[nx][ny]) {
                if (graph[nx][ny] == "o") sheep++
                else if (graph[nx][ny] == "v") wolf++
                queue.push([nx, ny])
                visited[nx][ny] = true
            }
        }
    }
    return sheep > wolf ? [sheep, 0] : [0, wolf]
}

let sheep = 0
let wolf = 0
for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (!visited[i][j] & graph[i][j] !== "#") {
            let answer = bfs(i, j)
            sheep += answer[0]
            wolf += answer[1]
        }
    }
}
console.log(sheep, wolf)