// 随机生成密码函数
// length:长度
// lower：包含小写
// upper：包含大写
// number：包括数字
// symbol：包括符号
function generatePassword(length, lower, upper, number, symbol) {

	// 对象的所有函数名，我们将使用它们来创建密码的随机字母
	const randomFunc = {
		lower: getRandomLower,
		upper: getRandomUpper,
		number: getRandomNumber,
		symbol: getRandomSymbol,
	};

	// 生成器函数
	// 所有负责返回一个随机值的函数，我们将使用它来创建密码。
	function getRandomLower() {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	}
	function getRandomUpper() {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
	}
	function getRandomNumber() {
		return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
	}
	function getRandomSymbol() {
		const symbols = '~!@#$%^&*()_+{}":?><;.,';
		return symbols[Math.floor(Math.random() * symbols.length)];
	}

	let generatedPassword = "";
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
	if (typesCount === 0) {
		return "";
	}
	for (let i = 0; i < length; i++) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	return generatedPassword.slice(0, length);
}

module.exports = {
  generatePassword
}