import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HideLoader, ShowLoader, validateEmptyString } from 'src/app/Helpers/GeneralHelpers';
import { Lead } from 'src/app/Models/Lead';
import { IturanApiService } from 'src/app/Services/ituran-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {
  stepForm: FormGroup;
  lead: Lead;

  constructor(private fb: FormBuilder, private ituranApi: IturanApiService) { }

  ngOnInit(): void {
    this.stepForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3),validateEmptyString]],
      telefono: ['', [Validators.required, Validators.minLength(10),validateEmptyString]],
      correo: ['', [Validators.email, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i)]]
    });
  } // +\\.[a-z]{2,4}$/i

  sendLead():void {
    var nombreLead = this.stepForm.get('nombre').value;
    var correo = this.stepForm.get('correo').value;
    var telefono = this.stepForm.get('telefono').value;

    this.lead = new Lead();
    this.lead.NM_LEAD = nombreLead.replace(/\s+/g, " ") + " Fast Lead";
    this.lead.DS_EMAIL = correo === '' ? "fastlead@fastlead.com" : correo;
    this.lead.NR_TELEFONE = telefono;
    this.lead.DS_ORIGEM = 'FastLead';
    this.lead.NM_PRIMEIRO_NOME = nombreLead.replace(/\s+/g, " ") + " Fast Lead";
    this.lead.NM_SOBRENOME_PAI = "FastLead";
    this.lead.NM_SOBRENOME_MAE = "FastLead";

    if(!this.stepForm.valid) {
      this.stepForm.markAllAsTouched();
      return
    }
    ShowLoader();
    console.log('**LEAD REQUEST**')
    console.log(this.lead)
    this.ituranApi.sendLead(this.lead).subscribe({
      next: response => {
        console.log('**LEAD RESPONSE**')
        console.log(response)
        HideLoader();
        this.ClearLead();
        Swal.fire('¡Gracias!', "Hemos recibido tus datos, en breve nuestro equipo se pondrá en contacto contigo.", 'success');
      },
      error: err => {
        console.log('**LEAD ERROR RESPONSE**')
        console.log(err);
        HideLoader();
        this.ClearLead();
        Swal.fire('Por el momento no podemos completar el proceso', "Contactanos al 800 911 9898", 'error');
      }
    });
  }

  ClearLead(){
    this.stepForm.patchValue({
      nombre: '',
      telefono: '', 
      correo : ''
    });
    this.stepForm.markAsPristine();
    this.stepForm.markAsUntouched();
  }

}
