import React, { Suspense } from "react";
import { Route, BrowserRouter } from "react-router-dom";

const Derivatives = React.lazy(
  () => import("./components/pages/Derivatives/Derivatives")
);

interface Props {
  readonly isLoggedIn: string | null;
}

const AppView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => (
  <BrowserRouter>
    <Suspense fallback={null}>
      <Route path="/" component={Derivatives} />
    </Suspense>
  </BrowserRouter>
);

AppView.displayName = "AppView";
AppView.defaultProps = {};

export default React.memo(AppView);
