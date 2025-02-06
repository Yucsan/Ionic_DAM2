import { Component, OnInit } from '@angular/core';
import { ApiServiceProvider } from 'src/app/providers/api-service';
import { Alumno } from '../modelo/Alumno';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SearchModalPage } from '../search-modal/search-modal.page';
import { SearchModal2Page } from '../search-modal2/search-modal2.page';
import { Modal3Page } from '../modal3/modal3.page';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  public alumnos = new Array<Alumno>();

  // Variables para conpaginación
  public currentPage = 1;
  public pageSize = 10;
  public totalAlumnos= new Array<Alumno>();

  paletteToggle = false;

  constructor(private apiService: ApiServiceProvider, 
    public alertController: AlertController,
    private modalCtrl: ModalController, private http: HttpClient){

    this.initDarkmode();  
  }

  cuenta(){
    let  cuenta = this.alumnos.length
    console.log("todos mas 1 "+cuenta+1);
    return cuenta;
  }
/*
  this.alumnos.forEach(index, ){

  }

  }*/


  initDarkmode(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    console.log(prefersDark);
    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkPalette(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

  // Check/uncheck the toggle and update the palette based on isDark
  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  toggleChange(event: CustomEvent) {
    this.toggleDarkPalette(event.detail.checked);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  
  }







  async abrirModalBusqueda() {
    const modal = await this.modalCtrl.create({
      component: SearchModalPage,
    });
    await modal.present();
 
    const { data } = await modal.onDidDismiss(); // Recoge los datos al cerrar el modal 
    if (data) {
      const { firstName, lastName } = data;
      this.buscarAlumnos(firstName, lastName); // Llama al servicio para buscar los alumnos
    }
  }
 /// busqeda http://localhost:3000/alumnos?city=Kurayoshi&id=3

// NUEVO MODAL2
async abrirModalBusquedaNombre() {
  const modal = await this.modalCtrl.create({
    component: SearchModal2Page,
  });
  await modal.present();

  const { data } = await modal.onDidDismiss(); // Recoge los datos al cerrar el modal 
  if (data) {
    const { nombre } = data;
    this.buscarAlumnosNombre(nombre); // Llama al servicio para buscar los alumnos
  }
}

// NUEVO MODAL3
async abrirModalBusqueda3() {
  const modal = await this.modalCtrl.create({
    component: Modal3Page,
  });
  await modal.present();

  const { data } = await modal.onDidDismiss(); // Recoge los datos al cerrar el modal 
  if (data) {
    const { nombre, last_name, city } = data; // nombre de atributos deben ser el del json
    this.buscarAlumnosPorNombreApellidoCiudad(nombre, last_name, city); 
  }
}

  // Llama al servicio para buscar alumnos
  buscarAlumnosPorNombreApellidoCiudad(nombre: string, apellido: string, ciudad: string) {
    this.apiService
      .buscarAlumnosPorNombreApellidoCiudad(nombre, apellido, ciudad)
      .then((resultados) => {
        this.alumnos = resultados; // Almacena los resultados en la lista
        //console.log('Resultados encontrados:', this.alumnos);
      })
      .catch((error) => {
        console.error('Error al buscar alumnos:', error);
      });
  }


buscarAlumnosNombre(nombre: string) {
  this.apiService
    .buscarAlumnosPorNombre(nombre)
    .then((resultados) => {
      this.alumnos = resultados; // Almacena los resultados en la lista
      //console.log('Resultados encontrados:', this.alumnos);
    })
    .catch((error) => {
      console.error('Error al buscar alumnos:', error);
    });
}

  // Llama al servicio para buscar alumnos
  buscarAlumnos(nombre: string, apellido: string) {
    this.apiService
      .buscarAlumnosPorNombreApellido(nombre, apellido)
      .then((resultados) => {
        this.alumnos = resultados; // Almacena los resultados en la lista
        //console.log('Resultados encontrados:', this.alumnos);
      })
      .catch((error) => {
        console.error('Error al buscar alumnos:', error);
      });
  }

  totalAlumno(): void {
    this.apiService.getAlumnos()
      .then( (alumnos:Alumno[])=> {
          this.totalAlumnos=alumnos;
      })
      .catch( (error:string) => {
          console.log(error);
      });
  }

  ngOnInit(): void {
    this.loadAlumnos();
    this.totalAlumno();
    
/*
    this.apiService.getAlumnos()
      .then((alumnos: Alumno[]) => {
        this.alumnos = alumnos;
        console.log(this.alumnos);
      })
      .catch((error: string) => {
        console.log(error);
      });
*/
  }



  loadAlumnos(): void {
    this.apiService.getAlumnosPaginados((this.currentPage-1)*10, ((this.currentPage-1)*10) + this.pageSize)
      .then((alumnos: Alumno[]) => {
        this.alumnos = alumnos; // Sobrescribe en la primera página
        //console.log(this.alumnos);
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadAlumnos();
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadAlumnos();
    }
  }

  goToNextPage(): void {
    this.currentPage++;
    this.loadAlumnos();
  }

  goToLastPage(): void {
    // Puedes implementar una llamada adicional para determinar la cantidad total de páginas.
    console.log(this.totalAlumnos.length);
    console.log(this.pageSize);
    this.currentPage = Math.ceil( this.totalAlumnos.length / this.pageSize );
    this.loadAlumnos();
  }


  /* Este método llama al método eliminarAlumno de 
  la Api y le pasa el id del alumno a eliminar. 
  Se devuelve un objeto Promise. Si el borrado ha ido bien se ejecuta 
  el código asociado a la cláusula then. Símplemente se muestra por consola 
  un mensaje y se elimina el alumno del array de alumnos de la clase, 
  lo que hará que deje de verse en la vista.
  Si el borrado ha ido mal muestro por consola el error que ha ocurrido. */

  eliminarAlumno(indice: string) {
    let aux = parseInt(indice);
    this.apiService.eliminarAlumno(this.alumnos[aux].id)
      .then((correcto: Boolean) => {
        console.log("Borrado correcto del alumno con indice: " + indice);
        this.alumnos.splice(aux, 1);
      })
  }

  borrarTodos(){
    if(confirm("Estas eguro que quieres borrar todo???")){
      this.alumnos.forEach(( alumno, index ) => {
        this.apiService.eliminarAlumno(alumno.id)
        setTimeout(()=>{
          window.location.reload();
        },500);
     });
    }else{
      console.log("cancelado")
    }
  }
/*
((value: number) => {
    console.log(value);
});
*/ 

  async modificarAlumno(indice: number) {
    let alumno = this.alumnos[indice];
    const alert = await this.alertController.create({
      header: 'Modificar',
      inputs: [
        {
          name: 'first_name',
          type: 'text',
          value: alumno.first_name,
          placeholder: 'first_name'
        },
        {
          name: 'last_name',
          type: 'text',
          id: 'last_name',
          value: alumno.last_name,
          placeholder: 'last_name'
        },
        {
          name: 'email',
          id: 'email',
          type: 'text',
          value: alumno.email,
          placeholder: 'email'
        },
        {
          name: 'gender',
          id: 'gender',
          type: 'text',
          value: alumno.gender,
          placeholder: 'gender'
        },
        {
          name: 'avatar',
          value: alumno.avatar,
          type: 'url',
          placeholder: 'avatar'
        },
        {
          name: 'address',
          value: alumno.address,
          type: 'text',
          placeholder: 'address'
        },
        {
          name: 'city',
          value: alumno.city,
          type: 'text',
          placeholder: 'city'
        },
        {
          name: 'postalCode',
          value: alumno.postalCode,
          type: 'text',
          placeholder: 'postalCode'
        }
      ],

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log(data);
            var alumnoModificado: Alumno = new Alumno( 
              alumno.id,
              data['gender'],
              data['first_name'],
              data['last_name'],
              data['email'],
              data['avatar'],
              data['address'],
              data['city'],
              data['postalCode']);
            this.apiService.modificarAlumno(alumnoModificado)
              .then((alumno: Alumno) => {
                this.alumnos[indice] = alumno;
              })
              .catch((error: string) => {
                console.log(error);
              });
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();

  }//end_modificarAlumno


  async insertarAlumno() {
    const alert = await this.alertController.create({
       header: 'Insertar Alumno',
       inputs: [
         {
           name: 'first_name',
           type: 'text',
           placeholder: 'Nombre'
    
         },
         {
           name: 'last_name',
           type: 'text',
           placeholder: 'Apellido'
         },
         {
           name: 'email',
           type: 'text',
           placeholder: 'Email'
         }
       ],
       buttons: [
         {
           text: 'Cancelar',
           role: 'cancel',
           handler: () => {
             console.log('Cancelado');
           }
         },
         {
           text: 'Insertar',
           handler: (data) => {
             const nuevoAlumno: Alumno = {
               id:  String(Math.floor(Math.random() * 10000)), // Genera un ID aleatorio
               first_name: data.first_name,
               last_name: data.last_name,
               email: data.email,
               gender: '',
               avatar: '',
               address: '',
               city: '',
               postalCode: ''
             };
    
             this.apiService.insertarAlumno(nuevoAlumno)
               .then(() => {
                 console.log("Alumno insertado correctamente");
                 this.alumnos.push(nuevoAlumno);
               })
               .catch((error) => {
                 console.log("Error al insertar: " + error);
               });
    
           }
    
         }
    
       ]
    
    });
    
    
    await alert.present();
  }



}
