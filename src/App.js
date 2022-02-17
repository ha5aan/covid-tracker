import styles from './App.module.scss';
import{CountryPicker,Cards,Charts} from './Components';
import{fetchData} from'./API'
import { useState,useEffect } from 'react';
function App() {

const [Data, setData] = useState({});
const [CurrentCountry,setCurrentCountry]=useState('')
useEffect(async() => {
  setData(await fetchData(CurrentCountry))

}, [CurrentCountry]);

 const handleCountryChange = async(country)=>{
   console.log(country)
   setCurrentCountry(country)
 }

  
  return (
    <div className={styles.container}>
   <Cards data={Data}/>
   
   <CountryPicker handleCountryChange={handleCountryChange}/>
   <Charts  data={Data} country={CurrentCountry}/>
   </div>
  );
}

export default App;
