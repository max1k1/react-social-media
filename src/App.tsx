import React, { Component, Suspense, lazy } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.tsx';
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import News from './components/News/News.tsx';
import Music from './components/Music/Music.tsx';
import Settings from './components/Settings/Settings.tsx';
import HeaderContainer from './components/Header/HeaderContainer.tsx';
import Login from './components/Login/Login.tsx';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader.tsx';
import { initializeApp } from './redux/app-reducer.ts';
import store, { AppStateType } from './redux/store.ts';
import { Provider } from 'react-redux';
import { withRouter } from './hoc/withRouter.tsx';
import UsersContainer from './components/Users/UsersContainer.tsx';
import { compose } from 'redux';
import ProfileContainerWithHooks from './components/ProfileContent/ProfileContainerWithHooks.tsx';

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer.tsx'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: ()=>void
}
class App extends Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <div className="app-wrapper-content">
          <Navbar />
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="/profile" element={<ProfileContainerWithHooks />}>
                <Route path=":userId" element={<ProfileContainerWithHooks />} />
              </Route>
              <Route path="/" element={<Navigate to={'/profile'} />} />
              <Route path="/dialogs/*" element={<DialogsContainer />} />
              <Route path="/users/*" element={<UsersContainer />} />
              <Route path="/news/*" element={<News />} />
              <Route path="/music/*" element={<Music />} />
              <Route path="/settings/*" element={<Settings />} />
              <Route path="/login/*" element={<Login />} />
              <Route path="*" element={<div>404 NOT FOUND</div>} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }),
)(App);

export const SocialNetworkApp: React.FC = () => {
  // using HashRouter instead BrowserRouter - trouble with gh-pages
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  );
};
