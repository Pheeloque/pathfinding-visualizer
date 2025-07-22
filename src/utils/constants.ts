import type { AlgorithmSelectType, MazeSelectType, SpeedSelectType } from "./types";

export const MAX_ROWS = 33;
export const MAX_COLS = 59;

export const START_TILE_CONFIGURATION = {
  row: 1,
  col: 1,
  isStart: false,
  isEnd: false,
  isWall: false,
  isPath: false,
  distance: 0,
  isTraversed: false,
  parent: null,
};

export const END_TILE_CONFIGURATION = {
  row: MAX_ROWS - 2,
  col: MAX_COLS - 2,
  isStart: false,
  isEnd: false,
  isWall: false,
  isPath: false,
  distance: 0,
  isTraversed: false,
  parent: null,
};

export const TILE_STYLE =
  "lg:w-[25px] md:w-[21px] xs:w-[15px] w-[13px] lg:h-[25px] md:h-[21px] xs:h-[15px] h-[13px] border-t border-r border-gray-300";
export const TRAVERSED_TILE_STYLE = TILE_STYLE + " bg-cyan-500";
export const START_TILE_STYLE = TILE_STYLE + " bg-green-500";
export const END_TILE_STYLE = TILE_STYLE + " bg-red-600";
export const WALL_TILE_STYLE = TILE_STYLE + " bg-gray-200";
export const PATH_TILE_STYLE = TILE_STYLE + " bg-green-600";

export const MAZES: MazeSelectType[] = [
  { name: "No maze", value: "NONE" },
  { name: "Binary Tree", value: "BINARY_TREE" },
  { name: "Recursive Division", value: "RECURSIVE_DIVISION" },
];

export const PATHFINDING_ALGORITHMS: AlgorithmSelectType[] = [
  { name: "Dijkstra", value: "DIJKSTRA" },
  { name: "A*", value: "ASTAR" },
  { name: "BFS", value: "BFS" },
  { name: "DFS", value: "DFS" },
];

export const SPEEDS: SpeedSelectType[] = [
  { name: "Slow", value: 2 },
  { name: "Normal", value: 1 },
  { name: "Fast", value: 0.5 },
];

export const SLEEP_TIME = 10;
export const EXTENDED_SLEEP_TIME = 25;
