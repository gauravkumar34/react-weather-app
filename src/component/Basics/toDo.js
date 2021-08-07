import React, { useState, useEffect } from "react";
import "./styles.css";
const ToDo = () => {
    //get local storage data
    const getLocalData = () => {
        const lists = localStorage.getItem("mytolist");
        if(lists){
            return JSON.parse(lists)
        } else {
            return [];
        }
    }

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("")
  const [toggleButton, settoggleButton] = useState(false)
  //   add item 
  const addItem = () => {
      if(!inputData){
          alert('plz fill')
      } else if(inputData && toggleButton===true) {
        setItems(
            items.map((curElem)=> {
                if(curElem.id === isEditItem){
                    return {...curElem, name: inputData}
                }
                return curElem;
            })
        )
        setInputData([])
        setIsEditItem(null);
        settoggleButton(false)
      } 
      else {
          const myNewInputData = {
              id: new Date().getTime().toString(),
              name: inputData
          }
          setItems([...items, myNewInputData])
          setInputData("");
      }
  };

//   delete item 
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem)=> {
        return curElem.id !== index;
    })
    setItems(updatedItems)
  }

  //   delete all item 
  const removeAll = () => {
      setItems([]);
  }

  //edit item
  const editItem = (index) => {
    const item_tdo_edited = items.find((curElem) => {
        return curElem.id === index;
    });
    setInputData(item_tdo_edited.name)
    setIsEditItem(index);
    settoggleButton(true)
  }
  //local storage
  useEffect(() => {
     localStorage.setItem("mytolist",JSON.stringify(items))
  }, [items])

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <figCaption>Add Your List Here</figCaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="😊 Add Items"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            
            {toggleButton ? (<i className="fa fa-edit add-btn" onClick={addItem}></i>): (<i className="fa fa-plus add-btn" onClick={addItem}></i>) }
          </div>
          <div className="showItems">
          {
              items.map((curElem, index) => {
                  return (
                    <div className="eachItem" key={index}>
              <h3>{curElem.name}</h3>
              <div className="todo-btn">
                <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id) }></i>
              </div>
            </div>
                  )

              })
          }
           
          </div>
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
              <span >Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
