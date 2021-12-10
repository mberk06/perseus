// @flow
import React, {Component} from 'react';
import 'katex/dist/katex.css';
import './lib/perseus.css';
import ServerItemRenderer from "./ServerItemRenderer";

type Props = {
  question: {
    data: QuestionDataType,
    attribution?: ?string,
  },
  setRef?: (node: any) => void,
  readOnly?: boolean,
};


export default class QuestionRenderer extends Component {
  props: Props;

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.question !== this.props.question ||
        nextProps.readOnly !== this.props.readOnly;
  }

  render() {
    const {
      question,
      setRef,
      readOnly,
      isMobile,
    } = this.props;
    const questionContents = <ServerItemRenderer
      controlPeripherals={false}
      item={question}
      apiOptions={{
        isMobile: isMobile,
        staticRender: !!readOnly,
        readOnly: !!readOnly,
        customKeypad: !readOnly,
      }}
      problemNum={0}
      hintsVisible={0}
      ref={n => (setRef ? setRef(n) : null)}
    />;
    return (
      <div
        className={'framework-perseus' + (isMobile ? ' perseus-mobile' : '')}
      >
        <div>
          {questionContents}
        </div>
      </div>
    );
  }
}
