const forgetPasswordTemplate =(newPassword) => {
  return {
    subject: '這是您的新密碼',
    html: /*html*/`<h2>這是您的新密碼</h2>
      <p>密碼:
        <span style="color:orange;font-weight:bold;">${newPassword}</span>
      </p>
      <footer>
        <p>////////////////////////////////////</p>
        <p>charlie 公司</p>
        <p>URL http://my-node.com/</p>
        <p>E-mail temaplate@gmail.com</p>
        <p>////////////////////////////////////</p>
      </footer>
      `,
  }
}

module.exports = {
  forgetPasswordTemplate
}