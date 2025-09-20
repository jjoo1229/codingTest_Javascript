function solution(board) {
    let map = []
    let start = []

    for (let i = 0; i < board.length; i++) {
        let arr = board[i].split("")
        map.push(arr)
        if (arr.includes("R")) {
            start.push(i, arr.indexOf("R"))
        }
    }
    
    const n = map.length
    const m = map[0].length
    const visited = new Array(n).fill().map(_ => new Array(m).fill(0))

    const dx = [0, 1, 0, -1]
    const dy = [-1, 0, 1, 0]


    let queue = [[...start, 0]]
    visited[start[0]][start[1]] = true

    while (queue.length > 0) {
        let [x, y, count] = queue.shift()

        if (map[x][y] === "G") {
            return count
        }

        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i]
            let ny = y + dy[i]

            while (nx >= 0 && nx < n && ny >= 0 && ny < m && map[nx][ny] !== "D") {
                nx += dx[i]
                ny += dy[i]
            }

            nx -= dx[i]
            ny -= dy[i]

            if (!visited[nx][ny]) {
                queue.push([nx, ny, count + 1])
                visited[nx][ny] = true
            }
        }

    }
    return -1
}