const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, m] = input[0].split(" ").map(Number)

let graph = []
let red = [0, 0]
let blue = [0, 0]
for (let i = 1; i <= n; i++) {
    let row = input[i].trim().split("")
    if (row.includes("R")) {
        red = [i - 1, row.indexOf("R")]  // 빨간 구슬 위치 저장
        row.splice(row.indexOf("R"), 1, ".") // 이동 계산 편하게 하기 위해 점으로 바꿔둠
    }
    if (row.includes("B")) {
        blue = [i - 1, row.indexOf("B")]  // 파란 구슬 위치 저장
        row.splice(row.indexOf("B"), 1, ".") // 이동 계산 편하게 하기 위해 점으로 바꿔둠
    }
    graph.push(row)
}

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]

// 구슬을 굴리는 함수
const move = (x, y, dir) => {
    let count = 0  // 몇 칸 굴러갔는지

    while (true) {
        let nx = x + dx[dir]
        let ny = y + dy[dir]

        if (graph[nx][ny] === "#") break  // 벽이면 멈춤

        x = nx
        y = ny
        count++

        if (graph[nx][ny] === "O") return { x, y, count, hole: true }  // 구멍을 만나면 hole을 true로 리턴
    }
    return { x, y, count, hole: false }  // 구멍을 못 만나면 hole을 false로 리턴
}

// 방문상태를 4차원으로 저장: visited[RX][RY][BX][BY] → R과 B의 위치 조합이 필요하기 때문
const visited = Array.from({ length: n }, () => Array.from({ length: m }, () => Array.from({ length: n }, () => Array(m).fill(false))))

let queue = []
queue.push({ rx: red[0], ry: red[1], bx: blue[0], by: blue[1], depth: 0 })
visited[red[0]][red[1]][blue[0]][blue[1]] = true

while (queue.length) {
    let { rx, ry, bx, by, depth } = queue.shift()
    if (depth >= 10) break

    for (let dir = 0; dir < 4; dir++) {
        const red = move(rx, ry, dir)
        const blue = move(bx, by, dir)

        if (blue.hole) continue  // 파란 구슬이 빠지면 실패 → 다음 방향 탐색
        if (red.hole) {  // 빨간 구슬만 빠짐 → 성공
            console.log(depth + 1)
            return
        }

        // 두 구슬이 같은 칸에 있으면 분리
        if (red.x === blue.x && red.y === blue.y) {
            if (red.count > blue.count) {  // 빨간 구슬이 더 뒤에 있었다면 한 칸 뒤로 보냄
                red.x -= dx[dir]
                red.y -= dy[dir]
            } else {  // 파란 구슬이 더 뒤에 있었다면 한 칸 뒤로 보냄
                blue.x -= dx[dir]
                blue.y -= dy[dir]
            }
        }

        if (!visited[red.x][red.y][blue.x][blue.y]) {
            visited[red.x][red.y][blue.x][blue.y] = true
            queue.push({ rx: red.x, ry: red.y, bx: blue.x, by: blue.y, depth: depth + 1 })
        }
    }
}

console.log(-1)