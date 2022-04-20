const bucket = new Set()

//原始数据
const data = {text:'hello world'}

const obj = new Proxy(data,{
  get(target, key) {
    bucket.add(effect)
    return target[key]
  },
  
  set(target, key, newVal){
    target[key] = newVal
    bucket.forEach(fn=>{
      fn()
    })
    return true
  }
})

console.log(obj)
let test = ''
function effect(){
  test = obj.text
}

effect()
console.log(test)
obj.text = 'hello vue3.0'
console.log(test)


