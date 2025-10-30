const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

let k = Number(input[0])
const [w, h] = input[1].split(" ").map(Number)
let graph = []
for (let i = 2; i <= h + 1; i++) {
    graph.push(input[i].split(" ").map(Number))
}

const dir = [[0, 1], [0, -1], [1, 0], [-1, 0]]
const horse = [[-2, -1], [-1, -2], [-2, 1], [-1, 2], [2, -1], [1, -2], [2, 1], [1, 2]]
// 말 점프 사용 횟수(k)에 따라 방문 여부가 달라짐 (같은 좌표라도 k가 다르면 다시 방문할 수 있어야 하므로, visited는 3차원 배열)
let visited = Array.from({ length: h }, () => Array.from({ length: w }, () => Array(k + 1).fill(false)))

const bfs = () => {
    let queue = [[0, 0, 0, k]]  // x, y, count, k
    visited[0][0][k] = true

    while (queue.length) {
        let [x, y, count, k] = queue.shift()
        if (x == h - 1 && y == w - 1) return count

        if (k > 0) {
            for (let i = 0; i < 8; i++) {
                let [nx, ny] = [x + horse[i][0], y + horse[i][1]]

                if (nx < 0 || nx >= h || ny < 0 || ny >= w) continue
                if (!visited[nx][ny][k - 1] && graph[nx][ny] !== 1) {
                    visited[nx][ny][k - 1] = true
                    queue.push([nx, ny, count + 1, k - 1])
                }
            }
        }
        for (let i = 0; i < 4; i++) {
            let [nx, ny] = [x + dir[i][0], y + dir[i][1]]

            if (nx < 0 || nx >= h || ny < 0 || ny >= w) continue
            if (!visited[nx][ny][k] && graph[nx][ny] !== 1) {
                visited[nx][ny][k] = true
                queue.push([nx, ny, count + 1, k])
            }
        }

    }
    return -1
}
console.log(bfs())
