import { twMerge } from "tailwind-merge";
import usePathfinding from "../hooks/usePathfinding";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";
import Tile from "./Tile";
import { useState } from "react";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers";

function Grid({ isVisualizationRunningRef }: { isVisualizationRunningRef: React.RefObject<boolean> }) {
  const { grid, setGrid } = usePathfinding();
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) return;

    setIsMouseDown(true);
    const newGrid = createNewGrid(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) return;

    setIsMouseDown(false);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isVisualizationRunningRef.current && !checkIfStartOrEnd(row, col)) return;

    if (isMouseDown) {
      const newGrid = createNewGrid(grid, row, col);
      setGrid(newGrid);
    }
  };

  return (
    <div
      className={twMerge(
        // Base classes
        "flex items-center flex-col justify-center",
        // Control grid height
        `lg:min-h-[${MAX_ROWS * 25}px]  md:min-h-[${MAX_ROWS * 21}px] xs:min-h-[${MAX_ROWS * 15}px] min-h-[${
          MAX_ROWS * 13
        }px]`,
        // Control grid width
        `lg:w-[${MAX_COLS * 25}px] md:w-[${MAX_COLS * 21}px] xs:w-[${MAX_COLS * 15}px] w-[${MAX_COLS * 13}px]`
      )}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((tile, tileIndex) => {
            const { isStart, isEnd, isTraversed, isWall, isPath } = tile;

            return (
              <Tile
                key={tileIndex}
                row={tile.row}
                col={tile.col}
                isStart={isStart}
                isEnd={isEnd}
                isTraversed={isTraversed}
                isWall={isWall}
                isPath={isPath}
                handleMouseDown={() => handleMouseDown(tile.row, tile.col)}
                handleMouseUp={() => handleMouseUp(tile.row, tile.col)}
                handleMouseEnter={() => handleMouseEnter(tile.row, tile.col)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
export default Grid;
