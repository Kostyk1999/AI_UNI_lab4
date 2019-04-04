export class Table {
  tableName: string;
  colsDesc: string[];
  rowsDesc: string[];
  matrix: number[][];
  sumsByRow: number[] = [];
  normalizedSumsByRow: number[] = [];

  constructor(tableName: string, colsDesc: string[], rowsDesc: string[], values: number[][]) {
    this.tableName = tableName;
    this.colsDesc = colsDesc;
    this.rowsDesc = rowsDesc;
    this.matrix = values;
  }
}


export const defaultMatrixes: number[][][] = [
  [
    [1, 0.25, 4, 0.17],
    [4, 1, 4, 0.25],
    [0.25, 0.25, 1, 0.2],
    [6, 4, 5, 1]
  ],
  [
    [1, 0.33, 2, 0.2],
    [3, 1, 0.5, 0.25],
    [0.5, 2, 1, 0.2],
    [5, 4, 5, 1]
  ],
  [
    [1, 0.13, 6, 0.17],
    [8, 1, 0.5, 0.25],
    [0.17, 2, 1, 0.2],
    [6, 4, 5, 1]
  ],
];

export const criteriasComparing: number[][] = [
  [1, 0.5, 3],
  [2, 1, 4],
  [0.33, 0.25, 1]
];
