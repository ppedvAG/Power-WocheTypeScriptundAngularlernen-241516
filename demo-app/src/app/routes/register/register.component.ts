import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  readonly formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['', Validators.pattern('^[0-9]{5}$')],
      }),
      aliases: this.formBuilder.array([]),
    });
  }

  get aliases(): FormArray {
    return this.formGroup.get('aliases') as FormArray;
  }

  addAlias() {
    const alias = this.formBuilder.control('');
    this.aliases.push(alias);

    // TODO Fokus fuer aktuelles Control setzen
  }

  removeAlias(i: number) {
    this.aliases.removeAt(i);
  }

  submit() {
    const user = <User>this.formGroup.value;

    this.messageService.addMessage(`${user.username} hat sich registriert!`);
    this.accountService.register(user);
    this.router.navigate(['/']);
  }
}
