const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, m] = input[0].split(" ").map(Number)
let visited = Array(n).fill(false)

let array = []
for (let i = 1; i <= n; i++) array.push(i)

let result = []
const dfs = (current) => {
    if (current.length === m) {
        result.push([...current])
        return
    }
    for (let i = 0; i < array.length; i++) {
        if (!visited[i]) {
            visited[i] = true
            current.push(array[i])
            dfs(current)
            current.pop()
            visited[i] = false
        }
    }
}
dfs([])
for (let r of result) {
    console.log(r.join(" "))
}
