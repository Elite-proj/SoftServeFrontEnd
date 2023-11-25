import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddCustomer from "./Components/AddCustomer";
import ListCustomers from "./Components/ListCustomers";
import Navigation from "./Components/Navigation";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<AddCustomer />} />
        <Route path="/Components/ListCustomers" element={<ListCustomers />} />
        <Route path="/Components/Navigation" element={<Navigation />} />
      </Routes>
    </div>
  );
}

export default App;
