import { MAX_COLS, MAX_ROWS } from "./constants";
import type { TileType, GridType } from "./types";

const retrieveHeuristicCost = (currentTile: TileType, endTile: TileType) => {
  const manhattanDistance = 1;
  const r = Math.abs(currentTile.row - endTile.row);
  const c = Math.abs(currentTile.col - endTile.col);
  return manhattanDistance * (r + c);
};

export const initHeuristicCost = (grid: GridType, endTile: TileType) => {
  const heuristicCost = [];
  for (let i = 0; i < MAX_ROWS; i++) {
    const row = [];
    for (let j = 0; j < MAX_COLS; j += 1) row.push(retrieveHeuristicCost(grid[i][j], endTile));
    heuristicCost.push(row);
  }
  return heuristicCost;
};

export const initFunctionCost = () => {
  const functionCost = [];
  for (let i = 0; i < MAX_ROWS; i++) {
    const row = [];
    for (let j = 0; j < MAX_COLS; j++) row.push(Infinity);
    functionCost.push(row);
  }
  return functionCost;
};
