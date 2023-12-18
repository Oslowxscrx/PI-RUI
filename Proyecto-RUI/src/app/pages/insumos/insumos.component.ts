import { Component, OnInit } from '@angular/core';


import { MatDialog } from '@angular/material/dialog';

import { finalize } from 'rxjs';
import { Assets } from 'src/app/interface/assets/assets';
import { AssetsService } from 'src/app/service/insumos.service';
import { ModalAssetsComponent } from './assets-modal/modal-assets.component';

@Component({
  selector: 'app-assets',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class AssetsComponent implements OnInit {
  assets: Assets[] = [];
  loading: boolean = true;

  constructor(private _assetService: AssetsService, 
    private _dialog: MatDialog,) 
  
  { }

  ngOnInit(): void {
    this.getAssets()
  }

  getAssets() {
    this.loading = true;
    this._assetService.getAssets().subscribe({
      next: (response: Assets[]) => {
        console.log('insumos',response);
        this.handleResponse(response);
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  private handleResponse(response: any): void {
    this.assets = response;
  this.loading = false;
}

private handleError(error: any): void {
  if (error.status === 404) {
    console.error("Error al obtener insumo:", error.error.message);
    this.assets = error.error.data
  }
  this.loading = false;
}

openModal(): void {
  const dialogRef = this._dialog.open(ModalAssetsComponent, {
    height: '600px',
    width: '550px',
    data: { /* datos que deseas pasar al componente de contenido del modal */ }
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    if (result) {
      // Realizar acciones después de cerrar el modal
    }
  });
}

abrirModalParaEditar(assetId: number): void {
  const dialogRef = this._dialog.open(ModalAssetsComponent, {
    height: '600px',
    width: '550px',
    data: { assetId: assetId },
  });
}

deleteUser(asset: Assets): void {
  this._assetService.deleteAssetById(asset.id)
    .pipe(
      finalize(() => {
        // this._router.navigate(['/system/usuarios']);
      })
    )
    .subscribe((res: any) => {
      if (res.status === 'success') {
        this.handleResponse(res);
      }
    });
}


openDialogDeleteEmployee(asset: Assets): void {
  const dialogRef = this._dialog.open(ModalAssetsComponent, {
    height: '350px',
    width: '700px',
    data: {
      title: '¿ Está seguro de eliminar este insumo ?',
      message:
        'El insumo sera eliminado definitivamente del sistema.',
      button: 'Eliminar',
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.deleteUser(asset);
    }
    });
  }
}
