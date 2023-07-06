import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import CarPage from "./CarPage"
import CarDetail from "./CarDetail"


function App() {
  return (
    <>
          <main>
            <Header />
            <Routes>
              <Route path="/:id" element={<CarDetail /> }/>
              <Route path = '/' element={ <CarPage /> } />
            </Routes>
          </main>
        </>
  );
}

export default App;
