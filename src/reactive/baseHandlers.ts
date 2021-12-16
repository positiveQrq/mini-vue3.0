import { track, trigger } from "./effect"

const get = createGetter()
const set = createSetter()

const readonlyGet = createGetter(true)

function createGetter(isReadonly=false) {
  return function (target, key) {
    const res = Reflect.get(target,key)
    //TODO收集依赖
    if(!isReadonly) {
      track(target, key)
    }
    return res
  }
}

function createSetter() {
  return function (target, key, value) {
    const res = Reflect.set(target, key, value)
    //TODO触发依赖
    trigger(target, key)
    return res
  }
}

export const mutableHandlers = {
  get,
  set
}

export const readonlyHandlers = {
  get: readonlyGet,
  
  set(target, key, value) {
    console.warn(`key:${key} set失败，因为target为readonly,${target}`)
    return true
  }
}