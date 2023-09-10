import "./App.css";
import { Home } from "./components/home/Home";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCatsAction } from "./actions/categoryAction";

import { getProductsAction } from "./actions/proudctAction";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCatsAction());
    dispatch(getProductsAction());
  }, [dispatch]);

  return (
    <div className="font-bold text-center">
      <Home />
    </div>
  );
}

export default App;
