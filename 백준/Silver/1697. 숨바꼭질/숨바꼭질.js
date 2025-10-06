const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, k] = input[0].split(" ").map(Number)

const move = (x, num) => {
    switch (num) {
        case 0: return x * 2
        case 1: return x + 1
        case 2: return x - 1
    }
}

const bfs = (x) => {
    let queue = [[x, 0]]
    let visit = Array(100001).fill(false)
    visit[x] = true

    while (queue.length) {
        let [cur, count] = queue.shift()

        if (cur === k) return count

        for (let i = 0; i < 3; i++) {
            let next = move(cur, i)
            if (next >= 0 && next <= 100000 && !visit[next]) {
                visit[next] = 1
                queue.push([next, count + 1])
            }
        }
    }
}


console.log(bfs(n))