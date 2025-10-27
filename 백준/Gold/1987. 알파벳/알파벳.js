const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, m] = input[0].split(" ").map(Number)
let graph = []
for (let i = 1; i <= n; i++) {
    graph.push(input[i].trim().split(""))
}

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]
let maxLen = 0

// 같은 알파벳을 다시 방문하면 안 되므로 좌표로 visited 배열을 설정하지 않고 방문한 알파벳 표시용 배열로 생성 (A~Z)
const visited = new Array(26).fill(false)

// 문자 → 인덱스 (A=0, Z=25)
const charToIndex = ch => ch.charCodeAt(0) - 65

// 재귀 DFS
const dfs = (x, y, count) => {
    maxLen = Math.max(maxLen, count);

    for (let i = 0; i < 4; i++) {
        let nx = x + dx[i]
        let ny = y + dy[i]

        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue
        const index = charToIndex(graph[nx][ny]);
        // 아직 방문하지 않은 알파벳이면 이동
        if (!visited[index]) {
            visited[index] = true
            dfs(nx, ny, count + 1);
            visited[index] = false  // 백트래킹
        }
    }
}

visited[charToIndex(graph[0][0])] = true
dfs(0, 0, 1)

console.log(maxLen)