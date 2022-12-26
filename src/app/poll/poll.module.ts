import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollComponent } from './poll/poll.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule
  ],
  declarations: [PollComponent]
})
export class PollModule { }
