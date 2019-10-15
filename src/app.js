import React, { useCallback, useEffect, useState } from "react";

const range = (l, r) => {
  const ans = [];
  for (let i = l; i < r; ++i) {
    ans.push(i);
  }
  return ans;
};

const App = () => {
  const [rowCount, setRowCount] = useState(4);
  const [colCount, setColCount] = useState(4);
  const [maskList, setMaskList] = useState(Array.from(Array(rowCount * colCount), () => 1));

  const updateChessboardSize = useCallback((e) => {
    e.preventDefault();
    const rowCount = parseInt(e.target.rowCount.value);
    const colCount = parseInt(e.target.colCount.value);
    setRowCount(rowCount);
    setColCount(colCount);
  }, []);

  useEffect(() => {
    setMaskList(Array.from(Array(rowCount * colCount), () => 1));
  }, [rowCount, colCount]);

  return (
    <React.Fragment>
      <form onSubmit={updateChessboardSize}>
        <input type="text" name="rowCount" defaultValue={rowCount} />
        <input type="text" name="colCount" defaultValue={colCount} />
        <button type="submit">Set Size</button>
      </form>
      <div
        className="chessboard"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${colCount}, 1fr)`
        }}>
        {maskList.map((mask, idx) => {
          const row = Math.floor(idx / colCount);
          const col = idx % colCount;
          return (
            <div
              className={"chessboard-cell" + (mask === 0 ? " disabled" : "")}
              key={idx}
              style={{ "--aspect-ratio": "1/1" }}
              onClick={() => {
                const newMaskList = [...maskList];
                newMaskList[idx] = maskList[idx] ^ 1;
                setMaskList(newMaskList);
              }}>
              <i className="fas fa-times"></i>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default App;
