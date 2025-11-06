const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, m] = input[0].split(" ").map(Number)
let graph = []
for (let i = 1; i <= n; i++) {
    graph.push(input[i].split(" ").map(Number))
}

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]

// 외부 공기 처리: queue에는 공기 담음, melt에는 녹을 치즈 담음
const bfs = (melt, visited) => {
    let queue = [[0, 0]]
    visited[0][0] = true

    while (queue.length) {
        let [x, y] = queue.shift()

        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue
            if (!visited[nx][ny]) {
                visited[nx][ny] = true

                if (graph[nx][ny] === 0) {  // 공기
                    queue.push([nx, ny])
                }
                else if (graph[nx][ny] === 1) {  // 치즈
                    melt.push([nx, ny])
                }
            }
        }
    }
}

let time = 0
let lastCheese = 0

while (true) {
    let visited = Array.from({ length: n }, () => Array(m).fill(false))
    let melt = []
    bfs(melt, visited)

    // 남은 치즈가 0인지 확인
    if (melt.length === 0) break
    lastCheese = melt.length  // 마지막 남은 치즈

    for (const [x, y] of melt) graph[x][y] = 0  // 치즈가 녹음 (1 → 0)

    time++
}
console.log(time)
console.log(lastCheese)