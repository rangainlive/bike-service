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
// const HomeComponent = lazy(() => import("./components/Home/HomeComponent"));
const RegisterComponent = lazy(() =>
  import("./components/Pages/RegisterComponent")
);
const AdminComponent = lazy(() => import("./components/Home/AdminComponent"));
const UserComponent = lazy(() => import("./components/Home/UserComponent"));
const UpdateUserDetails = lazy(() =>
  import("./components/Update/UpdateUserDetails")
);
const UpdateUserVehicle = lazy(() =>
  import("./components/Update/UpdateUserVehicle")
);
const BookService = lazy(() =>
  import("./components/ServiceComponents/BookService")
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
            <Route path="/" exact component={LoginComponent} />
            <Route path="/signup" exact component={RegisterComponent} />
            <Route path="/admin" exact component={AdminComponent} />
            <Route path="/user" exact component={UserComponent} />
            <Route
              path="/update-user-details"
              exact
              component={UpdateUserDetails}
            />
            <Route
              path="/update-user-vehicle"
              exact
              component={UpdateUserVehicle}
            />
            <Route path="/book-service" exact component={BookService} />
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