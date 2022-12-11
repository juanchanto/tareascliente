import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tareas: any[] = [];
  //Crea un nuevo objeto
  tarea = {
    id: null,
    nombre: '',
    completado: false
  }

  constructor(
    private appService: AppService
  ) {

  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.appService.getAll()
      .subscribe((data: any) => this.tareas = data);
  }

  save() {

    if (this.tarea.id) {
      this.appService.update(this.tarea.id!, this.tarea)
        .subscribe(() => this.getAll());//cargar nuevamente las tareas
    } else {
      this.appService.create(this.tarea)
        .subscribe(() => this.getAll());//cargar nuevamente las tareas

    }

    //Limpiar formulario despues del insert
    this.tarea = {
      id: null,
      nombre: '',
      completado: false
    }
  }

  edit(tarea: any) {
    this.tarea = {
      ...tarea
    };
  }

  delete(tarea: any){
    this.appService.delete(tarea.id)
    .subscribe(() => this.getAll());
  }


}
