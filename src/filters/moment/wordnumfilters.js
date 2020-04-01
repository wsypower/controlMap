/*
 * @description 一行显示多少个字 filter
 * @Author: mo xuejuan
 * @Date: 2020-04-01 15:07
 */

function wordNumber(value, setting = 10) {
  let wordLength = value.trim().split('').length;
  if(wordLength<=setting){
    return value
  }
  else{
    return value.trim().substring(0,setting)+ '...'
  }
}

export default wordNumber
