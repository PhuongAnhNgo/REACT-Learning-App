import Home from "./components/Home";
import Subject from "./components/Subject";
import LearnMode from "./components/LearnMode";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/Subject",
      element: <Subject/>,
    },
    {
      path: "/LearnMode",
      element: <LearnMode/>,
    }
  ]);
  return (
    <div className="App">
    <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
