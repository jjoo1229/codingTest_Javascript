const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")
const [N, M, K, X] = input[0].split(" ").map(Number);

let graph = {}
for (let i = 1; i <= N; i++) {
    graph[i] = []
}

for (let i = 1; i <= M; i++) {
    let [a, b] = input[i].split(" ").map(Number)
    graph[a].push(b)
}

let dist = Array(N + 1).fill(-1)

const bfs = (x) => {
    let queue = [x]
    dist[x] = 0

    while (queue.length > 0) {
        let x = queue.shift();

        if (graph[x]) {
            for (let neighbor of graph[x]) {
                if (dist[neighbor] == -1) {
                    dist[neighbor] = dist[x] + 1
                    queue.push(neighbor)
                }
            }
        }
    }
}

bfs(X)

for (let i = 0; i < dist.length; i++) {
    if (dist[i] === K) console.log(i)
}

if (!dist.includes(K)) console.log("-1")