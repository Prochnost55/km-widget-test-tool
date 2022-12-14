import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import CodeEditor from "./CodeEditor/CodeEditor";

const DEFAULT_KM_SETTINGS = {
  popupWidget: true,
  automaticChatOpenOnNavigation: true,
};
const ENV = {
  dev: {
    appId: "23a6d30a59d247fa64605501f58074ea3",
    "widget-url": "http://localhost:3030/v2/kommunicate.app",
  },
  test: {
    appId: "23a6d30a59d247fa64605501f58074ea3",
    "widget-url": "https://widget-test.kommunicate.io/v2/kommunicate.app",
  },
  prod: {
    appId: "kommunicate-support",
    "widget-url": "https://widget.kommunicate.io/v2/kommunicate.app",
  },
  release: {
    appId: "23a6d30a59d247fa64605501f58074ea3",
    "widget-url": "https://widget-release.kommunicate.io/v2/kommunicate.app",
  },
};
function WidgetTest() {
  const [selectedEnv, setSelectedEnv] = React.useState("dev");
  const [applicationId, setApplicationId] = React.useState(
    ENV[selectedEnv].appId
  );
  const [kmSettings, setKmSettings] = React.useState(
    JSON.stringify(DEFAULT_KM_SETTINGS, null, 4)
  );

  const clearStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  const logoutAndReload = () => {
    window.kommunicate && window.kommunicate.logout();
    window.location.reload();
  };

  const launchWidget = () => {
    initScript(window, window.kommunicate || []);
  };

  function initScript(d, m) {
    let clickFunctionOne = function () {
      console.log("clickFunctionOne");
    };
    let clickFunctionTwo = function () {
      console.log("clickFunctionTwo");
    };
    var kommunicateSettings = {
      appId: applicationId || ENV[selectedEnv].appId,
      ...JSON.parse(kmSettings),
    };
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = ENV[selectedEnv]["widget-url"];
    var h = document.getElementsByTagName("head")[0];
    h.appendChild(s);
    window.kommunicate = m;
    m._globals = kommunicateSettings;
  }

  return (
    <>
      <Stack gap={3}>
        <Row>
          <Col>
            <Stack direction="horizontal" gap={3}>
              <Row>
                <Col>
                  <h3>Select Environment</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  {Object.keys(ENV).map((key) => (
                    <Form.Check
                      key={key}
                      type={"radio"}
                      id={key}
                      label={key}
                      name="group1"
                      inline
                      onChange={() => {
                        setSelectedEnv(key);
                      }}
                      defaultChecked={selectedEnv === key}
                    />
                  ))}
                </Col>
              </Row>
            </Stack>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <InputGroup className="mb-3" style={{width: 400}}>
              <InputGroup.Text id="basic-addon1">App ID</InputGroup.Text>
              <Form.Control
                placeholder={ENV[selectedEnv].appId}
                aria-label="appid"
                aria-describedby="basic-addon1"
                value={applicationId}
                onChange={(e) => {
                  setApplicationId(e.target.value);
                }}
              />
            </InputGroup>
          </Col>
        </Row>
        <CodeEditor
          code={kmSettings}
          setCode={(code) => {
            setKmSettings(code);
          }}
        />
        <Row>
          <Col>
            <Stack direction="horizontal" gap={3}>
              <Button variant="outline-primary" onClick={clearStorage}>
                Clear Storage
              </Button>
              <Button variant="outline-primary" onClick={launchWidget}>
                Launch Widget
              </Button>
              <Button variant="outline-primary" onClick={logoutAndReload}>
                Logout &amp; Reload
              </Button>
            </Stack>
          </Col>
        </Row>
      </Stack>
    </>
  );
}

export default WidgetTest;
