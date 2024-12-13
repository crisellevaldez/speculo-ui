import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DocsLayout } from "./docs/layout/Layout";
import { ButtonDocs } from "./docs/components/ButtonDocs";
import { GettingStarted } from "./docs/pages/GettingStarted";
import { Installation } from "./docs/pages/Installation";
import { Components } from "./docs/pages/Components";
import CoreConcepts from "./docs/pages/CoreConcepts";
import Customization from "./docs/pages/Customization";
import { Examples } from "./docs/pages/Examples";
import { FirebaseTest } from "./components/FirebaseTest/FirebaseTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/docs" replace />} />
        <Route path="/firebase-test" element={<FirebaseTest />} />
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<GettingStarted />} />
          <Route path="installation" element={<Installation />} />
          <Route path="core-concepts" element={<CoreConcepts />} />
          <Route path="components" element={<Components />} />
          <Route path="customization" element={<Customization />} />
          <Route path="examples" element={<Examples />} />
          <Route path="components/button" element={<ButtonDocs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
