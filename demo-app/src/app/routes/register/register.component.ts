import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements AfterViewInit, OnDestroy {
  readonly formGroup: FormGroup;

  @ViewChildren('aliasInputRef')
  aliasInputRefs?: QueryList<ElementRef>;
  changeSubscription?: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private accountService: AccountService,
    private router: Router,
    private cdr: ChangeDetectorRef
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

  // AfterViewInit nach dem ersten Zeichnen der Seite
  ngAfterViewInit(): void {
    this.changeSubscription = this.aliasInputRefs?.changes.subscribe(() => {
      this.focusLastAlias();

      // Es kann sein, dass eine Aktualisierung nicht statt findet (aeltere Angular Versionen)
      // Dann koennen wir das Neuzeichnen forcieren
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.changeSubscription?.unsubscribe();
  }

  addAlias() {
    const alias = this.formBuilder.control('');
    this.aliases.push(alias);

    // setTimeout() ist ein Trick, damit der Code erst im naechsten Zyklus ausgefuehrt wird
    // Dieser Code-Smell kann fehleranfaellig sein (andere Browser?)
    // setTimeout(() => this.focusLastAlias());
  }

  private focusLastAlias() {
    if (this.aliasInputRefs) {
      this.aliasInputRefs.last.nativeElement.focus();
    }
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
