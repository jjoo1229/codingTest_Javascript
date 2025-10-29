const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const n = Number(input[0])
const arr = [0]
for (let i = 1; i <= n; i++) {
    arr.push(Number(input[i]))
}

let visited = Array(n + 1).fill(false)
let result = []

const dfs = (start, target) => {
    const next = arr[start]  // 다음 노드

    if (!visited[next]) {
        visited[next] = true
        dfs(next, target)
        visited[next] = false  // 백트래킹
    }
    if (next == target) {  // 사이클을 이루고 시작점으로 돌아왔다면
        result.push(target)  // 해당 수를 결과에 추가
    }
}

for (let i = 1; i <= n; i++) {
    visited[i] = true
    dfs(i, i)
    visited[i] = false  // 백트래킹
}

console.log(result.length)
console.log(result.sort((a, b) => a - b).join("\n"))