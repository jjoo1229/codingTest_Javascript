def dfs(n):  # n은 현재까지 몇 번 스왑했는지
    global result
    if n == N:
        result = max(result, int("".join(map(str, num))))
        return
    # 문자열의 모든 조합끼리 swap해봄
    for i in range(L - 1):
        for j in range(i + 1, L):
            num[i], num[j] = num[j], num[i]
            check = int("".join(map(str, num)))  # swap한 숫자
            if (n, check) not in visited:
                dfs(n + 1)
                visited.append((n, check))

            num[i], num[j] = num[j], num[i]  # 원상복구(백트래킹)


T = int(input())
for test_case in range(1, T + 1):
    st, t = map(str, input().split())
    N = int(t)
    L = len(st)
    result = 0

    num, visited = [], []
    for i in st:
        num.append(i)
    dfs(0)
    print(f"#{test_case} {result}")