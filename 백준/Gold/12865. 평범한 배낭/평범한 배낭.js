const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, k] = input[0].split(" ").map(Number)

let arr = []
for (let i = 1; i <= n; i++) {
    arr.push(input[i].split(" ").map(Number))
}

let dp = Array(k + 1).fill(0)

for (let [weight, val] of arr) {
    // k부터 weight까지, 역순으로 업데이트한다(한 아이템을 여러 번 사용하지 않기 위함)
    for (let j = k; j >= weight; j--) {
        dp[j] = Math.max(dp[j], val + dp[j - weight])  // 기존에 저장된 dp값(dp[j])과 계속 비교하기 때문에 아이템을 정렬해서 하지 않아도 됨
    }
}
console.log(Math.max(...dp))