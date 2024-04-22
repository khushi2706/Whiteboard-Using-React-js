import { useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import "./App.css";

function App() {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(10);
  const [brushColor, setBrushColor] = useState("black");

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { brushSize, brushColor, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    setLines([]);
  };

  return (
    <>
      <>
        <div className="container">
          <div className="controls">
            <h1 className="text-3xl font-bold underline">Whiteboard</h1>
            <div className="tools-container">
              <div className="inner-tool">
                <button
                  onClick={() => setBrushSize(Math.max(1, brushSize - 1))}
                >
                  <FaMinus />
                </button>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                />
                <button
                  onClick={() => setBrushSize(Math.min(brushSize + 1, 50))}
                >
                  <FaPlus />
                </button>
              </div>
              <div className="inner-tool">
                <input
                  type="color"
                  onChange={(e) => setBrushColor(e.target.value)}
                />
              </div>
              <div className="inner-tool">
                <button onClick={() => handleClear()}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <Layer>
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.brushColor}
                  strokeWidth={line.brushSize}
                  lineCap="round"
                  lineJoin="round"
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </>
      s
    </>
  );
}

export default App;
