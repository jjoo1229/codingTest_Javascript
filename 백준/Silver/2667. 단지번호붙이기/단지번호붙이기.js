const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")
const n = Number(input[0]);

let graph = []
for (let i = 1; i <= n; i++) {
    graph.push(input[i].split('').map(Number));
}

let visited = Array.from({ length: n }, () => Array(n).fill(false))

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]

const bfs = (x, y) => {
    let area = 1
    let queue = [[x, y]]
    visited[x][y] = true

    while (queue.length) {
        let [x, y] = queue.shift()

        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue

            if (!visited[nx][ny] && graph[nx][ny] == 1) {
                queue.push([nx, ny])
                visited[nx][ny] = true
                area++
            }
        }

    }
    return area
}

let answer = []
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (!visited[i][j] && graph[i][j] == 1) {
            answer.push(bfs(i, j))
        }
    }
}
answer.sort((a, b) => a - b)
console.log(answer.length)
for (let a of answer) console.log(a)