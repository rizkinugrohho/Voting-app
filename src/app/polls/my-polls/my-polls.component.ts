import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Poll } from '../../model/poll.model';
import { PollsService } from '../polls.service';
import { Subscription } from 'rxjs/Subscription';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.css'],
  animations: [
    trigger(
      'listItem', [
        transition(':enter', [
          style({ transform: 'translateY(-10px)', opacity: 0}),
          animate('200ms', style({transform: 'translateY(0)', opacity: 1}))
        ])
      ]
    )
  ]
})
export class MyPollsComponent implements OnInit, OnDestroy {
  totalPolls: Poll[];
  subscription: Subscription;
  polls: Poll[];
  next = 0;

  constructor(private pollService: PollsService) {
    this.polls = [];
    this.totalPolls = [];
  }

  ngOnInit() {
    this.subscription = this.pollService.getUserPolls().subscribe(
      polls => {
        if (this.totalPolls.length !== polls.length) {
          this.totalPolls = polls.reverse();
          this.polls = [];
          this.next = 0;
          this.doNext();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  doNext() {
    if (this.next < this.totalPolls.length) {
      this.polls.push(this.totalPolls[this.next++]);
    }
  }

}
