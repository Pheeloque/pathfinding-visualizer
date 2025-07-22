import { twMerge } from "tailwind-merge";
import {
  START_TILE_STYLE,
  END_TILE_STYLE,
  TRAVERSED_TILE_STYLE,
  WALL_TILE_STYLE,
  PATH_TILE_STYLE,
  TILE_STYLE,
  MAX_ROWS,
} from "../utils/constants";

interface MouseFunction {
  (row: number, col: number): void;
}

function Tile({
  row,
  col,
  isStart,
  isEnd,
  isTraversed,
  isWall,
  isPath,
  handleMouseDown,
  handleMouseUp,
  handleMouseEnter,
}: {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isTraversed: boolean;
  isWall: boolean;
  isPath: boolean;
  handleMouseDown: MouseFunction;
  handleMouseUp: MouseFunction;
  handleMouseEnter: MouseFunction;
}) {
  let tileStyle;

  if (isStart) tileStyle = START_TILE_STYLE;
  else if (isEnd) tileStyle = END_TILE_STYLE;
  else if (isTraversed) tileStyle = TRAVERSED_TILE_STYLE;
  else if (isWall) tileStyle = WALL_TILE_STYLE;
  else if (isPath) tileStyle = PATH_TILE_STYLE;
  else tileStyle = TILE_STYLE;

  const borderStyle = row === MAX_ROWS - 1 ? "border-b" : col === 0 ? "border-l" : "";
  const edgeStyle = row === MAX_ROWS - 1 && col === 0 ? "border-l" : "";

  return (
    <div
      className={twMerge(tileStyle, borderStyle, edgeStyle)}
      id={`${row}-${col}`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseUp={() => handleMouseUp(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
    />
  );
}
export default Tile;
