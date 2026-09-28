import { BrowserRouter } from "react-router-dom";
import { BewebHome } from "@/polymet/pages/beweb-home";
import { BewebLayout } from "@/polymet/layouts/beweb-layout";

export default function BewebHomeRender() {
  return (
    <BrowserRouter>
      <BewebLayout>
        <BewebHome />
      </BewebLayout>
    </BrowserRouter>
  );
}
