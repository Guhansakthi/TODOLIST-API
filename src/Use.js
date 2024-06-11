import React from 'react'



const Use = () => {
    const[items, setItem]=useState([
    
        {
          id:1,
          checked: true,
          item:"Practice Coding"
        },
        {
          id:2,
          checked: true,
          item:"Playing Games"
        },
        {
          id:3,
          checked: true,
          item:"Watch Movies"
        }
      ]);
  return (
    <div>Use</div>
  )
}

export default Use