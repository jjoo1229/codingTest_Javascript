const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, k] = input[0].split(" ").map(Number)
let dist = Array(100_001).fill(Infinity)

const dir = [-1, +1]
const bfs = (n) => {
    let deque = [n]
    dist[n] = 0

    while (deque.length) {
        let x = deque.shift()

        if (x === k) {
            console.log(dist[x])
            return
        }

        // 순간이동 → 앞에 넣음
        let nx = x * 2
        if (nx >= 0 && nx <= 100_000 && dist[nx] > dist[x]) {
            dist[nx] = dist[x]
            deque.unshift(nx)
        }

        // 1씩 이동 → 뒤에 넣음
        for (let i = 0; i < 2; i++) {
            let nx = x + dir[i]

            if (nx >= 0 && nx <= 100_000 && dist[nx] > dist[x] + 1) {
                dist[nx] = dist[x] + 1
                deque.push(nx)
            }
        }
    }
}
bfs(n)