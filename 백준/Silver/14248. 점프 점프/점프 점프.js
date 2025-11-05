const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const n = Number(input[0])
let graph = input[1].split(" ").map(Number)
let start = Number(input[2])

const dir = [1, -1]
let visited = Array(n).fill(false)

const dfs = (x) => {
    let stack = [x]
    visited[x] = true

    while (stack.length) {
        let x = stack.pop()

        for (let i = 0; i < 2; i++) {
            let nx = x + dir[i] * graph[x]

            if (nx < 0 || nx >= n) continue
            if (!visited[nx]) {
                stack.push(nx)
                visited[nx] = true
            }
        }
    }
}
dfs(start - 1)
console.log(visited.filter(v => v == true).length)