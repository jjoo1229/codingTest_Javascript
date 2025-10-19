// 어려워서 지피티 코드 보고 정리

const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")

const n = Number(input[0])

let graph = []
for (let i = 1; i <= n; i++) {
    graph.push(input[i].split(" ").map(Number))
}

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]

// '지금 상어 위치 ~ 먹을 수 있는 물고기'까지의 최단 거리
const bfs = (shark, target) => {
    let visited = Array.from({ length: n }, () => Array(n).fill(false))

    let queue = []
    queue.push({ x: shark.x, y: shark.y, dist: 0 })  // 처음 위치는 상어의 위치
    visited[shark.x][shark.y] = true

    let fish = []  // 먹을 수 있는 물고기들 저장

    while (queue.length) {
        let cur = queue.shift();

        for (let i = 0; i < 4; i++) {
            let nx = cur.x + dx[i]
            let ny = cur.y + dy[i]

            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue
            if (visited[nx][ny]) continue
            if (graph[nx][ny] > target) continue // 지나갈 수 없음

            visited[nx][ny] = true
            const dist = cur.dist + 1

            // 먹을 수 있는 물고기는 저장
            if (graph[nx][ny] !== 0 && graph[nx][ny] < target) {
                fish.push({ x: nx, y: ny, dist })
            }

            // 지나갈 수 있는 자리 저장
            queue.push({ x: nx, y: ny, dist })
        }
    }

    if (fish.length == 0) return null

    fish.sort((a, b) => {
        if (a.dist !== b.dist) return a.dist - b.dist  // 거리가 짧은 것부터
        if (a.x !== b.x) return a.x - b.x  // 위에 있는 것부터
        return a.y - b.y  // 왼쪽에 있는 것부터
    })

    return fish[0]  // 가장 먼저 먹는 물고기 반환
}

const babyShark = () => {
    let shark = { x: 0, y: 0 }
    let size = 2  // 상어의 크기
    let eat = 0  // 먹은 물고기 수
    let time = 0  // 총 시간

    // 상어 위치 찾기
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (graph[i][j] == 9) {
                shark = { x: i, y: j }
                graph[i][j] = 0  // 상어 자리는 비워준다
            }
        }
    }

    while (true) {
        const target = bfs(shark, size)
        if (!target) break  // 먹을 물고기 없음

        // 상어가 이동하면서 target인 물고기를 먹음
        time += target.dist
        eat++
        graph[target.x][target.y] = 0
        shark = { x: target.x, y: target.y }  // 상어의 위치 변경

        // 크기 증가
        if (eat == size) {
            size++
            eat = 0  // 먹은 개수 초기화
        }
    }
    return time
}

console.log(babyShark())
