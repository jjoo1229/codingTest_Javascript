function solution(h1, m1, s1, h2, m2, s2) {
    // 초 맥스: 60000 1분 3600000 1시간 86400000 24시간 43200000 12시간
    function getSecondRad(time){
        time = time % 60000
        const deg = 360 * time  / 60000
        return deg
    }
    function getMinuteRad (time){
        time = time % 3600000
        const deg = 360 * time  / 3600000
        return deg
    }
    function getHourRad (time){
        time = time % 43200000
        const deg = 360 * time  / 43200000
        return deg
    }
    let start = h1 * 3600000 + m1 * 60000 + s1 * 1000
    let end =  h2 * 3600000 + m2 * 60000 + s2 * 1000
    let count = 0
    for(let i = start; i < end; i += 1000) {
      if(i === 43199000) count++
      else if((i === 43200000 || i === 0) && i === start) count++
      else if(i === 43200000 || i === 0) {
        continue
      }
      else {
        if(
        getSecondRad(i) < getHourRad(i) && 
         (getSecondRad(i + 1000) >= getHourRad(i + 1000)
         ||
         (getSecondRad(i + 1000) <= getSecondRad(i) && getSecondRad(i + 1000) <= getHourRad(i + 1000))
         )
      ) {
        count++
      }
      if (getSecondRad(i) < getMinuteRad(i) && 
         (getSecondRad(i + 1000) >= getMinuteRad(i + 1000)
         ||
         (getSecondRad(i + 1000) <= getSecondRad(i) && getSecondRad(i + 1000) <= getMinuteRad(i + 1000))
         )
        ) {
        count++
      }
      }
    }
    return count
}