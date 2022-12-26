import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { NewPollComponent } from './new-poll/new-poll.component';
import { MyPollsComponent } from './my-polls/my-polls.component';

const pollsRoutes: Routes = [
  {
    path: '',
    component: MyPollsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'new',
    component: NewPollComponent,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pollsRoutes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [
    AuthGuardService
  ]
})
export class PollsRoutingModule { }
