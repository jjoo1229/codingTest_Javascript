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

const n = Number(input[0])
const m = Number(input[1])
const graph = Array.from({ length: n + 1 }, () => []);

for (let i = 2; i <= m + 1; i++) {
    const [from, to, dist] = input[i].split(" ").map(Number)
    graph[from].push([to, dist])
}
const [start, arrive] = input[m + 2].split(" ").map(Number)

const dijkstra = (start) => {
    const dist = Array(n + 1).fill(Infinity)  // 최단 거리를 저장하는 배열
    dist[start] = 0

    const pq = new MinHeap()
    pq.push([start, 0])  // 시작점 push

    while (!pq.isEmpty()) {
        const [cur, curCost] = pq.pop()  // 가장 짧은 거리를 가진 방문 노드를 꺼낸다

        if (dist[cur] < curCost) continue  // 이미 더 짧은 경로로 방문되었다면 skip

        for (const c of graph[cur]) {  // 방문 가능한 노드 탐색
            let [v, cost] = c
            const nextCost = curCost + cost

            // 더 짧은 경로면 갱신
            if (nextCost < dist[v]) {
                dist[v] = nextCost
                pq.push([v, nextCost])
            }
        }
    }
    return dist[arrive]
}
console.log(dijkstra(start))