const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, m] = input[0].split(" ").map(Number)
let arr = []
for (let i = 1; i <= n; i++) arr.push(i)

let result = []
const dfs = (current) => {
    if (current.length === m) {
        result.push(current.join(" "))
        return
    }

    for (let i = 0; i < n; i++) {
        current.push(arr[i])
        dfs(current)
        current.pop()
    }
}
dfs([])
console.log(result.join("\n"))