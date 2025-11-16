const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const combination = (arr, n) => {
    let result = []
    const dfs = (current, index) => {
        if (current.length === n) {
            result.push([...current])
            return
        }
        for (let i = index; i < arr.length; i++) {
            current.push(arr[i])
            dfs(current, i + 1)
            current.pop()
        }
    }
    dfs([], 0)
    return result
}

let i = 0
while (input[i] !== "0") {
    let arr = input[i].split(" ").map(Number).slice(1)
    let result = combination(arr, 6)
    if (i !== 0) console.log("")
    console.log(result.map(r => r.join(" ")).join("\n"))
    i++
}