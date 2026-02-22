import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactHashRouter } from '@ionic/react-router';

import LoginPage from '../pages/Login';
import Tab1 from '../pages/Tab1';

import { useAuth } from '../constexts/AuthContext'; 

const AppRouter: React.FC = () => {
  const { user } = useAuth(); 

  return (
    <IonReactHashRouter>
      <IonRouterOutlet>
        <Route exact path="/login">
          {user ? <Redirect to="/tabs/tab1" /> : <LoginPage />}
        </Route>

        <Route path="/tabs">
          {user ? <Tab1 /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/">
          <Redirect to="/tabs/tab1" />
        </Route>
      </IonRouterOutlet>
    </IonReactHashRouter>
  );
};

export default AppRouter;
