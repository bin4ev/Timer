import { Component, EventEmitter, Input, Output } from '@angular/core';

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
 
  prevDisplayData: any = {}
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

    if (!this.prevDisplayData.hasOwnProperty('sec')) {
      let { sec, min, hours } = this
      this.prevDisplayData = { sec, min, hours }
    }

    let arr = [[0,0],[0,0],[0,0]]
    this.savedKeys += e.key
    let { firstDig, secDig } = this.getPosition(1)
    this.sec = this.setDigits(firstDig, secDig)
    if (this.savedKeys.length > 2) {
      let { firstDig, secDig } = this.getPosition(3)
      this.min = this.setDigits(firstDig, secDig)
    }
    if (this.savedKeys.length > 4) {
      let { firstDig, secDig } = this.getPosition(5)
      this.hours = this.setDigits(firstDig, secDig)
    }
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

