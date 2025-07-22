import { useRef } from "react";
import Grid from "./components/Grid";
import { PathfindingProvider } from "./context/PathfindingContext";
import { SpeedProvider } from "./context/SpeedContext";
import { TileProvider } from "./context/TileContext";
import ControlsPanel from "./components/ControlsPanel";

function App() {
  const isVisualizationRunningRef = useRef(false);

  return (
    <PathfindingProvider>
      <TileProvider>
        <SpeedProvider>
          <div className="flex justify-center items-center gap-8 p-6 min-h-screen mx-auto">
            <ControlsPanel isVisualizationRunningRef={isVisualizationRunningRef} />
            <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
          </div>
        </SpeedProvider>
      </TileProvider>
    </PathfindingProvider>
  );
}

export default App;
