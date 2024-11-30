import { Component,  Input, Output, SimpleChanges,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Iterador } from '../../utils/iterador';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})

export class PaginationComponent {


  @Input() eliminar!: boolean;
  @Input() PAGES_CANTIDADxGRUPO=3;
  @Input() funcionPagina!: (limit: number, offset: number) => Observable<any>;
  @Input() LIMIT=5;
  @Output() emitirArrPaginado = new EventEmitter<{arregloRegistrosPorPag: any[], totalRegistros:number}>();
  totalRegistros=0;
  tableElements: any[] = [];
  
  
  private ultimaPag=1;
  private primeraPag=1;
  private grupos=1;
  private group=1;
   paginas=1;
   page=1;
  iterador: Iterador | null = null; 

  ngOnInit():void{
    this.group=1;
    this.page=1;
    this.funcionPagina(this.LIMIT,this.LIMIT-this.LIMIT).subscribe({
      next:({registros,total})=>{
        
           this.cambiaTotal(registros,total)
      },
      error:(error)=>{
        console.log("error ",error)
        this.totalRegistros=0
        this.emitirArrPaginado.emit({arregloRegistrosPorPag:[],totalRegistros:0});
      }
  })          
    }
   

    cambiaTotal(registros:any,total:number){
      this.tableElements=registros;
      this.totalRegistros=total
      this.paginas=Math.ceil(this.totalRegistros/this.LIMIT);//2pag
      this.grupos=Math.ceil(this.paginas/this.PAGES_CANTIDADxGRUPO);
      this.ultimaPag=this.group*this.PAGES_CANTIDADxGRUPO
      this.primeraPag=this.ultimaPag-this.PAGES_CANTIDADxGRUPO+1;
      this.ultimaPag=this.ultimaPag>this.paginas?this.paginas:this.ultimaPag;
      this.iterador=new Iterador(this.primeraPag,this.ultimaPag);
      this.emitirArrPaginado.emit({arregloRegistrosPorPag:registros,totalRegistros:total});
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['funcionPagina'] ){
        this.ngOnInit()

      } 
      if (changes['eliminar'] ){
       this.funcionPagina(this.LIMIT,this.page*this.LIMIT-this.LIMIT).subscribe({
        next:({registros,total})=>{
          if(registros.length===0 && this.page!==1){
            this.page--
            if(Math.ceil(this.page/this.PAGES_CANTIDADxGRUPO)<this.group)
              this.group--
            this.pedirPag(this.page)
          }
          else
            this.cambiaTotal(registros,total)
        },
        error:(error)=>{
          console.log("error",error)
          this.totalRegistros=0
          this.emitirArrPaginado.emit({arregloRegistrosPorPag:[],totalRegistros:0});
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
    if(x===0)return
      this.funcionPagina(this.LIMIT,x*this.LIMIT-this.LIMIT).subscribe({
          next:({registros,total})=>{
            this.cambiaTotal(registros,total)
          },
          error:(error)=>{
            console.log("error",error)
            this.totalRegistros=0
            this.emitirArrPaginado.emit({arregloRegistrosPorPag:[],totalRegistros:0});
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
