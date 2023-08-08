import { useRouteError, isRouteErrorResponse } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  let errorMessage = "";
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else {
    errorMessage = (error as Record<string, string>).message;
  }
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
