export const extend  = Object.assign

export function isObject(obj) {
  return typeof obj === 'object' && typeof obj !== null 
}

export function hasChange (val, newVal) {
  return !Object.is(val, newVal)
}