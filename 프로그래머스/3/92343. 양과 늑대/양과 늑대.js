function solution(info, edges) {
  let graph = {}
  for (let i = 0; i < info.length; i++) {
    graph[i] = []
  }
  for (let [p, c] of edges) {
    graph[p].push(c)
  }

  let answer = 0

  function dfs(sheep, wolf, current, nextNodes) {
    if (wolf >= sheep) return
    answer = Math.max(answer, sheep)

    for (let i = 0; i < nextNodes.length; i++) {
      const node = nextNodes[i]
      const newNext = [...nextNodes]
      newNext.splice(i, 1) // 이번에 방문할 노드 제거
      newNext.push(...graph[node]) // 방문한 노드의 자식 추가

      if (info[node] === 0) { // 양이면
        dfs(sheep + 1, wolf, node, newNext)
      } else {  // 늑대면
        dfs(sheep, wolf + 1, node, newNext)
      }
    }
  }

  dfs(1, 0, 0, graph[0])

  return answer
}
