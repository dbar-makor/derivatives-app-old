import React from 'react';

import AppView from './App.view';

interface Props { }

const App: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const isLoggedIn = sessionStorage.getItem('token');

  return (
      <AppView
        isLoggedIn={isLoggedIn}
      ></AppView>
  );
};

App.displayName = 'App';
App.defaultProps = {};

export default React.memo(App);