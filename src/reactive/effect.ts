import { extend } from "../shared"

class ReactiveEffect {
  private _fn: any
  public scheduler: any
  deps = []
  active = true
  onStop = ()=>{}
  constructor(fn, scheduler?){
    this._fn = fn
    this.scheduler = scheduler
  }

  run () {
    activeEffect = this
    return this._fn()
  }

  stop() {
    if(this.active) {
      this.onStop && this.onStop()
      clearEffect(this)
      this.active = false
    }
  }
}

function clearEffect(effect:any) {
  effect.deps.forEach((dep:any) => {
    dep.delete(effect)
   }) 
}

let targetMap = new Map()
export function track(target, key) {
  let depsMap = targetMap.get(target)
  if(!depsMap) {
    depsMap = new Map()
    targetMap.set(target,depsMap)
  }
  let dep = depsMap.get(key)
  if(!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  if(!activeEffect) return 
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

export function trigger(target, key) {
  const desMap = targetMap.get(target)
  const dep = desMap.get(key)
  for(const effect of dep) {
    if(effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

let activeEffect
export function effect(fn, options){
  const _effect = new ReactiveEffect(fn,options.scheduler)
  extend(_effect, options)
  _effect.run()
  const runner:any =  _effect.run.bind(_effect) 
  runner.effect = _effect
  return runner
}

export function stop (runner) {
  runner.effect.stop()
}


