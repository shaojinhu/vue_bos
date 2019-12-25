//将时间进行格式化成指定格式 年月日
export const timestampToDate = timestamp=> {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D;
}

//将时间进行格式化成指定格式 年月日
export const timestampToTime = timestamp=>  {
    const d = new Date(timestamp);
    //const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    const resTime = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
    return resTime;
}
const p = (s) =>{
    return s < 10 ? '0' + s : s
}