import {Component, OnInit} from '@angular/core';
import {criteriasComparing, defaultMatrixes, Table} from './model';

@Component({
  selector: 'app-lab4',
  templateUrl: './lab4.component.html',
  styleUrls: ['./lab4.component.scss']
})
export class Lab4Component implements OnInit {
  showTables = {
    showCriteriaTables: false,
    showGeneralTable: false
  };

  criterias: string[] = [
    'Style',
    'Comfortance',
    'Reliability'
  ];
  criteriaTables: Table[] = [];
  entityName = 'Computer';
  numberOfEntities = 4;
  totalCriteriaResultsAreReady = false;
  criteriaComparings = {
    matrix: criteriasComparing,
    sumsByRow: [],
    normilizedSumsByRow: []
  };

  TOTAL_RES_READY_FOR_CALC = false;
  totalResults: number[] = [];

  dtOptions: any = {
    'paging': false,
    'ordering': false,
    'info': false,
    'searching': false
  };

  constructor() {
  }

  ngOnInit() {
    if (this.criterias.length < 1) {
      this.criterias.push('');
    } // first criteria input
  }

  addNewCriteria() {
    this.criterias = this.criterias.filter(value => value !== '');
    this.criterias.push('');
  }

  removeCriteria(criteria: string) {
    this.criterias = this.criterias.filter(value => value !== criteria);
  }

  createCriteriaTables() {
    this.criteriaTables = [];

    // descriptions of tables
    const tableDescriptions: string[] = [];
    for (let i = 0; i < this.numberOfEntities; ++i) {
      tableDescriptions.push(this.entityName + i);
    }

    for (let k = 0; k < this.criterias.length; ++k) {
      let matrix;
      // set default matrixes
      if (k < defaultMatrixes.length) {
        matrix = defaultMatrixes[k];
      } else {
        matrix = defaultMatrixes[0];
      }
      const table: Table = new Table(this.criterias[k], tableDescriptions, tableDescriptions, matrix);
      this.criteriaTables.push(table);
    }
  }

  calculateTable(criteriaTable: Table) {
    let totalSum = 0;
    for (let i = 0; i < criteriaTable.matrix.length; ++i) {
      let sumByRow = 0;
      for (let j = 0; j < criteriaTable.matrix[i].length; ++j) {
        sumByRow += criteriaTable.matrix[i][j];
      }
      totalSum += sumByRow;
      criteriaTable.sumsByRow.push(this.toFixed2(sumByRow));
    }
    for (const rowSum of criteriaTable.sumsByRow) {
      criteriaTable.normalizedSumsByRow.push(this.toFixed2(rowSum / totalSum));
    }

    this.totalCriteriaResultsAreReady = true;
    for (const critTable of this.criteriaTables) {
      if (critTable.sumsByRow.length !== critTable.matrix.length) {
        this.totalCriteriaResultsAreReady = false;
      }
    }
  }

  calculateCriteraComparings() {
    let totalSum = 0;
    for (let i = 0; i < this.criteriaComparings.matrix.length; ++i) {
      let sumByRow = 0;
      for (let j = 0; j < this.criteriaComparings.matrix[i].length; ++j) {
        sumByRow += this.criteriaComparings.matrix[i][j];
      }
      totalSum += sumByRow;
      this.criteriaComparings.sumsByRow.push(this.toFixed2(sumByRow));
    }
    for (const rowSum of this.criteriaComparings.sumsByRow) {
      this.criteriaComparings.normilizedSumsByRow.push(this.toFixed2(rowSum / totalSum));
    }

    if (this.criteriaComparings.sumsByRow) {
      this.TOTAL_RES_READY_FOR_CALC = true;
    }

  }

  setTotalResults() {
    this.totalResults = new Array(this.numberOfEntities);
    for (let i = 0; i < this.totalResults.length; ++i) {
      let res = 0;
      for (let j = 0; j < this.criterias.length; ++j) {
        res += this.criteriaTables[j].normalizedSumsByRow[i] * this.criteriaComparings.normilizedSumsByRow[j];
      }
      this.totalResults[i] = this.toFixed2(res);
    }
  }

  trackByIdx(index: number, obj: any) {
    return index;
  }


  toFixed2(num: number) {
    return Number(num.toFixed(2));
  }
}
