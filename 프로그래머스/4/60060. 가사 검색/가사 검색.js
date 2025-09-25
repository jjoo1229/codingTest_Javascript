function solution(words, queries) {
  // 길이별 단어 리스트(원본)와 뒤집은 단어 리스트(뒤에서 ?가 오는 경우 처리)
  const byLen = new Map();
  const byLenRev = new Map();

  for (const w of words) {
    const L = w.length;
    if (!byLen.has(L)) byLen.set(L, []);
    if (!byLenRev.has(L)) byLenRev.set(L, []);
    byLen.get(L).push(w);
    byLenRev.get(L).push(reverse(w));
  }

  // 정렬 (이진 탐색을 위해)
  for (const [k, arr] of byLen) arr.sort();
  for (const [k, arr] of byLenRev) arr.sort();

  // 이진 탐색 하한(lower bound) / 상한(upper bound)
  function lowerBound(arr, target) {
    let l = 0, r = arr.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (arr[m] >= target) r = m;
      else l = m + 1;
    }
    return l;
  }
  function upperBound(arr, target) {
    let l = 0, r = arr.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (arr[m] > target) r = m;
      else l = m + 1;
    }
    return l;
  }

  const answer = [];

  for (const q of queries) {
    const L = q.length;
    // 길이에 해당하는 단어가 없으면 0
    if (!byLen.has(L)) {
      answer.push(0);
      continue;
    }

    // 물음표가 접두에 있나 접미에 있나 판단
    if (q[0] !== '?') {
      // 접미에 ? (예: "fro??")
      const arr = byLen.get(L);
      const low = q.replace(/\?/g, 'a');
      const high = q.replace(/\?/g, 'z');
      const cnt = upperBound(arr, high) - lowerBound(arr, low);
      answer.push(cnt);
    } else {
      // 접두에 ? (예: "??odo") -> 뒤집어서 처리
      const revQ = reverse(q);
      const arr = byLenRev.get(L);
      const low = revQ.replace(/\?/g, 'a');
      const high = revQ.replace(/\?/g, 'z');
      const cnt = upperBound(arr, high) - lowerBound(arr, low);
      answer.push(cnt);
    }
  }

  return answer;
}

function reverse(s) {
  return s.split('').reverse().join('');
}
