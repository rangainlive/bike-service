import "./App.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// use Lazy Loading from React package to load the required component
const LoginComponent = lazy(() => import("./components/Pages/LoginComponent"));
const HeaderComponent = lazy(() =>
  import("./components/Navigation/HeaderComponent")
);
const FooterComponent = lazy(() =>
  import("./components/Navigation/FooterComponent")
);
const HomeComponent = lazy(() => import("./components/Home/HomeComponent"));
const RegisterComponent = lazy(() =>
  import("./components/Pages/RegisterComponent")
);

// renderLoading file
const renderLoader = () => <p>Loading...</p>;

function App() {
  return (
    <Suspense fallback={renderLoader()}>
      <Router>
        <header>
          <HeaderComponent />
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={HomeComponent} />
            <Route path="/signin" exact component={LoginComponent} />
            <Route path="/signup" exact component={RegisterComponent} />
          </Switch>
        </main>
        <footer>
          <FooterComponent />
        </footer>
      </Router>
    </Suspense>
  );
}

export default App;