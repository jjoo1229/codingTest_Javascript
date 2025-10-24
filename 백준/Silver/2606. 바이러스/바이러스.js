const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const com = Number(input[0])
const n = Number(input[1])

let graph = {}

for (let i = 1; i <= com; i++) {
    graph[i] = []
}

for (let j = 2; j < 2 + n; j++) {
    const [a, b] = input[j].split(" ").map(Number)
    graph[a].push(b)
    graph[b].push(a)
}

let visited = Array(com + 1).fill(false)
let arr = Object.values(graph)

let queue = [1]
visited[1] = true

while (queue.length) {
    let x = queue.shift()
    
    for (let neighbor of arr[x - 1]) {
        if (!visited[neighbor]){
            queue.push(neighbor)
            visited[neighbor] = true
        }
    }
}
console.log(visited.filter(v => v == true).length - 1)