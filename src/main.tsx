import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";

import ErrorPage from "./ErrorPage";
import Index from "./routes/Index";
import Contact from "./routes/ContactCard";
import EditContact from "./routes/EditContact";
import { rootLoader, contactLoader } from "./routes/loaders";
import {
  createContactAction,
  deleteContactAction,
  editContactAction,
  updateContactAction,
} from "./routes/actions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: createContactAction,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: updateContactAction,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editContactAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: deleteContactAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
