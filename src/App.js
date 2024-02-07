import Index from "./KRYPT_lab6/route";
import Task1 from "./KRYPT_lab6/task1";
import Task2 from "./KRYPT_lab6/task2";
import Task3 from "./KRYPT_lab6/task3";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Index />} />
        <Route exact path="/task1" element={<Task1 />} />
        <Route path="/task2" element={<Task2 />} />
        <Route path="/task3" element={<Task3 />} />
      </Routes>
    </Router>
  );
};
export default App;
