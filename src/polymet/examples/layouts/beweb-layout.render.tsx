import { BrowserRouter } from "react-router-dom";
import { BewebLayout } from "@/polymet/layouts/beweb-layout";

export default function BewebLayoutRender() {
  return (
    <BrowserRouter>
      <BewebLayout>
        <div className="mx-auto max-w-[1440px] px-10 pb-40 pt-40">
          <div className="h-64 border border-bruma/15 bg-marino-2" />
        </div>
      </BewebLayout>
    </BrowserRouter>
  );
}
