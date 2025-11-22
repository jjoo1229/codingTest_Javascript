for _ in range(10):
    test_case = int(input())
    graph = [list(map(int, input().split())) for _ in range(100)]
    startX = 99
    startY = graph[99].index(2)

    while startX > 0:
        if startY - 1 >= 0 and graph[startX][startY - 1] == 1:
            while startY - 1 >= 0 and graph[startX][startY - 1] == 1:
                startY -= 1
            startX -= 1
        elif startY + 1 < 100 and graph[startX][startY + 1] == 1:
            while startY + 1 < 100 and graph[startX][startY + 1] == 1:
                startY += 1
            startX -= 1
        else:
            startX -= 1

    print(f"#{test_case} {startY}")