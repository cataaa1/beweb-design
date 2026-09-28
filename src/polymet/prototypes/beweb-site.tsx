import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BewebLayout } from "@/polymet/layouts/beweb-layout";
import { BewebHome } from "@/polymet/pages/beweb-home";

export default function BewebSitePrototype() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <BewebLayout>
              <BewebHome />
            </BewebLayout>
          }
        />
      </Routes>
    </Router>
  );
}
