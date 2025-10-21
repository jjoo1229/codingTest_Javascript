n = int(input())
array = list(map(int, input().split()))

# DP 테이블 1로 초기화
dp = [1] * n

for i in range(1, n):
    for j in range(0, i):
        if array[j] < array[i]:
            dp[i] = max(dp[i], dp[j] + 1)

# 가장 긴 증가하는 부분 수열의 길이값
result = max(dp)
print(result)