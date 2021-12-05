import React, { Suspense } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Nav from "./components/ui/Nav/Nav";

const Derivatives = React.lazy(
  () => import("./components/pages/Derivatives/Derivatives"),
);

interface Props {}

const AppView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => (
  <BrowserRouter>
    <Suspense fallback={null}>
      <Nav />
      <Route path="/" component={Derivatives} />
    </Suspense>
  </BrowserRouter>
);

AppView.displayName = "AppView";
AppView.defaultProps = {};

export default React.memo(AppView);
