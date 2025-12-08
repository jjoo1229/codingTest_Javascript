const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, s] = input[0].split(" ").map(Number)
const arr = input[1].split(" ").map(Number)

const combination = (arr, n) => {
    let result = []

    const dfs = (cur, index) => {
        if (cur.length === n) {
            result.push([...cur])
            return
        }

        for (let i = index; i < arr.length; i++) {
            cur.push(arr[i])
            dfs(cur, i + 1)
            cur.pop()
        }
    }
    dfs([], 0)
    return result
}

let result = []
for (let i = 1; i <= n; i++) {
    result.push(...combination(arr, i))
}

let answer = 0
for (let r of result) {
    let sum = r.reduce((acc, cur) => acc + cur, 0)
    if (sum === s) answer++
}
console.log(answer)