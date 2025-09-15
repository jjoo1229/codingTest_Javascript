const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")

const [M, N, K] = input[0].split(' ').map(Number);



// 모눈종이 정의
let arr = Array.from({ length: M }, () => new Array(N).fill(0))

for (let i = 1; i <= K; i++) {
    const [startX, startY, endX, endY] = input[i].split(' ').map(Number);

    for (let j = M - endY; j < M - startY; j++) {
        for (let i = startX; i < endX; i++) {
            arr[j][i] = 1
        }
    }
}

let visited = Array.from({ length: M }, () => new Array(N).fill(false))

let dx = [0, 0, 1, -1]
let dy = [1, -1, 0, 0]

let area = 0

const dfs = (startX, startY) => {
    let stack = [[startX, startY]]
    visited[startX][startY] = true  // 탐색 시작 지점(첫 칸)도 영역의 일부
    area++


    while (stack.length > 0) {
        let [x, y] = stack.pop()

        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            if (nx < 0 || nx >= M || ny < 0 || ny >= N) continue
            if (arr[nx][ny] == 0 && !visited[nx][ny]) {
                visited[nx][ny] = true
                area++
                stack.push([nx, ny])
            }

        }
    }
    return area
}

let result = []
for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
        area = 0
        if (!visited[i][j] && arr[i][j] == 0) {
            result.push(dfs(i, j));
        }
    }
}

console.log(result.length)
console.log(result.sort((a, b) => a - b).join(" "))
