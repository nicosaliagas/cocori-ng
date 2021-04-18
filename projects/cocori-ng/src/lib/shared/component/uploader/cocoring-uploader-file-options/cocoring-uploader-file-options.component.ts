import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileModel } from '@cocori-ng/lib/src/lib/feature-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-uploader-file-options',
  templateUrl: './cocoring-uploader-file-options.component.html',
  styleUrls: ['./cocoring-uploader-file-options.component.scss']
})
export class CocoringUploaderFileOptionsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { file: FileModel },
    private mdDialogRef: MatDialogRef<CocoringUploaderFileOptionsComponent>) {
    console.log("modal file", data.file)
  }

  ngOnInit(): void { }

  public close(value: any) {
    this.mdDialogRef.close(value);
  }
}
