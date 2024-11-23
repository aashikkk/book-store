import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
                v7_fetcherPersist: true,
                v7_normalizeFormMethod: true,
                v7_partialHydration: true,
                v7_skipActionErrorRevalidation: true,
            }}
            router={router}
        />
    </StrictMode>
);
