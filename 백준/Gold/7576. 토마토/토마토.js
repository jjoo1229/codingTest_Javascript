const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")

const [m, n] = input[0].split(" ").map(Number)
let graph = []

for (let i = 1; i <= n; i++) {
    graph.push(input[i].split(" ").map(Number))
}

// bfs로 토마토 전파하기

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]

let queue = []
let head = 0  // 시간초과 방지를 위한 인덱스 포인터

for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (graph[i][j] == 1) {
            queue.push([i, j])  // 익은 토마토를 모두 큐에 넣음
        }
    }
}

while (head < queue.length) {
    let [x, y] = queue[head++]  // shift 연산 대신 사용: O(n) → O(1)

    for (let i = 0; i < 4; i++) {
        let nx = x + dx[i]
        let ny = y + dy[i]

        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue

        if (graph[nx][ny] == 0) {
            graph[nx][ny] = graph[x][y] + 1  // 그래프 값 자체를 변형시켜서 기록한다
            queue.push([nx, ny])
        }
    }
}

let days = 0
for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (graph[i][j] == 0) {  // 그래프에 아직 0이 남아있으면 -1 출력
            console.log(-1)
            process.exit(0)  // 즉시 프로그램 종료
        }
        days = Math.max(days, graph[i][j])  // 모든 칸을 돌면서 가장 늦게 익은 토마토의 값을 찾아줌
    }
}

console.log(days - 1)  // 처음에 1에서 시작해서 더해갔기 때문에 -1 해줌