import { useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import { FaPlus, FaMinus, FaTrash, FaEraser } from "react-icons/fa";
import "./App.css";

function App() {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(10);
  const [brushColor, setBrushColor] = useState("black");
  const [isEraser, setIsEraser] = useState(false);
  const [eraserLine, setEraserLine] = useState([]);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    if (isEraser) {
      setEraserLine([
        { brushSize, brushColor: "white", points: [pos.x, pos.y] },
      ]);
    } else {
      setLines([...lines, { brushSize, brushColor, points: [pos.x, pos.y] }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (isEraser) {
      let lastLine = eraserLine[0];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      setEraserLine([lastLine]);
    } else {
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      setLines([...lines.slice(0, lines.length - 1), lastLine]);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    setLines([]);
    setEraserLine([]);
  };

  const handleToggleEraser = () => {
    setIsEraser(!isEraser);
    setBrushColor(isEraser ? "black" : "black");
  };

  return (
    <div className="container">
      <div className="controls">
        <h1 className="text-3xl font-bold underline">Whiteboard</h1>
        <div className="tools-container">
          <div className="inner-tool">
            <button onClick={() => setBrushSize(Math.max(1, brushSize - 1))}>
              <FaMinus />
            </button>
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
            />
            <button onClick={() => setBrushSize(Math.min(brushSize + 1, 50))}>
              <FaPlus />
            </button>
          </div>
          <div className="inner-tool">
            <input
              type="color"
              onChange={(e) => setBrushColor(e.target.value)}
              value={brushColor}
            />
          </div>
          <div className="inner-tool">
            <button onClick={() => handleClear()}>
              <FaTrash />
            </button>
          </div>
          <div className="inner-tool">
            <button onClick={handleToggleEraser}>
              <FaEraser color={isEraser ? "red" : "black"} />
            </button>
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
            {eraserLine.map((line, i) => (
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
    </div>
  );
}

export default App;
