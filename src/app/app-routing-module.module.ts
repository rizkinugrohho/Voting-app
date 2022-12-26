import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { PollComponent } from './poll/poll/poll.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'polls',
    loadChildren: 'app/polls/polls.module#PollsModule'
  },
  {
    path: 'poll',
    component: PollComponent
  },
  {
    path: 'poll/:id',
    component: PollComponent
  },
];

@NgModule ({
    imports: [
        RouterModule.forRoot(appRoutes, {
          preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }