const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")
const [n, m] = input[0].split(" ").map(Number)

const paper = []

for (let i = 1; i <= n; i++) {
    let arr = input[i].trim().split(" ").map(Number)
    paper.push(arr)
}


let visited = Array.from({ length: n }, () => (Array(m).fill(false)))

let dx = [0, 0, 1, -1]
let dy = [1, -1, 0, 0]

const bfs = (x, y) => {
    let area = 1
    let queue = [[x, y]]
    visited[x][y] = true

    while (queue.length > 0) {
        let [x, y] = queue.shift()

        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue
            if (paper[nx][ny] === 0) continue
            if (paper[nx][ny] === 1 && !visited[nx][ny]) {
                area++
                queue.push([nx, ny])
                visited[nx][ny] = true
            }

        }
    }
    return area
}

let answer = []
for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (!visited[i][j] && paper[i][j] === 1) {  // 방문 안 했고 1이면 bfs 돌림
            answer.push(bfs(i, j))
        }
    }
}

// console.log(answer)
console.log(answer.length)
console.log(answer.length === 0 ? 0 : Math.max(...answer))