import React from 'react';
import ReactDOM from 'react-dom';
import * as Perseus from './perseus';
//import "./lib/mathquill/mathquill.css";
import 'katex/dist/katex.css';
import "./lib/khan-exercises.css";
import "./lib/perseus.css";

const itemData = {
  question: {
    content: "This is a *sample question* ^_^\n\n[[☃ grapher 1]]",
    images: {},
    widgets: {
      "grapher 1": {
        type: "grapher",
        alignment: "default",
        static: false,
        graded: true,
        options: {
          correct: {
            type: "linear",
            coords: null,
          },
          availableTypes: ["linear"],
          graph: {
            labels: ["x", "y"],
            range: [
              [-10, 10],
              [-10, 10],
            ],
            step: [1, 1],
            backgroundImage: {
              url: null,
            },
            markings: "graph",
            rulerLabel: "",
            rulerTicks: 10,
            valid: true,
            showTooltips: false,
          },
        },
        version: {
          major: 0,
          minor: 0,
        },
      },
    },
  },
  answerArea: {
    calculator: false,
    chi2Table: false,
    periodicTable: false,
    tTable: false,
    zTable: false,
  },
  itemDataVersion: {
    major: 0,
    minor: 1,
  },
  hints: [],
};

const styles = {
  container: {
    width: 600,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
};

ReactDOM.render(
  <React.StrictMode>
    <div style={styles.container}>
      <Perseus.QuestionRenderer question={itemData} />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
