const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, m, t] = input[0].split(" ").map(Number)
let graph = []
for (let i = 1; i <= n; i++) {
    graph.push(input[i].split(" ").map(Number))
}

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]

// visited[x][y][hasSword] => hasSword = 0 (일반), 1 (검을 가짐)
let visited = Array.from({ length: n }, () => Array.from({ length: m }, () => Array(2).fill(false)))

const bfs = () => {
    let queue = [[0, 0, 0, 0]] // x, y, time, hasSword
    visited[0][0][0] = true

    while (queue.length) {
        let [x, y, time, hasSword] = queue.shift()

        if (time > t) continue  // 시간 초과시 탈락

        if (x === n - 1 && y === m - 1) {
            console.log(time)
            return
        }

        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue

            // 검이 없으면
            if (hasSword === 0) {
                if (!visited[nx][ny][0] && graph[nx][ny] === 0) {
                    queue.push([nx, ny, time + 1, 0])
                    visited[nx][ny][0] = true
                } else if (!visited[nx][ny][0] && graph[nx][ny] === 2) {  // 검 찾은 경우
                    queue.push([nx, ny, time + 1, 1])
                    visited[nx][ny][1] = true
                }
            }
            // 검이 있으면
            else {
                if (!visited[nx][ny][1]) {
                    queue.push([nx, ny, time + 1, 1])
                    visited[nx][ny][1] = true
                }
            }
        }
    }
    console.log("Fail")
}
bfs()