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
        result.push(current.join(" "))  // 시간 초과 방지
        return
    }

    for (let i = index; i < n; i++) {
        current.push(arr[i])
        dfs(current, i)
        current.pop()
    }
}
dfs([], 0)
console.log(result.join("\n"))