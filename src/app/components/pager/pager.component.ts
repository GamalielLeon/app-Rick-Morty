import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CURRENT_PAGE, PAGE_SIZE } from 'src/app/constants/sesionStorage';
import { PagesDataModel } from '../../models/pagesData.model';
import { CHARACTERS } from 'src/app/constants/paths';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  @Output() selectedPage: EventEmitter<number[]> = new EventEmitter();
  @Input() totalRecords: number = 1;
  pagesData: PagesDataModel = {pageNumber: 1, totalPages: 1, pageSize: 12, totalRecords: 1};
  routePages: string = `/${CHARACTERS}`;
  private pages: number[] = [];

  constructor() { }
  ngOnInit(): void {
    const currentPage: number = +(sessionStorage.getItem(CURRENT_PAGE) || '1');
    const pageSize: number = +(sessionStorage.getItem(PAGE_SIZE) || '12');
    this.setPagesData(currentPage, pageSize);
  }
  /********** METHODS **********/
  generateTextPages(): string{
    const pagesDataTemp = this.pagesData;
    const auxText1: number = (pagesDataTemp.pageNumber - 1) * pagesDataTemp.pageSize + 1;
    const auxText2: number = pagesDataTemp.pageNumber < pagesDataTemp.totalPages ?
                             pagesDataTemp.pageNumber * pagesDataTemp.pageSize :
                             pagesDataTemp.totalRecords;
    return `${auxText1}-${auxText2} de ${pagesDataTemp.totalRecords} elementos`;
  }
  changePage(page: number, pageSize: number = this.pagesData.pageSize): void {
    this.setPagesData(arguments.length === 1 ? page : 1, pageSize);
    sessionStorage.setItem(CURRENT_PAGE, `${this.pagesData.pageNumber}`);
    sessionStorage.setItem(PAGE_SIZE, `${this.pagesData.pageSize}`);
    this.selectedPage.emit([this.pagesData.pageNumber, pageSize]);
  }
  firstPage(): void { this.changePage(1); }
  lastPage(): void { this.changePage(this.pagesData.totalPages); }
  nextPage(): void { this.changePage(++this.pagesData.pageNumber); }
  previousPage(): void { this.changePage(--this.pagesData.pageNumber); }
  changePageSize(pageSize: number): void { this.changePage(this.pagesData.pageNumber, pageSize); }
  /********** GETTERS **********/
  getPages(): number[] {
    let pagesToShow: number[] = [];
    const currentPage: number = this.pagesData.pageNumber;
    if (currentPage === 1) { pagesToShow = this.pages.slice(currentPage - 1, currentPage + 2); }
    else { pagesToShow = this.pages.slice(currentPage - 2, currentPage + 1); }
    return pagesToShow;
  }
  /********** SETTERS **********/
  private setPages(): void {
    this.pages.splice(0, this.pages.length);
    for (let page = this.pagesData.totalPages; page > 0; page--) { this.pages.unshift(page); }
  }
  setPagesData(page: number, pagesSize: number = this.pagesData.pageSize): void {
    this.pagesData = { totalPages: Math.ceil(this.totalRecords / pagesSize), pageNumber: page,
                       pageSize: pagesSize, totalRecords: this.totalRecords };
    this.setPages();
  }
}
