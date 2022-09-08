class FormatTime {
  // 2021-01-11T09:49:43.000+0000转yyyy-mm-mm aa-bb-cc
  formatOne(times){
    let data = times.substr(0, 19);
    let newDate = new Date(new Date(data.replace(/T/g, ' ').replace(/-/g, '/')).getTime() + 8 * 60 * 60 * 1000);
    let d = new Date(newDate);
    d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    return d
  }
  // 毫秒转化为时分秒
  formatTwo(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24))
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.ceil((mss % (1000 * 60)) / 1000)
    return minutes + ':' + seconds
  }
}

export default new FormatTime