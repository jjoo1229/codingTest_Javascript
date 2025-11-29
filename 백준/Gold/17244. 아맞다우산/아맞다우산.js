const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [m, n] = input[0].split(" ").map(Number)
let graph = []
for (let i = 1; i <= n; i++) {
    graph.push(input[i].trim().split(""))
}

// 두 점 사이 거리 구하는 함수
const dx = [1, -1, 0, 0]
const dy = [0, 0, 1, -1]

const calDist = (x1, y1, x2, y2) => {
    let visited = Array.from({ length: n }, () => Array(m).fill(false))
    let queue = [[x1, y1, 0]]
    visited[x1][y1] = true

    while (queue.length) {
        let [x, y, dist] = queue.shift()

        if (x == x2 && y == y2) return dist
        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue
            if (!visited[nx][ny] && graph[nx][ny] !== "#") {
                visited[nx][ny] = true
                queue.push([nx, ny, dist + 1])
            }
        }
    }
    return Infinity
}

// 순열: 물건을 찾는 순서의 전체 경우의 수를 구하기 위함
const perm = (arr) => {
    let result = []
    let n = arr.length
    let visited = Array(n).fill(false)

    const dfs = (current) => {
        if (current.length === n) {
            result.push([...current])
            return
        }

        for (let i = 0; i < n; i++) {
            if (!visited[i]) {
                visited[i] = true
                current.push(arr[i])
                dfs(current)
                current.pop()
                visited[i] = false
            }
        }
    }
    dfs([])
    return result
}

let startX, startY, endX, endY
let X = []
for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (graph[i][j] === "S") {
            startX = i
            startY = j
        } else if (graph[i][j] === "E") {
            endX = i
            endY = j
        } else if (graph[i][j] === "X") {
            X.push([i, j])
        }
    }
}

let answer = Infinity
if (X.length === 0) {
    console.log(calDist(startX, startY, endX, endY))
    process.exit()
}

let totalCase = perm(X)
for (let c of totalCase) {
    // S ~ 첫 물건, 마지막 물건 ~ E까지의 거리를 먼저 저장
    let dist = calDist(startX, startY, c[0][0], c[0][1]) + calDist(c[c.length - 1][0], c[c.length - 1][1], endX, endY)
    // 물건들 사이의 거리를 누적
    for (let i = 0; i < c.length - 1; i++) {
        let [x1, y1] = c[i]
        let [x2, y2] = c[i + 1]
        dist += calDist(x1, y1, x2, y2)
    }
    answer = Math.min(answer, dist)
}
console.log(answer)