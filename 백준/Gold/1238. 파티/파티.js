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
            if (this.heap[parent][1] <= item[1]) break;
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

            if (left < length && this.heap[left][1] < this.heap[smallest][1])
                smallest = left;
            if (right < length && this.heap[right][1] < this.heap[smallest][1])
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

const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, m, x] = input[0].split(" ").map(Number)
let graph = Array.from({ length: n + 1 }, () => [])
for (let i = 1; i <= m; i++) {
    const [start, arrive, time] = input[i].split(" ").map(Number)
    graph[start].push([arrive, time])
}

const dijkstra = (start, end) => {
    const dist = Array(n + 1).fill(Infinity)
    dist[start] = 0

    let pq = new MinHeap()
    pq.push([start, 0])

    while (!pq.isEmpty()) {
        let [cur, curCost] = pq.pop()

        for (let [neighbor, cost] of graph[cur]) {
            let newCost = curCost + cost

            if (newCost < dist[neighbor]) {
                dist[neighbor] = newCost
                pq.push([neighbor, newCost])
            }
        }
    }
    return dist[end]
}

let answer = dijkstra(1, x) + dijkstra(x, 1)
for (let i = 2; i <= n; i++) {
    answer = Math.max(answer, dijkstra(i, x) + dijkstra(x, i))
}
console.log(answer)