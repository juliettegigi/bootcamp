import { Component,  Input,OnChanges, Output, SimpleChanges,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Iterador } from '../../utils/iterador';
import { Evento } from '../../models/evento';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})

export class PaginationComponent {


  @Input() PAGES_CANTIDADxGRUPO=3;
  @Input() funcionPagina!: (limit: number, offset: number) => Observable<any>;
  @Input() LIMIT=5;
  //@Input() objSubscribe!: (tableElementos: any[]) => { next: (response: any[]) => void; error: (error: any) => void };
  @Output() emitirArrPaginado = new EventEmitter<any[]>();
  totalRegistros=0;
  tableElements: any[] = [];
  
  
  private ultimaPag=0;
  private primeraPag=1;
  private grupos=1;
  private group=1;
  private paginas=1;
   page=1;
  iterador: Iterador | null = null; 

  ngOnInit():void{

    this.funcionPagina(this.LIMIT,this.LIMIT-this.LIMIT).subscribe({
      next:({registros,total})=>{
           this.tableElements=registros;
           this.totalRegistros=total
           this.paginas=Math.ceil(this.totalRegistros/this.LIMIT);//2pag
           this.grupos=Math.ceil(this.paginas/this.PAGES_CANTIDADxGRUPO);
           this.ultimaPag=this.group*this.PAGES_CANTIDADxGRUPO
           this.ultimaPag=this.ultimaPag>this.paginas?this.paginas:this.ultimaPag;
           this.iterador=new Iterador(this.primeraPag,this.ultimaPag); 
           this.emitirArrPaginado.emit(this.tableElements);
      },
      error:(error)=>{
        console.log("error",error)
        this.emitirArrPaginado.emit([]);
      }
  })          
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['funcionPagina'] && changes['funcionPagina'].currentValue !== changes['funcionPagina'].previousValue) {
        this.funcionPagina(this.LIMIT,this.LIMIT-this.LIMIT).subscribe({
          next:({registros,total})=>{
               this.tableElements=registros;
               this.totalRegistros=total
               this.paginas=Math.ceil(this.totalRegistros/this.LIMIT);//2pag
               this.grupos=Math.ceil(this.paginas/this.PAGES_CANTIDADxGRUPO);
               this.ultimaPag=this.group*this.PAGES_CANTIDADxGRUPO
               this.ultimaPag=this.ultimaPag>this.paginas?this.paginas:this.ultimaPag;
               this.iterador=new Iterador(this.primeraPag,this.ultimaPag);
               this.emitirArrPaginado.emit(this.tableElements);
          },
          error:(error)=>{
            console.log("error",error)
            this.emitirArrPaginado.emit([]);
          }
      })   
      }

    }
  
  

  next(x:number){
   if(this.group==(x==-1?1:this.grupos))return
   this.grupoSiguiente(x);
   this.page=this.primeraPag;
   this.pedirPag(this.primeraPag);
  }
  nextBloque(){ //avanza de a 1 bloque
    this.next(1)
  }
  nextBloqueInversa(){
    this.next(-1)
  }

  pedirPag(x:number){
    //2   (5,0)  his.usuarioApi.getUsuariosConfirmados(this.evento!.id,limit,offset)
      this.funcionPagina(this.LIMIT,x*this.LIMIT-this.LIMIT).subscribe({
          next:({registros,total})=>{
               this.tableElements=registros;
               this.totalRegistros=total;
               
               this.emitirArrPaginado.emit(this.tableElements);
          },
          error:(error)=>{
            console.log("error",error)
            this.emitirArrPaginado.emit([]);
          }
      })
  }
  
  next2(x:number){ 
    if( this.page==(x==-1?1:this.paginas)) return
    if(this.page==(x==-1?this.primeraPag:this.ultimaPag))
      this.grupoSiguiente(x);
    this.page+=x;
    this.pedirPag(this.page);
  } 
  nextPag(){ //avanza de a 1 página
    console.log("first33  ",this.totalRegistros)
    this.next2(1)
  }
  nextPaginversa(){
    this.next2(-1)
  }  

  pagTal(i:number){
    this.page=i;
    this.pedirPag(this.page);
  }

  grupoSiguiente(x:number){
    this.group+=x;
    this.ultimaPag=this.group*this.PAGES_CANTIDADxGRUPO
    this.primeraPag=this.ultimaPag-this.PAGES_CANTIDADxGRUPO+1;
    this.ultimaPag=this.ultimaPag>this.paginas?this.paginas:this.ultimaPag;
    this.iterador=new Iterador(this.primeraPag,this.ultimaPag);
  }
}
