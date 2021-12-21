import { hasChange, isObject } from "../shared";
import { isTracking, trackEffect, triggerEffect } from "./effect";
import { reactive } from "./reactive";

class RefImpl {
  private _value: any;
  public dep;
  private _raw: any;
  constructor(value){
    this._raw = value
    this._value = convert(value)
    this.dep = new Set()
  }
  get value () {
    trackRefValue(this)
    return this._value
  }
  set value(newValue) {
    if(hasChange(this._raw, newValue)){
      this._raw = newValue
      this._value = convert(newValue)
      triggerEffect(this.dep) 
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref) {
  if(isTracking()) {
    trackEffect(ref.dep)
  }
}

export function ref (value) {
  return new RefImpl(value)
}