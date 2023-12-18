import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule si estás usando formularios reactivos
import { AssetsService } from 'src/app/service/insumos.service';

@Component({
  selector: 'app-assets',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class AssetsComponent implements OnInit {
  assets: any[] = [];
  assetForm: FormGroup;
  showAddForm: boolean = false;

  constructor(
    private assetsService: AssetsService,
    private formBuilder: FormBuilder
  ) {
    this.assetForm = this.formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cedula: [''], // Puedes ajustar las validaciones según tus requisitos
      fechaAsignacion: ['', Validators.required],
      vidaUtil: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.assetsService.getAllAssets().subscribe(
      (response) => {
        this.assets = response.data; // Asegúrate de ajustar la estructura de datos según la respuesta del servidor
      },
      (error) => {
        console.error('Error fetching assets:', error);
      }
    );
  }

  createAsset(): void {
    if (this.assetForm.valid) {
      this.assetsService.createAsset(this.assetForm.value).subscribe(
        (response) => {
          console.log('Asset created:', response);
          this.assetForm.reset();
          this.loadAssets();
        },
        (error) => {
          console.error('Error creating asset:', error);
        }
      );
    } else {
      console.error('Invalid asset data.');
    }
  }

  updateAsset(id: number): void {
    if (this.assetForm.valid) {
      this.assetsService.updateAsset(id, this.assetForm.value).subscribe(
        (response) => {
          console.log('Asset updated:', response);
          this.assetForm.reset();
          this.loadAssets();
        },
        (error) => {
          console.error('Error updating asset:', error);
        }
      );
    } else {
      console.error('Invalid asset data.');
    }
  }

  deleteAsset(id: number): void {
    this.assetsService.deleteAsset(id).subscribe(
      () => {
        console.log('Asset deleted');
        this.loadAssets();
      },
      (error) => {
        console.error('Error deleting asset:', error);
      }
    );
  }

  // Puedes agregar más métodos según tus necesidades, como obtener un solo activo, etc.
}
