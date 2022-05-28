
class utilsValidation {
  static isUserId(userId){
    if(typeof userId!=="string") return false
    return true
  }
  
  static isImgUrl(imgUrl){
    if(typeof imgUrl!=="string") return false
    return true
  }
  
  static isContent(content){
    if(typeof content!=="string") return false
    return true
  }
  
  static isLikes(likes){
    if(typeof likes!=="number") return false
    return true
  }
}


module.exports = {
  utilsValidation
}