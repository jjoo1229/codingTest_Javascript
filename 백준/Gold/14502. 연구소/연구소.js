const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./thisIsCodingTest/dfs_bfs/input.txt")
    .toString()
    .trim()
    .split("\n")

const [N, M] = input[0].split(" ").map(Number)
const graph = []
for (let i = 1; i <= N; i++) {
    graph.push(input[i].split(" ").map(Number))
}

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]

let maxSafe = 0;

// 바이러스 확산 (BFS)
// map의 값이 바뀌기 때문에 visited 배열을 따로 만들지 않음
function spreadVirus(map) {
    const queue = [];
    const temp = map.map(row => [...row]); // 깊은 복사

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (temp[i][j] === 2) queue.push([i, j]);   // 바이러스 위치 큐에 추가
        }
    }

    while (queue.length) {  // 바이러스가 상하좌우로 확산
        const [x, y] = queue.shift();
        for (let d = 0; d < 4; d++) {
            const nx = x + dx[d];
            const ny = y + dy[d];

            if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
                if (temp[nx][ny] === 0) {
                    temp[nx][ny] = 2;
                    queue.push([nx, ny]);
                }
            }
        }
    }

    // 안전 영역 계산
    let safe = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (temp[i][j] === 0) safe++;
        }
    }
    return safe;
}

// 벽 세우기 (DFS)
// 벽을 정확히 3개만 세워야 하고, 재귀 호출로 다음 벽을 세운 뒤 백트래킹해야 하므로 DFS 사용
// 한 번 벽을 세우면 바이러스 전파 과정에서 그래프가 1로 바꾸기 때문에, 재귀 깊이가 끝나기 전까지는 다시 선택하지 않아서 visited 배열이 필요 없음
function makeWall(count) {
    if (count === 3) {  // 벽이 3개면
        maxSafe = Math.max(maxSafe, spreadVirus(graph));  // 안전 영역 크기의 최댓값 업데이트
        return;
    }

    // 전체 영역을 돌면서 벽 세우기
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (graph[i][j] === 0) {
                graph[i][j] = 1;   // 벽 세우기
                makeWall(count + 1);
                graph[i][j] = 0;   // 원상 복구 (백트래킹)
            }
        }
    }
}

makeWall(0);
console.log(maxSafe);