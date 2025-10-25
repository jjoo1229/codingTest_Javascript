const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, m] = input[0].split(" ").map(Number)
let graph = {}
for (let i = 1; i <= n; i++) {
    graph[i] = []
}
for (let i = 1; i <= m; i++) {
    const [a, b] = input[i].split(" ").map(Number)
    graph[a].push(b)
    graph[b].push(a)
}

let visited = Array(n + 1).fill(false)

const bfs = (x) => {
    let queue = [x]
    visited[x] = true

    while (queue.length) {
        let x = queue.shift()
        for (let neighbor of graph[x]) {
            if (!visited[neighbor]) {
                queue.push(neighbor)
                visited[neighbor] = true
            }
        }
    }
}

let answer = 0

for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
        bfs(i)
        answer++
    }
}
console.log(answer)