import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPollsComponent } from './my-polls/my-polls.component';
import { PollsRoutingModule } from './polls-routing.module';
import { NewPollComponent } from './new-poll/new-poll.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PollsService } from './polls.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PollsRoutingModule
  ],
  declarations: [MyPollsComponent, NewPollComponent],
  providers: [
    PollsService
  ]
})
export class PollsModule { }
