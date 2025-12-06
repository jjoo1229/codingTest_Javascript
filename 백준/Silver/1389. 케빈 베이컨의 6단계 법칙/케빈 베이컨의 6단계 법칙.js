const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, m] = input[0].split(" ").map(Number)
let graph = Array.from({ length: n + 1 }, () => [])
for (let i = 1; i <= m; i++) {
    let [a, b] = input[i].split(" ").map(Number)
    if (!graph[a].includes(b)) graph[a].push(b)
    if (!graph[b].includes(a)) graph[b].push(a)
}

const bfs = (x) => {
    let total = 0
    let visited = Array(n + 1).fill(false)
    let queue = [[x, 0]]
    visited[x] = true

    while (queue.length) {
        let [x, step] = queue.shift()
        total += step

        for (let friend of graph[x]) {
            if (!visited[friend]) {
                visited[friend] = true
                queue.push([friend, step + 1])
            }
        }
    }
    return total
}

let arr = []
for (let i = 1; i <= n; i++) {
    arr.push([i, bfs(i)])
}
arr.sort((a, b) => a[1] - b[1] | a[0] - b[0])
console.log(arr[0][0])