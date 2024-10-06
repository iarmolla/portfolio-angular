import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../../core/services/email.service';
import { Report } from 'notiflix/build/notiflix-report-aio';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @ViewChild('close') close!: ElementRef
  emailService = inject(EmailService)
  userForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });
  async send() {
    console.log(this.userForm);
    if (!this.userForm.valid) {
      return this.userForm.markAllAsTouched();
    }
    try {
      await this.emailService.send(this.userForm.value)
      this.userForm.reset()
      this.close.nativeElement.click()
      Report.success(
        'Correo enviado',
        'Tu mensaje se ha enviado exitosamente. Pronto me pondré en contacto contigo. ¡Gracias por tu interés!',
        'Aceptar',
      );
    } catch (error) {
      this.close.nativeElement.click()
      Report.failure(
        'Error en el envío',
        'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente más tarde.',
        'Aceptar'
      );
    }
  }
}
