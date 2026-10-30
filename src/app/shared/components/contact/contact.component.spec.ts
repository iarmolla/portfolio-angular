import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const fillForm = () => component.userForm.setValue({ email: 'test@example.com', message: 'Hola, me interesa tu perfil' });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not send an invalid form', async () => {
    const sendSpy = spyOn(component.emailService, 'send');
    await component.send();
    expect(sendSpy).not.toHaveBeenCalled();
    expect(component.userForm.touched).toBeTrue();
  });

  it('should show the success view and reset the form after sending', async () => {
    spyOn(component.emailService, 'send').and.resolveTo({});
    fillForm();
    await component.send();
    fixture.detectChanges();
    expect(component.status).toBe('success');
    expect(component.userForm.value.email).toBeNull();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('¡Mensaje enviado!');
  });

  it('should keep the message and show an inline error when sending fails', async () => {
    spyOn(component.emailService, 'send').and.rejectWith(new Error('network'));
    fillForm();
    await component.send();
    fixture.detectChanges();
    expect(component.status).toBe('error');
    expect(component.userForm.value.email).toBe('test@example.com');
    expect((fixture.nativeElement as HTMLElement).querySelector('[role="alert"]')).toBeTruthy();
  });
});
