import type { MouseEventHandler } from "react";
import { BsFillPlayFill } from "react-icons/bs";

function RunButton({
  handleRunVisualizer,
  isDisabled,
  isGraphVisualized,
}: {
  handleRunVisualizer: MouseEventHandler<HTMLButtonElement>;
  isDisabled: boolean;
  isGraphVisualized: boolean;
}) {
  return (
    <button
      disabled={isDisabled}
      onClick={handleRunVisualizer}
      className="disabled:pointer-events-none disabled:opacity-50 transition ease-in rounded-full p-2.5 shadow-md bg-green-500 hover:bg-green-400 border-none active:ring-green-300 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-30 cursor-pointer"
    >
      <BsFillPlayFill className="w-5 h-5" />
    </button>
  );
}

export default RunButton;
