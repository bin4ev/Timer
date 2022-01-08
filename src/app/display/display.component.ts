import { Component, EventEmitter, Input, Output } from '@angular/core';

enum TimePart { sec = 1, min = 3, hours = 5 }

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
  @Output() stopEdit = new EventEmitter()

  @Input() sec: any = ''
  @Input() min: any = ''
  @Input() hours: any = ''
  @Input() editable: boolean = false

  prevDisplayData: any = undefined
  savedKeys = ''

  constructor() { }

  keydown(e: any, sec: any, min: any, hours: any) {
    switch (e.key) {
      case 'Enter':
        this.stopEdit.emit({ sec, min, hours })
        this.savedKeys = ''
        break;
      case 'Escape':
        Object.assign(this, this.prevDisplayData)
        this.savedKeys = ''
        break
      case 'Delete':
        e.target.textContent = '--'
        break
      default:
        break;
    }

    e.preventDefault()
    if (isNaN(e.key)) {
      return
    }

    if (!this.prevDisplayData) {
      let { sec, min, hours } = this
      this.prevDisplayData = { sec, min, hours }
    }

    this.savedKeys += e.key
    this.checkTargetId(e.target)
  }

  checkTargetId(target: any): void {
    switch (target.id) {
      case 'seconds':
        this.startEdit()
        break;
      case 'minutes':
        this.min = this.getTimePart(1)
        break
      case 'hours':
        this.hours = this.getTimePart(1)
        break
      default:
        break;
    }
  }

  startEdit(): void {
    this.sec = this.getTimePart(TimePart.sec)
    if (this.savedKeys.length > 2) {
      this.min = this.getTimePart(TimePart.min)
    }
    if (this.savedKeys.length > 4) {
      this.hours = this.getTimePart(TimePart.hours)
    }
  }

  getTimePart(pos: TimePart) {
    let { firstDig, secDig } = this.getPosition(pos)
    return this.setDigits(firstDig, secDig)
  }

  private getPosition(index: number): any {
    let secDig = this.savedKeys[this.savedKeys.length - index]
    let firstDig = this.savedKeys[this.savedKeys.length - (index + 1)]
    return { firstDig, secDig }
  }

  private setDigits(first: string, second: string): string {
    let result = second
    let savedKeys = first ? first : '0'
    return result.padStart(2, savedKeys)
  }
}

