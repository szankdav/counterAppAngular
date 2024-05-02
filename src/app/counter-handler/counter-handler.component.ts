import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CounterServiceService } from '../counterService/counter-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter-handler',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './counter-handler.component.html',
  styleUrl: './counter-handler.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterHandlerComponent implements OnInit {
  counterService = inject(CounterServiceService)

  count = signal(0);
  isAutoIncreasing = signal(false)
  isAutoDecreasing = signal(false)
  continousModificationId?: ReturnType<typeof setInterval>

  async ngOnInit() {
    await this.updateNumber()
  }

  async updateNumber(){
    const number = await this.counterService.getNumberFromServer()
    this.count.set(number)
  }

  async increaseNumber() {
    await this.counterService.increaseNumberOnServer()
    await this.updateNumber()
  }

  async decreaseNumber() {
    await this.counterService.decreaseNumberOnServer()
    await this.updateNumber()
  }

  intervalModification() {
    this.continousModificationId = setInterval(() => {
      if(this.isAutoIncreasing()){
        this.increaseNumber()
      }
      else if(this.isAutoDecreasing()){
        this.decreaseNumber()
      }
    }, 1000)
  }

  continuousIncrease() {
    this.clearIntervalId()
    if (this.isAutoIncreasing()) {
      this.intervalModification()
      this.isAutoDecreasing.set(false)
    }
  }

  continuousDecrease() {
    this.clearIntervalId()
    if (this.isAutoDecreasing()) {
      this.intervalModification()
      this.isAutoIncreasing.set(false)
    }
  }

  clearIntervalId() {
    clearInterval(this.continousModificationId)
  }
}
