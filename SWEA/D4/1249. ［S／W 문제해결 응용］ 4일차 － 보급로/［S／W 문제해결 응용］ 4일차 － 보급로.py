from collections import deque

T = int(input())
for test_case in range(T):
    n = int(input())
    graph = [list(map(int, input().strip())) for _ in range(n)]
    result = [[float('inf')] * n for _ in range(n)]

    dx = [0, 0, 1, -1]
    dy = [1, -1, 0, 0]

    def bfs(x, y):
        q = deque()
        q.append((x, y))
        result[x][y] = 0
        while q:
            x, y = q.popleft()
            for i in range(4):
                nx = x + dx[i]
                ny = y + dy[i]
                if 0 <= nx < n and 0 <= ny < n:
                    if result[x][y] + graph[nx][ny] < result[nx][ny]:
                        result[nx][ny] = result[x][y] + graph[nx][ny]
                        q.append((nx, ny))

    bfs(0, 0)
    print(f"#{test_case + 1} {result[n - 1][n - 1]}")
