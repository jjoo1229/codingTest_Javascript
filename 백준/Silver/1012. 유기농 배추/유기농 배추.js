const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let idx = 0;
const T = Number(input[idx++]); // 테스트 케이스 개수

// 방향 (상, 하, 좌, 우)
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function bfs(startY, startX, N, M, board, visited) {
  const queue = [[startY, startX]];
  visited[startY][startX] = true;

  while (queue.length > 0) {
    const [y, x] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (ny >= 0 && ny < N && nx >= 0 && nx < M) {
        if (board[ny][nx] === 1 && !visited[ny][nx]) {
          visited[ny][nx] = true;
          queue.push([ny, nx]);
        }
      }
    }
  }
}

let result = [];
for (let t = 0; t < T; t++) {
  const M = Number(input[idx++]); // 가로
  const N = Number(input[idx++]); // 세로
  const K = Number(input[idx++]); // 배추 수

  const board = Array.from({ length: N }, () => Array(M).fill(0));
  const visited = Array.from({ length: N }, () => Array(M).fill(false));

  for (let i = 0; i < K; i++) {
    const x = Number(input[idx++]);
    const y = Number(input[idx++]);
    board[y][x] = 1;
  }

  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 1 && !visited[i][j]) {
        bfs(i, j, N, M, board, visited);
        count++;
      }
    }
  }
  result.push(count);
}

console.log(result.join("\n"));
