import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import 'prismjs/themes/prism.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CodeEditor(props) {
  const { code, setCode } = props;
//   const [code, setCode] = React.useState(
//       `function add(a, b) {\n  return a + b;\n}`
//     );
  return (
    <>
      <Row>
        <Col md={6}>
            <p>Kommunicate Settings</p>
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              height: "350px",
              width: "500px",
              border: '1px solid grey'
            }}
          />
        </Col>
      </Row>
    </>
  );
}

export default CodeEditor;
