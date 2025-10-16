const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")

const n = Number(input[0])
let triangle = []
for (let i = 1; i <= n; i++) {
    triangle.push(input[i].split(" ").map(Number))
}

for (let i = 1; i < n; i++) {
    for (let j = 0; j <= i; j++) {
        if (j == 0) triangle[i][j] += triangle[i - 1][0]
        else if (j == i) triangle[i][j] += triangle[i - 1][i - 1]
        else triangle[i][j] += Math.max(triangle[i - 1][j - 1], triangle[i - 1][j])
    }
}

console.log(Math.max(...triangle[n - 1]))