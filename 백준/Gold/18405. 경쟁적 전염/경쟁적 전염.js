const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./thisIsCodingTest/dfs_bfs/input.txt")
    .toString()
    .trim()
    .split("\n")

const [N, K] = input[0].split(" ").map(Number)
const graph = []
const data = []  // 바이러스에 대한 정보를 담는 배열

for (let i = 1; i <= N; i++) {
    graph.push(input[i].split(" ").map(Number))
    for (let j = 0; j < N; j++) {
        if (graph[i - 1][j] !== 0) data.push([graph[i - 1][j], 0, i - 1, j])  // 바이러스 발견하면 [종류, 시간, 위치x, 위치y]를 push
    }
}

const [S, X, Y] = input[N + 1].split(" ").map(Number)

// 낮은 번호의 바이러스부터 퍼져나가도록, 바이러스 종류를 기준으로 오름차순 sorting해준다
data.sort((a, b) => a[0] - b[0])

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]

// bfs 풀이(바이러스 번호가 낮은 것부터 차례대로..)
while (data.length > 0) {
    let [type, time, x, y] = data.shift()

    if (time == S) break

    for (let i = 0; i < 4; i++) {
        let nx = x + dx[i]
        let ny = y + dy[i]

        if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue
        if (graph[nx][ny] == 0) {  // 방문 안 했을 경우 -> 방문 여부를 graph의 값이 0인지로도 간단히 파악 가능(visited 사용할 필요 없다)
            graph[nx][ny] = type  // graph[x][y]와 같은 종류로 바꿔준다
            data.push([type, time + 1, nx, ny])  // 시간에 +1해서 그 좌표를 다시 data 배열에 push
        }
    }
}

console.log(graph[X - 1][Y - 1])