function isUserId(userId){
  if(typeof userId!=="string") return false
  return true
}

function isImgUrl(imgUrl){
  if(typeof imgUrl!=="string") return false
  return true
}

function isContent(content){
  if(typeof content!=="string") return false
  return true
}

function isLikes(likes){
  if(typeof likes!=="number") return false
  return true
}
function isLikes(likes){
  if(typeof likes!=="number") return false
  return true
}


module.exports = {
  isUserId,
  isImgUrl,
  isContent,
  isLikes
}