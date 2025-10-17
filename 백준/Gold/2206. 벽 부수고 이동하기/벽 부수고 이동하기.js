const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, m] = input[0].split(" ").map(Number)
let graph = []
for (let i = 1; i <= n; i++) {
    graph.push((input[i].trim().split("")).map(Number))
}

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]
let visited = Array.from({ length: n }, () => Array.from({ length: m }, () => Array(2).fill(0)))  // [x][y][z] 형태로 방문여부 저장, z = 0 or 1. 0이면 벽을 뚫지 않고 간 경우, 1이면 벽을 뚫고 간 경우

const bfs = () => {
    let queue = [[0, 0, 0]]
    let head = 0  // shift()연산에서 시간초과 방지를 위한 인덱스 포인터
    visited[0][0][0] = 1

    while (head < queue.length) {
        let [x, y, z] = queue[head++]  // shift 연산 대신 사용: O(n) → O(1)

        // 마지막 칸 도착 시 거리 리턴
        if (x == n - 1 && y == m - 1) return visited[x][y][z]

        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue

            if (visited[nx][ny][z] == 0 && graph[nx][ny] == 0) {  // 현재 위치로 이동할 수 있고 아직 방문하지 않았다면
                visited[nx][ny][z] = visited[x][y][z] + 1
                queue.push([nx, ny, z])
            } else if (graph[nx][ny] == 1 && z == 0) {  // 현재 위치가 벽이고 아직 부수지 않았다면(z==0)
                visited[nx][ny][z + 1] = visited[x][y][z] + 1  // 벽을 부수자(z+1)
                queue.push([nx, ny, z + 1])
            }
        }
    }
    return -1
}

console.log(bfs())