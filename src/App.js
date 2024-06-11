import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from "react";
import Additem from "./Additem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {
  const API_URL='http://localhost:3500/items'
  const[items, setItem]=useState([]);
  const[search,setSearch] = useState('')
  const[fetchError,setFetchError]=useState(null)
  const[isLoading,setIsloading]=useState(true)
  useEffect(()=>{
    const fetchData = async() => {
            try{
               const response =  await fetch(API_URL)
               if(!response.ok) throw Error("Data not recevied")
               const listItems = await response.json()
               setItem(listItems);
            }catch(err){
              setFetchError(err.message) 
            }finally{
              setIsloading(false)
            }
    }
    setTimeout (()=>
      (async()=> await fetchData())()
    ,2000)

  },[])

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItem(listItems);
    
    const postOption ={
      method : 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body  : JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL,postOption)
    if (result) setFetchError(result)
  }
  
  const handleSubmit =(e)=>{
    e.preventDefault();
    if (!newItem) return;
    console.log(newItem);
    addItem(newItem);
    setnewItem('');
  }

  const handleCheck = async(id)=>{
    const itemlist= items.map((item)=>
      item.id === id ? {...item , checked:!item.checked} : item
    )
    setItem(itemlist);
    const myItem = itemlist.filter((item)=>item.id === id)
    const reqUrl= `${API_URL}/${id}` 
    const patchOption ={
      method : 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body  : JSON.stringify({checked : myItem[0].checked} )
    }
    const result = await apiRequest(reqUrl,patchOption)
    if (result) setFetchError(result)
    
  };
  const handleDelete =async (id)=>{
    const itemlist = items.filter((item)=> item.id!==id );
    setItem(itemlist);
    const reqUrl= `${API_URL}/${id}`
    const deleteOption ={method:'DELETE'}
    const result = await apiRequest(reqUrl,deleteOption)
    if (result) setFetchError(result)
    
  }
  const[newItem,setnewItem] = useState('')
  
  return (
   <div>
      <Header title="To Do List"/>
      <Additem 
       newItem ={newItem}
       setnewItem={setnewItem}
       handleSubmit={handleSubmit}
      />
      <SearchItem 
       search ={search}
       setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading ... </p>}
        {fetchError && <p>{`Error :${fetchError}`} </p>}
          {!isLoading && !fetchError &&<Content
            items ={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
            handleCheck={handleCheck}
            handleDelete={handleDelete} 
          />
        }
      </main>
      <Footer />
   </div>
    
  );
}

export default App;
