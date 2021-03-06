import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from "./baseHandlers";
import { track, trigger } from "./effect";

export const enum ReactiveFlags {
  IS_REACTIVE = "__V_isReactive",
  IS_READONLY = '__v_isReadonly'
}

export function reactive(raw) {
  return createReactiveObject(raw,mutableHandlers)
}

export function readonly(raw) {
  return createReactiveObject(raw,readonlyHandlers)
}

export function shallowReadonly (raw ) {
  return createReactiveObject(raw,shallowReadonlyHandlers)
}

export function isReactive (target) {
  return !!target[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly (target) {
  return !!target[ReactiveFlags.IS_READONLY]
}

export function isProxy (target) {
  return isReactive(target) || isReadonly(target)
}

function createReactiveObject(target, baseHandles) {
  return new Proxy(target, baseHandles)
}