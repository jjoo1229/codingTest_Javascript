class MinHeap {
    constructor() {
        this.heap = []
    }
    push(a) {
        this.heap.push(a)
        this._up()
    }
    _up() {
        let idx = this.heap.length - 1
        const item = this.heap[idx]

        while (idx > 0) {
            let parent = Math.floor((idx - 1) / 2)
            if (this.heap[parent][1] <= item[1]) break
            this.heap[idx] = this.heap[parent]
            idx = parent
        }
        this.heap[idx] = item
    }
    pop() {
        if (this.heap.length === 1) return this.heap.pop()
        const top = this.heap[0]
        this.heap[0] = this.heap.pop()
        this._down()
        return top
    }
    _down() {
        let idx = 0
        const length = this.heap.length
        const item = this.heap[idx]

        while (true) {
            let left = idx * 2 + 1
            let right = idx * 2 + 2
            let smallest = idx

            if (left < length && this.heap[left][1] < this.heap[smallest][1]) smallest = left
            if (right < length && this.heap[right][1] < this.heap[smallest][1]) smallest = right
            if (smallest === idx) break

            this.heap[idx] = this.heap[smallest]
            idx = smallest
        }
        this.heap[idx] = item
    }
    isEmpty() {
        return this.heap.length === 0
    }
}

const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

const [n, e] = input[0].split(" ").map(Number)

const graph = Array.from({ length: n + 1 }, () => [])
for (let i = 1; i <= e; i++) {
    const [from, to, dist] = input[i].split(" ").map(Number)
    graph[from].push([to, dist])
    graph[to].push([from, dist])
}

const [v1, v2] = input[e + 1].split(" ").map(Number)

const dijkstra = (start, arrive) => {
    const dist = Array(n + 1).fill(Infinity)
    dist[start] = 0

    const deque = new MinHeap()
    deque.push([start, 0])

    while (!deque.isEmpty()) {
        const [cur, curCost] = deque.pop()

        if (dist[cur] < curCost) continue

        for (const c of graph[cur]) {
            const [v, cost] = c
            const nextCost = curCost + cost

            if (nextCost < dist[v]) {
                dist[v] = nextCost
                deque.push([v, nextCost])
            }
        }
    }
    return dist[arrive]
}

const answer = Math.min(dijkstra(1, v1) + dijkstra(v1, v2) + dijkstra(v2, n), dijkstra(1, v2) + dijkstra(v2, v1) + dijkstra(v1, n))
console.log(answer === Infinity ? -1 : answer)