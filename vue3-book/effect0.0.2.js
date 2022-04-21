let activeEffect 

const bucket = new Set()

function effect(fn) {
  activeEffect = fn
  fn()
}

let data = {a:1}

const obj = new Proxy(data,{
  get(target, key) {
    bucket.add(activeEffect)
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    bucket.forEach(fn=> {
      fn()
    })
    return true
  }
})

let test = 10
effect(()=>{
  test = obj.a
})
console.log(test)
obj.a = 20
console.log(test)
	

