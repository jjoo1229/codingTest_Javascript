const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const n = Number(input[0])
let graph = Array.from({ length: n + 1 }, () => [])
for (let i = 1; i < n; i++) {
    const [a, b] = input[i].split(" ").map(Number)
    graph[a].push(b)
    graph[b].push(a)
}

const arr = input[n].split(" ").map(Number)
if (arr[0] !== 1) {
    console.log(0)
    process.exit(0)
}

let order = Array(n + 1).fill(0)
arr.forEach((node, idx) => order[node] = idx)  // 시간초과 방지를 위해 노드들의 인덱스를 저장하는 배열 설정
const bfs = (start) => {
    let visited = Array(n + 1).fill(false)
    let queue = [start]
    let result = [start]
    visited[start] = true

    while (queue.length) {
        let x = queue.shift()
        graph[x].sort((a, b) => order[a] - order[b])  // 입력받은 순서대로 정렬

        for (let neighbor of graph[x]) {
            if (!visited[neighbor]) {
                queue.push(neighbor)
                result.push(neighbor)
                visited[neighbor] = true
            }
        }
    }
    return result.join(" ")
}

console.log(bfs(arr[0]) === input[n] ? 1 : 0)