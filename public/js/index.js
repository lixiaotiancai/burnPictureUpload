// 设置请求url
const url = '/post' // 这里改成你的

// 获取元素
const byId = (id) => document.getElementById(id)

const submitBtn = byId('submitBtn')
const form = byId('form')
const file = byId('file')
const fileBtn = byId('fileBtn')
const pictureBox = byId('pictureBox')

// 给选择图片按钮绑定选择图片事件
const pictureSelect = () => file.click()

fileBtn.addEventListener('click', pictureSelect, false)

// file onchange事件 展示图片列表
file.onchange = () => {
  const files = file.files

  if (!files.length) return window.alert('图片列表为空')

  const fragment = document.createDocumentFragment()

  Array.prototype.slice.call(files).forEach((file, index) => {
    let imgSrc = window.URL.createObjectURL(file)
    let imgHTML = `<img src=${imgSrc} height='80px' width='80px'/>`
    let imgNode = document.createElement('div')
    imgNode.innerHTML = imgHTML
    imgNode.className = 'img-wrapper'
    fragment.appendChild(imgNode)
  })

  pictureBox.appendChild(fragment)
}

// 提交按钮绑定事件
const submit = () => {
  const formData = new FormData(form)
  const xhr = new XMLHttpRequest()

  xhr.open('POST', url)

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      window.alert(xhr.responseText)
    } else {
      // to do something
    }
  }
  xhr.send(formData)
}
submitBtn.addEventListener('click', submit, false)
