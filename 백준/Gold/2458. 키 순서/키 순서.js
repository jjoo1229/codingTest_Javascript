// 플로이드-워셜 활용
const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, m] = input[0].split(" ").map(Number)
let bigger = Array.from({ length: n + 1 }, () => Array(n + 1).fill(false))  // 크기 정보를 담은 배열

for (let i = 1; i <= m; i++) {
    const [a, b] = input[i].split(" ").map(Number)
    bigger[a][b] = true  // a < b로 나온 값을 저장
}

for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
        if (bigger[j][i]) {  // j < i에 대해
            for (let k = 1; k <= n; k++) {
                if (bigger[i][k]) bigger[j][k] = true  // i < k이면 j < k를 저장
            }
        }
    }
}

let answer = 0

// 자신보다 큰 사람 + 자신보다 작은 사람 = n-1 이면 순위 확정
for (let i = 1; i <= n; i++) {
    let count = 0
    for (let j = 1; j <= n; j++) {
        if (i !== j && (bigger[i][j] || bigger[j][i])) count++
    }
    if (count == n - 1) answer++
}

console.log(answer)