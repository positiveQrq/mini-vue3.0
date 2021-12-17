import { isObject } from "../shared"
import { track, trigger } from "./effect"
import { reactive, ReactiveFlags, readonly } from "./reactive"

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
    if(key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    }else if(key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    }
    if(isObject(res)) {     
      return isReadonly ? readonly(res) : reactive(res)
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