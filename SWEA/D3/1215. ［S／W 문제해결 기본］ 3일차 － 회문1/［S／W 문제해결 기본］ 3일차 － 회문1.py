for k in range(1, 11):
    n = int(input())
    arr = [input() for _ in range(8)]
    answer = 0

    for i in range(8):
        for j in range(8 - n + 1):
            # 가로줄 확인
            if arr[i][j: j + n] == arr[i][j: j + n][::-1]:
                answer += 1

            # 세로줄 확인
            col = ''.join(arr[x][i] for x in range(j, j + n))
            if col == col[::-1]:
                answer += 1

    print(f'#{k}', answer)