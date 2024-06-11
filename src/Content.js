
import { FaTrashAlt } from "react-icons/fa";

const Content = ({items,handleCheck,handleDelete}) => {
  return (
    <main>
      {items.length ?(
        <ul>
          {items.map((item)=>(
            <li className="item" key={item.id}>
              <input type="checkbox" onChange={()=>handleCheck(item.id)} checked={item.checked} />
              <label onDoubleClick={()=>handleCheck(item.id)} style={(item.checked) ? ({textDecoration:"line-through"}) : null} >{item.item}</label>
              <FaTrashAlt 
              role="button"
              onClick={()=>handleDelete(item.id)}
              tabIndex="0"/>
            </li>
          ))}
        </ul>
      ) : ( <p style={ {marginTop: "6rem"}}> Your List Is Empty</p>)}  
    </main>
  )
}

export default Content