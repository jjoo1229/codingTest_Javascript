const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [r, c, t] = input[0].split(" ").map(Number)
let graph = []
let air = []
for (let i = 1; i <= r; i++) {
    let row = input[i].split(" ").map(Number)
    graph.push(row)
    if (row[0] === -1) air.push(i - 1)  // 공기청정기 위치 저장
}

const upper = air[0]
const lower = air[1]

// 1단계: 확산
const spread = () => {
    const next = Array.from({ length: r }, () => Array(c).fill(0))
    next[upper][0] = -1
    next[lower][0] = -1  // 공기청정기 위치 세팅

    const dx = [0, 0, 1, -1]
    const dy = [1, -1, 0, 0]

    for (let x = 0; x < r; x++) {
        for (let y = 0; y < c; y++) {
            if (graph[x][y] > 0) {
                let amount = graph[x][y]  // 확산되는 원점의 값
                let movedAmount = Math.floor(amount / 5)  // 나눠지는 값
                let count = 0

                for (let i = 0; i < 4; i++) {
                    let nx = x + dx[i]
                    let ny = y + dy[i]

                    if (nx < 0 || nx >= r || ny < 0 || ny >= c || graph[nx][ny] === -1) continue
                    next[nx][ny] += movedAmount
                    count++
                }
                next[x][y] += amount - movedAmount * count
            }
        }
    }
    return next
}

// 2단계: 공기청정기
const moveAir = (g) => {
    // 윗부분
    let lastCol = c - 1
    for (let i = upper - 1; i > 0; i--) {  // 첫 열
        g[i][0] = g[i - 1][0]  // 한 칸 위 값으로 세팅
    }
    for (let i = 0; i <= lastCol; i++) {  // 첫 행
        g[0][i] = g[0][i + 1]  // 한 칸 뒤의 값으로 세팅
    }
    for (let i = 0; i < upper; i++) {  // 마지막 열
        g[i][lastCol] = g[i + 1][lastCol]  // 한 칸 아래 값으로 세팅
    }
    for (let i = lastCol; i > 0; i--) {  // 공기청정기가 있는 행
        if (i == 1) g[upper][i] = 0
        else g[upper][i] = g[upper][i - 1]  // 한 칸 왼쪽의 값으로 세팅
    }

    // 아랫부분
    let lastRow = r - 1
    for (let i = lower + 1; i < lastRow; i++) {  // 첫 열
        g[i][0] = g[i + 1][0]  // 한 칸 아래 값으로 세팅
    }
    for (let i = 0; i <= lastCol; i++) {  // 마지막 행
        g[lastRow][i] = g[lastRow][i + 1]  // 한 칸 오른쪽의 값으로 세팅
    }
    for (let i = lastRow; i > lower; i--) {  // 마지막 열
        g[i][lastCol] = g[i - 1][lastCol]  // 한 칸 위 값으로 세팅
    }
    for (let i = lastCol; i > 0; i--) {  // 공기청정기가 있는 행
        if (i == 1) g[lower][i] = 0
        else g[lower][i] = g[lower][i - 1]  // 한 칸 왼쪽의 값으로 세팅
    }
}

for (let i = 0; i < t; i++) {
    graph = spread()
    moveAir(graph)
}

console.log(graph.map(r => r.reduce((accm, cur) => accm + cur, 0)).reduce((accm, cur) => accm + cur, 0) + 2)