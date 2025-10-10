const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")

const [M, N, H] = input.shift().split(" ").map(Number);
const graph = [];
for (let h = 0; h < H; h++) {
    const box = [];
    for (let n = 0; n < N; n++) {
        box.push(input.shift().split(" ").map(Number));
    }
    graph.push(box);
}

// 3차원 bfs로 토마토 전파하기
const dx = [1, -1, 0, 0, 0, 0];
const dy = [0, 0, 1, -1, 0, 0];
const dz = [0, 0, 0, 0, 1, -1];

let queue = []
let head = 0  // 시간초과 방지를 위한 인덱스 포인터

for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
        for (let k = 0; k < M; k++) {
            if (graph[i][j][k] == 1) {
                queue.push([i, j, k])  // 익은 토마토를 모두 큐에 넣음
            }
        }
    }
}

while (head < queue.length) {
    let [x, y, z] = queue[head++]  // shift 연산 대신 사용: O(n) → O(1)

    for (let i = 0; i < 6; i++) {
        let nx = x + dx[i]
        let ny = y + dy[i]
        let nz = z + dz[i]

        if (nx < 0 || nx >= H || ny < 0 || ny >= N || nz < 0 || nz >= M) continue

        if (graph[nx][ny][nz] == 0) {
            graph[nx][ny][nz] = graph[x][y][z] + 1  // 그래프 값 자체를 변형시켜서 기록한다
            queue.push([nx, ny, nz])
        }
    }
}

let days = 0
for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
        for (let k = 0; k < M; k++) {
            if (graph[i][j][k] == 0) {  // 그래프에 아직 0이 남아있으면 -1 출력
                console.log(-1)
                process.exit(0)  // 즉시 프로그램 종료
            }
            days = Math.max(days, graph[i][j][k])  // 모든 칸을 돌면서 가장 늦게 익은 토마토의 값을 찾아줌
        }
    }
}

console.log(days - 1)  // 처음에 1에서 시작해서 더해갔기 때문에 -1 해줌