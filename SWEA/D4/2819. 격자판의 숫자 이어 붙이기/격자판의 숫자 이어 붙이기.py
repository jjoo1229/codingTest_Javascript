from collections import deque

dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]

def dfs(x, y):
    stack = deque()
    stack.append((x, y, 1, str(graph[x][y])))

    while stack:
        x, y, depth, path = stack.pop()
        if depth == 7:
            visited.add(path)
            continue

        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]

            if (0 <= nx < 4 and 0 <= ny < 4):
                stack.append((nx, ny, depth + 1, path + str(graph[nx][ny])))


T = int(input())
for test_case in range(1, T + 1):
    graph = [list(map(int, input().split())) for _ in range(4)]
    visited = set()

    for i in range(4):
        for j in range(4):
            dfs(i, j)
    print(f"#{test_case} {len(visited)}")