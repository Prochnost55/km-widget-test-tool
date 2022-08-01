import { Routes, Route, Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Home from './components/Home'
import WidgetTest from './components/WidgetTest'
import MainNavbar from './components/MainNavbar';
function App() {
    return (
        <>
            <MainNavbar />
            <Container className="p-2">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="widget-test" element={<WidgetTest />} />
                </Routes>

            </Container>
        </>
    );
}

export default App;
