import { Injectable } from '@angular/core';
import { Poll } from '../model/poll.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../auth/auth.service';
import { User } from 'firebase';
import { Thenable } from 'firebase/app';

@Injectable()
export class PollsService {
  polls: FirebaseListObservable<Poll[]>;
  uid: string;
  displayName: string;
  email: string;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.polls = db.list('/polls', {
      query: {
        orderByChild: 'timestamp',
      }
    });
    this.authService.user.subscribe(
      (user: User) => {
        if (user) {
          this.uid = user.uid;
          this.displayName = user.displayName;
          this.email = user.email;
        } else {
          this.uid = '';
          this.displayName = '';
          this.email = '';
        }
      }
    );
  }

  savePoll(poll: Poll) {
    poll['displayName'] = this.displayName;
    poll['uid'] = this.uid;
    poll['email'] = this.email;
    poll['timestamp'] = new Date().getTime();
    return this.polls.push(poll);
  }

  getUserPolls() {
    return this.db.list('/polls', {
      query: {
        orderByChild: 'uid',
        equalTo: this.uid
      }
    });
  }

  getPoll(key) {
    return this.db.object('/polls/' + key);
  }

}
