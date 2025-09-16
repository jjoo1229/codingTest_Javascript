const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")

const n = Number(input[0])
const [p1, p2] = input[1].split(' ').map(Number)
const m = Number(input[2])

let graph = {}

for (let i = 1; i <= n; i++) {
    graph[i] = []
}

for (let i = 3; i < m + 3; i++) {
    let arr = input[i].split(' ').map(Number)
    let x = arr[0], y = arr[1]
    graph[x].push(y)
    graph[y].push(x)
}

const bfs = (start) => {
    let queue = [[start, 0]]
    let visited = new Array(n + 1).fill(false)
    visited[start] = true

    while (queue.length > 0) {
        let [point, chon] = queue.shift()
        if (point == p2) return chon

        for (let neighbor of graph[point]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true
                queue.push([neighbor, chon + 1])
            }
        }
    }
}

let result = bfs(p1, p2)
console.log(result === undefined ? -1 : result)