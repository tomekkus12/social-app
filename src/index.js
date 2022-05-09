import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Login from "./routes/login";
import SignIn from "./routes/signin";
import InvalidPage from "./routes/invalidPage";
import Home from "./routes/home";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
      <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="*" element={<InvalidPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);