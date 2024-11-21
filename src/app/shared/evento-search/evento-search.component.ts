import { Component,inject, Input,Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-evento-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './evento-search.component.html',
  styleUrl: './evento-search.component.css'
})
export class EventoSearchComponent {
   //@Input() eventos:Evento[]=[];
   @Output() emitirInput = new EventEmitter<string>();

   formulario=new FormGroup({termino:new FormControl('')})

   get termino(){
      return this.formulario.get('termino')?.value;
   }

   
 
 
   onSearch(){
         this.emitirInput.emit(this.termino || "")
   }
   
   
}
