import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../../core/services/email.service';
import { environment } from '../../../../environments/environment';
import { RevealDirective } from '../../directives/reveal.directive';

type SendStatus = 'idle' | 'success' | 'error'

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnDestroy {
  emailService = inject(EmailService)
  socialMedia = environment.socialMedia
  userForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });
  sending = false
  status: SendStatus = 'idle'
  copied = signal(false)
  copyTimer?: ReturnType<typeof setTimeout>
  async send() {
    if (this.sending) return
    if (!this.userForm.valid) {
      return this.userForm.markAllAsTouched();
    }
    this.sending = true
    this.status = 'idle'
    try {
      await this.emailService.send(this.userForm.value)
      this.userForm.reset()
      this.status = 'success'
    } catch (error) {
      // Keep what the visitor wrote so they can retry
      this.status = 'error'
    } finally {
      this.sending = false
    }
  }
  async copyEmail() {
    try {
      await navigator.clipboard.writeText(this.socialMedia.email)
      this.copied.set(true)
      clearTimeout(this.copyTimer)
      this.copyTimer = setTimeout(() => this.copied.set(false), 2000)
    } catch { }
  }
  ngOnDestroy() {
    clearTimeout(this.copyTimer)
  }
}
