import React, { Suspense } from "react";
import { Route, BrowserRouter } from "react-router-dom";

const Login = React.lazy(() => import("./components/pages/Login/Login"));
const Derivatives = React.lazy(
  () => import("./components/pages/Derivatives/Derivatives")
);

interface Props {}

const AppView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => (
  <BrowserRouter>
    <Suspense fallback={null}>
      <Route path="/login" component={Login} />
      <Route path="/derivatives" component={Derivatives} />
    </Suspense>
  </BrowserRouter>
);

AppView.displayName = "AppView";
AppView.defaultProps = {};

export default React.memo(AppView);
