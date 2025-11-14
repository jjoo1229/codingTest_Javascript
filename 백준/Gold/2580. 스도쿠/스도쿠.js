const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./baekjoon/input.txt")
    .toString()
    .trim()
    .split("\n")

let graph = []
for (let i = 0; i < 9; i++) {
    graph.push(input[i].split(" ").map(Number))
}

let blanks = []
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        if (graph[i][j] === 0) {
            blanks.push([i, j])
        }
    }
}

let solved = false

const checkRow = (row, num) => {
    for (let col = 0; col < 9; col++) {
        if (graph[row][col] === num) return false
    }
    return true
}

const checkCol = (col, num) => {
    for (let row = 0; row < 9; row++) {
        if (graph[row][col] === num) return false
    }
    return true
}

const checkBox = (row, col, num) => {
    // 0~2까지 0, 3~5까지 3, 6~8까지 6으로 처리
    const startRow = Math.floor(row / 3) * 3
    const startCol = Math.floor(col / 3) * 3

    // 각 박스 안에서 확인
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (graph[i][j] === num) return false
        }
    }
    return true
}

// dfs: blanks[index] 번째 빈칸을 채우는 함수
const dfs = (index) => {
    if (index === blanks.length) {  // 빈칸을 다 채운 경우 끝 → 정답 출력
        let result = graph.map((row) => row.join(" ")).join("\n")
        console.log(result)
        solved = true
        return
    }

    const [row, col] = blanks[index]

    for (let num = 1; num <= 9; num++) {
        // 한 빈칸을 채울 때 한 번의 턴에 가로줄, 세로줄, 3x3 박스 3가지를 모두 검사함
        if (checkRow(row, num) && checkCol(col, num) && checkBox(row, col, num)) {
            graph[row][col] = num  // 겹치는 수가 없으면 넣기
            dfs(index + 1)
            if (solved) return
            graph[row][col] = 0  // 되돌리기
        }
    }
}
dfs(0)