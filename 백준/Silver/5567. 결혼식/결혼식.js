const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const n = Number(input[0])
const m = Number(input[1])
let graph = Array.from({ length: n + 1 }, () => [])
let visited = Array(n + 1).fill(false)

for (let i = 2; i < m + 2; i++) {
    let [a, b] = input[i].split(" ").map(Number)
    graph[a].push(b)
    graph[b].push(a)
}

let invite = 0
let queue = [[1, 0]]
visited[1] = true
while (queue.length) {
    let [x, depth] = queue.shift()
    for (let friend of graph[x]) {
        if (!visited[friend] && depth < 2) {
            queue.push([friend, depth + 1])
            visited[friend] = true
            invite++
        }
    }
}
console.log(invite)