const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, m] = input[0].split(" ").map(Number)
let arr = []
for (let i = 1; i <= n; i++) arr.push(i)

let result = []
const dfs = (current, index) => {
    if (current.length === m) {
        result.push([...current])
        return
    }

    for (let i = index; i < n; i++) {
        current.push(arr[i])
        dfs(current, i + 1)
        current.pop()
    }
}
dfs([], 0)
for (let r of result) console.log(r.join(" "))