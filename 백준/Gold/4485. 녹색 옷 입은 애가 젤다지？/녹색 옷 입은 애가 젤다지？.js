class MinHeap {
    constructor() {
        this.heap = [];
    }
    push(a) {
        this.heap.push(a);
        this._up();
    }
    _up() {
        let idx = this.heap.length - 1;
        const item = this.heap[idx];

        while (idx > 0) {
            let parent = Math.floor((idx - 1) / 2);
            if (this.heap[parent][2] <= item[2]) break;
            this.heap[idx] = this.heap[parent];
            idx = parent;
        }
        this.heap[idx] = item;
    }
    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._down();
        return top;
    }
    _down() {
        let idx = 0;
        const length = this.heap.length;
        const item = this.heap[idx];

        while (true) {
            let left = idx * 2 + 1;
            let right = idx * 2 + 2;
            let smallest = idx;

            if (left < length && this.heap[left][2] < this.heap[smallest][2])
                smallest = left;
            if (right < length && this.heap[right][2] < this.heap[smallest][2])
                smallest = right;
            if (smallest === idx) break;

            this.heap[idx] = this.heap[smallest];
            idx = smallest;
        }
        this.heap[idx] = item;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
}

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]

const dijkstra = (graph, n) => {
    let dist = Array.from({ length: n }, () => Array(n).fill(Infinity))
    dist[0][0] = graph[0][0]

    const pq = new MinHeap()
    pq.push([0, 0, dist[0][0]])

    while (!pq.isEmpty()) {
        const [x, y, curCost] = pq.pop()

        if (dist[x][y] < curCost) continue

        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue
            let nextCost = curCost + graph[nx][ny]
            if (nextCost < dist[nx][ny]) {
                dist[nx][ny] = nextCost
                pq.push([nx, ny, nextCost])
            }
        }
    }
    return dist[n - 1][n - 1]
}

const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

let i = 0, tc = 1
while (Number(input[i]) !== 0) {
    let n = Number(input[i])
    let graph = []
    for (let j = i + 1; j <= i + n; j++) {
        graph.push(input[j].split(" ").map(Number))
    }
    console.log(`Problem ${tc}: ${dijkstra(graph, n)}`)
    i += n + 1
    tc++
}