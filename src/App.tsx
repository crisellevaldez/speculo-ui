import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlaygroundPage from "./docs/pages/examples/Playground";
import { FirebaseTest } from "./components/FirebaseTest/FirebaseTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlaygroundPage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/firebase-test" element={<FirebaseTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
