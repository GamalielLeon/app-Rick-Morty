import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up-episode',
  templateUrl: './pop-up-episode.component.html',
  styleUrls: ['./pop-up-episode.component.css']
})
export class PopUpEpisodeComponent implements OnInit, OnDestroy {
  @Output() acceptOrCancel: EventEmitter<boolean> = new EventEmitter();
  @Input() data: any = {};
  @Input() displayInfo: boolean = true;
  @Input() staticModal: boolean = false;
  @Input() iconClass: string = 'far fa-info-circle fa-lg text-primary';

  constructor() { }
  ngOnInit(): void { if (this.staticModal) { this.setModalType(); } }
  ngOnDestroy(): void {
    document.body.removeAttribute('class');
    document.body.removeAttribute('style');
    document.body.removeAttribute('data-bs-padding-right');
    const modalsActive = document.getElementsByClassName('modal-backdrop');
    if (modalsActive.length > 0) { document.body.removeChild(modalsActive[0]); }
  }
  /********** METHODS **********/
  private setModalType(): void {
    const modalTemp: HTMLElement = document.getElementById('popUpWindow') as HTMLElement;
    modalTemp.setAttribute('data-bs-backdrop', 'static');
    modalTemp.setAttribute('data-bs-keyboard', 'false');
  }
  cancel(): void { this.acceptOrCancel.emit(false); }
  accept(): void { this.acceptOrCancel.emit(true); }
}
