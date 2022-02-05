// Demo page index for create-react-app

import React from 'react';
import ReactDOM from 'react-dom';
import * as Perseus from './perseus';
//import "./lib/mathquill/mathquill.css";

const itemData = {
    "question": {
        "content": "$3 + 5 = $ [[☃ numeric-input 1]]",
        "images": {},
        "widgets": {
            "numeric-input 1": {
                "type": "numeric-input",
                "alignment": "default",
                "static": false,
                "graded": true,
                "options": {
                    "static": false,
                    "answers": [
                        {
                            "value": 8,
                            "status": "correct",
                            "message": "",
                            "simplify": "required",
                            "strict": false,
                            "maxError": null
                        }
                    ],
                    "size": "small",
                    "coefficient": false,
                    "labelText": "result",
                    "multipleNumberInput": false
                },
                "version": {
                    "major": 0,
                    "minor": 0
                }
            }
        }
    },
    "answerArea": {
        "calculator": false,
        "chi2Table": false,
        "periodicTable": false,
        "tTable": false,
        "zTable": false
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1
    },
    "hints": [
        {
            "replace": false,
            "content": "$3 + 5 = 8$",
            "images": {},
            "widgets": {}
        }
    ]
}

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
      <Perseus.QuestionRenderer
        item={itemData}
        onAnswer={(guess, score) => console.log("answer attempt:", guess, "with score:", score)}
        onHint={(num, total) => console.log(`hint ${num} taken of ${total} total`)}
      />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
