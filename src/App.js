import React, { useEffect, useState } from 'react';
import NewItemSection from './components/NewItemSection.js';
import DisplayTable from './components/DisplayTable.js';
import ExportReport from './components/ExportReport.js';
import { useSelector } from 'react-redux';
import { db, get, ref } from './firebase/firebase.js';


const App = () => {
  const [items, setItems] = useState([]);
    const refreshflag = useSelector((state) => state.refresh.refresh);

  const fetchData = async () => {    
    const dbRef = ref(db, "items");
    const snapshot =(await get(dbRef));
    if(snapshot.exists()) {
      const dbDataMapArray = snapshot.val();
      //Append firebaseId to items
      const itemsArray = Object.keys(dbDataMapArray)
      .map(key => {
        return {
          ...dbDataMapArray[key],
          firebaseId: key,
        }
      });
      
    setItems(itemsArray);
    }
  }

  useEffect(() => { 
    fetchData();
    }, [refreshflag]);
  
  return (
    <div>
      <h1>Work Items</h1>
      <NewItemSection />
      <br/>
      <ExportReport items={items}/>
      <br />
      <DisplayTable items={items}/>
    </div>
  );
};

export default App;