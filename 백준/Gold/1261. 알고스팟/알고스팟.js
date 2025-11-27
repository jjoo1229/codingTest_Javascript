const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [m, n] = input[0].split(" ").map(Number)
let graph = []
for (let i = 1; i <= n; i++) {
    graph.push(input[i].trim().split("").map(Number))
}

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]
let dist = Array.from({ length: n }, () => Array(m).fill(Infinity))  // 이 칸까지 오기 위해 부순 벽의 최소 개수

const bfs = () => {
    let queue = [[0, 0]]
    dist[0][0] = 0

    while (queue.length) {
        let [x, y] = queue.shift()

        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue

            // [nx, ny]까지 갔을 때 부순 벽 수의 총합 계산: 현재 칸까지 온 비용(dist[x][y]) + 다음 칸에서 드는 비용(graph[nx][ny])
            const cost = dist[x][y] + graph[nx][ny]

            // 기존보다 더 작은 비용으로 갈 수 있을 때만 갱신
            if (cost < dist[nx][ny]) {
                dist[nx][ny] = cost

                if (graph[nx][ny] === 1) {  // cost 1 → push(비용이 크므로 뒤로 보내서 나중에 처리)
                    queue.push([nx, ny])
                } else {  // cost 0 → unshift(비용이 없으므로 앞으로 보내서 먼저 처리)
                    queue.unshift([nx, ny])
                }
            }
        }
    }
    return dist[n - 1][m - 1]
}

console.log(bfs())