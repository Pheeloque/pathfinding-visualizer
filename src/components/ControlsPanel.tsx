import { useState } from "react";
import usePathfinding from "../hooks/usePathfinding";
import useTile from "../hooks/useTile";
import { EXTENDED_SLEEP_TIME, MAZES, PATHFINDING_ALGORITHMS, SLEEP_TIME, SPEEDS } from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import type { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import Select from "./Select";
import RunButton from "./RunButton";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import useSpeed from "../hooks/useSpeed";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";
import { animatePath } from "../utils/animatePath";
import { isEqual } from "../utils/helpers";

function ControlsPanel({ isVisualizationRunningRef }: { isVisualizationRunningRef: React.RefObject<boolean> }) {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { maze, setMaze, grid, setGrid, isGraphVisualized, setIsGraphVisualized, algorithm, setAlgorithm } =
    usePathfinding();
  const { startTile, endTile } = useTile();
  const { speed, setSpeed } = useSpeed();

  const handleGenerateMaze = (maze: MazeType) => {
    if (maze === "NONE") {
      setMaze(maze);
      resetGrid({ grid, startTile, endTile });
      return;
    }

    setMaze(maze);
    setIsDisabled(true);
    runMazeAlgorithm({ maze, grid, startTile, endTile, setIsDisabled, speed });
    const newGrid = grid.slice();
    setGrid(newGrid);
    setIsGraphVisualized(false);
  };

  const handleRunVisualizer = () => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      resetGrid({ grid: grid.slice(), startTile, endTile });
      return;
    }

    const { traversedTiles, path } = runPathfindingAlgorithm({
      algorithm,
      grid,
      startTile,
      endTile,
    });

    animatePath(traversedTiles, path, startTile, endTile, speed);
    setIsDisabled(true);
    isVisualizationRunningRef.current = true;

    const speedMultiplier = SPEEDS.find((s) => s.value === speed)!.value;
    const traversedDuration = SLEEP_TIME * traversedTiles.length * speedMultiplier;
    const pathDuration = EXTENDED_SLEEP_TIME * path.length * speedMultiplier;
    const totalDuration = traversedDuration + pathDuration + 2000;

    setTimeout(() => {
      const newGrid = grid.map((row) => [...row]);

      traversedTiles.forEach((tile) => {
        if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
          newGrid[tile.row][tile.col].isTraversed = false;
          newGrid[tile.row][tile.col].isPath = false;
        }
      });

      traversedTiles.forEach((tile) => {
        if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
          newGrid[tile.row][tile.col].isTraversed = true;
        }
      });

      path.forEach((tile) => {
        if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
          newGrid[tile.row][tile.col].isTraversed = false;
          newGrid[tile.row][tile.col].isPath = true;
        }
      });

      setGrid(newGrid);
      setIsGraphVisualized(true);
      setIsDisabled(false);
      isVisualizationRunningRef.current = false;
    }, totalDuration);
  };

  return (
    <div className="flex items-center justify-center flex-col w-full max-w-xs p-4 bg-zinc-700 border rounded-2xl shadow-md space-y-4">
      <h1 className="text-xl font-semibold text-center">Pathfinding Visualizer</h1>
      {/* Select maze */}
      <div className="w-30% space-y-4">
        <Select
          label="Maze"
          value={maze}
          options={MAZES}
          isDisabled={isDisabled}
          onChange={(e) => {
            handleGenerateMaze(e.target.value as MazeType);
          }}
        />

        {/* Select algorithm */}
        <Select
          label="Algorithm"
          value={algorithm}
          options={PATHFINDING_ALGORITHMS}
          onChange={(e) => {
            setAlgorithm(e.target.value as AlgorithmType);
          }}
        />

        {/* Select speed */}
        <Select
          label="Speed"
          value={speed}
          options={SPEEDS}
          isDisabled={isDisabled}
          onChange={(e) => {
            setSpeed(parseFloat(e.target.value) as SpeedType);
          }}
        />
      </div>

      <RunButton
        isDisabled={isDisabled}
        isGraphVisualized={isGraphVisualized}
        handleRunVisualizer={handleRunVisualizer}
      />
    </div>
  );
}

export default ControlsPanel;
