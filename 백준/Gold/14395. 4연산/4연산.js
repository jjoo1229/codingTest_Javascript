const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")
const [s, t] = input[0].split(" ").map(Number)

if (s === t) {
    console.log(0)
    return
}

let queue = [[s, ""]]
let visited = new Set()
const code = ["*", "+", "-", "/"]

while (queue.length) {
    let [x, str] = queue.shift()
    const calcul = [x * x, x * 2, 0, 1]
    for (let i = 0; i < 4; i++) {
        let nx = calcul[i]

        if (nx === t) {
            console.log(str + code[i])
            return
        }
        if (!visited.has(nx) && nx <= t) {
            visited.add(nx)
            queue.push([nx, str + code[i]])
        }
    }
}
console.log(-1)