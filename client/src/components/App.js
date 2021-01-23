import './App.css';
import Home from './Home'
import axios from 'axios';
function App() {
  
  // const testrequest = function(){
  //   axios
  //     .get(`/api`)
  //     .then((response) => {
  //       console.log('response: ', response);
  //     });
  // };



  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
