import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormArray, FormControl, Validators, FormGroup } from '@angular/forms';
import { PollsService } from '../polls.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.css']
})
export class NewPollComponent implements OnInit {

  pollForm: FormGroup;

  constructor(
    private pollService: PollsService,
    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastsManager
  ) {}

  ngOnInit() {
    this.initForm();
  }

  getOptions(form): FormArray {
    return form.get('options').controls;
  }

  onDeleteOption(index: number) {
    (<FormArray>this.pollForm.get('options')).removeAt(index);
  }

  onAddOption() {
    (<FormArray>this.pollForm.get('options')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'votes': new FormControl(0, [Validators.required])
      })
    );
  }

  onSubmit() {
    this.pollService.savePoll(this.pollForm.value).then(
      (response: Response) => {
        this.toastr.success('Poll Published!', 'Success!');
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    ).catch(
      (error: Error) => {
        this.toastr.error(error.message, error.name);
      }
    );
  }

  isValid() {
    return (this.pollForm.valid && this.getOptions(this.pollForm).length > 0);
  }

  private initForm() {
    this.pollForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'options': new FormArray([], Validators.minLength(2))
    });
  }

}
