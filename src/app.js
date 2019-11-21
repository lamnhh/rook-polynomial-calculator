import React, { useEffect, useState, useCallback } from "react";
import MathJax from "react-mathjax2";

import compute from "./calculator";
import SizeSelector from "./size-selector";
import { tsEnumDeclaration } from "@babel/types";

const SIZE_LIMIT = 7;

const App = () => {
  const [rowCount, setRowCount] = useState(4);
  const [colCount, setColCount] = useState(5);
  const [maskList, setMaskList] = useState(Array.from(Array(rowCount * colCount), () => 1));
  const [polynomial, setPolynomial] = useState([]);

  useEffect(() => {
    if (rowCount > SIZE_LIMIT) {
      setRowCount(SIZE_LIMIT);
    }
    if (rowCount < 1) {
      setRowCount(1);
    }
  }, [rowCount]);

  useEffect(() => {
    if (colCount > SIZE_LIMIT) {
      setColCount(SIZE_LIMIT);
    }
    if (colCount < 1) {
      setColCount(1);
    }
  }, [colCount]);

  useEffect(() => {
    setMaskList(Array.from(Array(rowCount * colCount), () => 1));
  }, [rowCount, colCount]);

  useEffect(() => {
    const mask = [];
    for (let i = 0; i < rowCount; ++i) {
      mask.push(maskList.slice(i * colCount, (i + 1) * colCount));
    }
    setPolynomial(compute(mask));
  }, [maskList, rowCount, colCount]);

  const flip = useCallback(() => {
    setMaskList((maskList) => maskList.map((x) => 1 - x));
  }, []);

  return (
    <React.Fragment>
      <h1 className="page-title">Rook Polynomial Calculator</h1>
      <div className="chessboard-container">
        <div className="chessboard-size-form">
          <SizeSelector
            upperLimit={SIZE_LIMIT}
            value={rowCount}
            onSelect={setRowCount}></SizeSelector>
          <img src="/times.svg" alt="" />
          <SizeSelector
            upperLimit={SIZE_LIMIT}
            value={colCount}
            onSelect={setColCount}></SizeSelector>
        </div>
        <div
          className="chessboard"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${colCount}, 1fr)`
          }}>
          {maskList.map((mask, idx) => {
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
                <img src="/times.svg" alt="Disabled cell" />
              </div>
            );
          })}
        </div>
        <button onClick={flip}>Flip</button>
        <MathJax.Context input="ascii">
          <div className="polynomial">
            <MathJax.Node>
              {"R(x) = " +
                polynomial
                  .map((a, idx) => {
                    if (idx === 0) {
                      return a;
                    }
                    if (idx === 1) {
                      return (a !== 1 ? a : "") + "x";
                    }
                    return (a !== 1 ? a : "") + "x^" + idx;
                  })
                  .join(" + ")}
            </MathJax.Node>
          </div>
        </MathJax.Context>
      </div>
    </React.Fragment>
  );
};

export default App;
