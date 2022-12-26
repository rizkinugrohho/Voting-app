import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { PollsService } from '../../polls/polls.service';
import { Poll } from '../../model/poll.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  totalPolls: Poll[];
  polls: Poll[];
  next = 0;

  constructor(private pollService: PollsService) {
    this.polls = [];
    this.totalPolls = [];
   }

  ngOnInit() {
    this.subscription = this.pollService.polls.subscribe(
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
