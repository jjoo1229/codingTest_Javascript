const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, len] = input[0].split(" ").map(Number)
const arr = input[1].trim().split(" ").sort()

let result = []
const dfs = (current, index) => {
    if (current.length == n) {
        result.push([...current])
        return
    }

    for (let i = index; i < len; i++) {
        current.push(arr[i])
        dfs(current, i + 1)
        current.pop()  // 백트래킹
    }
}

dfs([], 0)
// console.log(result)
let AEIOU = ['a', 'e', 'i', 'o', 'u']

const hasmorethan1AEIOU = (arr) => {
    let answer = 0  // 모음
    let n = arr.length  // 전체 글자 수
    for (let a of arr) {
        if (AEIOU.includes(a)) answer++
    }
    // 모음이 1개 이상이고 자음(전체 글자 수 - 모음)이 2개 이상이면 통과
    if (answer >= 1 && n - answer >= 2) return true
    return false
}

result = result.filter(r => hasmorethan1AEIOU(r))
for (let r of result) {
    console.log(r.join(""))
}