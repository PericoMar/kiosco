import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../../../../../services/snackBar/snackbar.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { CommonModule } from '@angular/common';
import { PrinterService } from '../../../../../services/printer/printer.service';
import { FamilyService } from '../../../../../services/family.service';
import { AppConfig } from '../../../../../../config/app-config';

@Component({
  selector: 'app-family-modal',
  standalone: true,
  imports: [CommonModule ,FormsModule, ReactiveFormsModule],
  templateUrl: './family-modal.component.html',
  styleUrl: './family-modal.component.css'
})
export class FamilyModalComponent {
  familyForm: FormGroup;
  isEditMode: boolean;

  familyImgUrl: string | ArrayBuffer | null = 'assets/svg/camera.svg';

  printers!: any[];
  loadingFamily: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { familyId: number | null, name: string | null, status: string | null },
    private fb: FormBuilder,
    private printerService: PrinterService,
    private snackbarService: SnackbarService,
    private familyService: FamilyService
  ) {
    this.isEditMode = !!data.familyId; // true si hay un id de producto
    this.familyForm = this.fb.group({
      name: ['', Validators.required],
      img: [null],
      status: ['Habilitado', Validators.required],
      description: [''],
      printers: this.fb.array([this.fb.control('')]) // Cambiar a this.fb.control
    });
    

    if (this.isEditMode) {
      this.loadFamilyData(data.familyId!);
      this.loadingFamily = true;
    } 
  }

  ngOnInit(){
    this.printers = this.printerService.printers;
  }


  loadFamilyData(familyId: number) {
    console.log(familyId)
    this.familyService.getFamilyByIdObservable(familyId.toString()).subscribe(family => {
      console.log("Family:", family);
      this.familyForm.patchValue(family);
      this.familyImgUrl = family.img ? AppConfig.STORAGE_URL + family.img : 'assets/svg/camera.svg';
      this.loadingFamily = false;
    });
  }

  addPrinterSelect(): void {
    console.log('Controls:', this.familyForm.controls['printers']);
    const printersArray = this.familyForm.get('printers') as FormArray;
    console.log(printersArray.controls);
    printersArray.push(this.fb.control('')); // Añade un nuevo control vacío
  }

  deletePrinterSelect(index: number): void {
    const printersArray = this.familyForm.get('printers') as FormArray;
    printersArray.removeAt(index); // Elimina el control en el índice indicado
  }

  onDelete() {
    this.familyService.openDeleteFamilyModal({ name: this.familyForm.value.name , id: this.data.familyId!});
  }

  // ViewChild para acceder al input de archivo
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Método para abrir el selector de archivos
  editImage(): void {
    this.fileInput.nativeElement.click();
  }

  // Método para manejar la carga de la imagen
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      this.familyForm.patchValue({
        img: file
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        this.familyImgUrl = e.target?.result!; // Guarda la URL de la imagen cargada
      };
      reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    }
  }

  getStatusClass(status: string): string {
    if (status === 'Habilitado') {
      return 'habilitado';
    } else if (status === 'Deshabilitado') {
      return 'deshabilitado';
    }
    return '';
  }

  changeStatus(){
    this.familyForm.value.status = this.familyForm.value.status === 'Habilitado' ? 'Deshabilitado' : 'Habilitado';
    console.log(this.familyForm.value.status);
  }

  save() {
    this.familyForm.markAllAsTouched(); 
    if (this.familyForm.valid) {
      const familyData = this.familyForm.value;
      this.dialogRef.close(familyData);
      // this.snackbarService.openSnackBar( `Familia creada con exito.` , 'Cerrar', 3000, ['custom-snackbar', 'success-snackbar']);
    } else {
      this.snackbarService.openSnackBar('Por favor, rellene los campos obligatorios', 'Cerrar');
    }
  }

  close() {
    this.dialogRef.close();
  }
}
