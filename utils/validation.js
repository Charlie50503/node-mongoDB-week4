function isString(value) {
  if (typeof value !== 'string') return false
  return true
}
function isNumber(value) {
  if (typeof value !== 'number') return false
  return true
}

class utilsValidation {
  static isUserId(value) {
    return isString(value)
  }
  static isName(value) {
    return isString(value)
  }
  static isSex(value) {
    return isString(value)
  }

  static isPhotoUrl(value) {
    return isString(value)
  }
  static isImgUrl(value) {
    return isString(value)
  }

  static isContent(value) {
    return isString(value)
  }

  static isLikes(likes) {
    return isNumber(likes)
  }
}

module.exports = {
  utilsValidation,
}
