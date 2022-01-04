import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  defHours: any = '02'
  defMin: any = '00'
  defSec: any = '00'
  sec: any = this.defSec
  min: any = this.defMin
  hours: any = this.defHours
  startBtnText: string = 'Start'
  resetBtnText: string = 'Reset'
  isDisabled: boolean = true
  activeClass: boolean = false
  ticking: any
  editStatus: boolean = false

  constructor() { }

  getStart(): void {
    if (this.startBtnText == 'Start') {
      this.editStatus = false
      this.startTimer()
      return
    }

    this.startBtnText = 'Start'
    this.activeClass = false
    clearInterval(this.ticking)
    this.isDisabled = false
  }

  startTimer(): void {
    this.startBtnText = 'Pause'
    this.activeClass = true
    this.isDisabled = true
    this.startTicking()
  }

  resetTimer(): void {
    this.hours = this.defHours
    this.min = this.defMin
    this.sec = this.defSec
    clearInterval(this.ticking)
    this.startBtnText = 'Start'
    this.activeClass = false
    this.isDisabled = true
  }

  startEdit(): void {
    if (this.startBtnText != 'Start') {
      return
    }
    this.editStatus = true
  }

  stopEditDisplay({ sec, min, hours }: any): void {
    if (min > 59 || sec > 59) {
      min = 59
      sec = 59
    }
    this.editStatus = false
    this.defHours = hours
    this.defMin = min
    this.defSec = sec
    this.sec = sec
    this.min = min
    this.hours = hours
    this.getStart()
  }

  startTicking(): void {
    this.ticking = setInterval(() => {
      /*    for (let i = this.timeArr.length - 1; i >= 0; i--) {
           this.timeArr[i]--
           this.timeArr[i]= String(this.min).padStart(2, '0')
           if(this.timeArr[i] < 0) {
             this.timeArr[i] = 59
           } else { 
             break
           }
         } */

      if (this.sec == 0) {
        this.sec = 60
        if (this.min > 0) {
          this.min--
          this.min = String(this.min).padStart(2, '0')
        } else {
          this.min = 59
          if (this.hours > 0) {
            this.hours--
            this.hours = String(this.hours).padStart(2, '0')
          }
        }
      }
      this.sec--
      this.sec = String(this.sec).padStart(2, '0')

      if (this.hours == 0 && this.min == 0 && this.sec == 0) {
        clearInterval(this.ticking)
        this.startBtnText = 'Start'
        this.activeClass = false
      }
    }, 1000);
  }
}
