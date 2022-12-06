import React ,{  useEffect, useState} from 'react'

const Background = ({Money,
  setMoney,
  rates,
  toCurrecy,
  fromCurrecy,
  setToCurrecy,
  setFromCurrecy,
  handleToAmountChange
  ,handleFromAmountChange,
  toAmount,
  fromAmount,
  addMoney,
  setWithdraw,
  withdraw}) =>{

   
  

 const[logs,setLogs] = useState([{
    reason:" Hello and welcome to demetre bank ",
    date:"and protected",
    money: "its free",
    
  }])

  useEffect(()=>{
    const SetLogs = JSON.parse(localStorage.getItem('Logs-into-data'));
    if(SetLogs){
      setLogs(SetLogs)
     }
    },[])
    
  useEffect(()=>{
    localStorage.setItem('Logs-into-data',JSON.stringify(logs))
  },[logs])





function withdrawMoney(){
  if(Money < withdraw || Money === 0 || isNaN(Money) || isNaN(withdraw)  ){
    return;
  }else if(Money > 0){
    setMoney((money)=> money - withdraw)
    
    addLogs()
  }
}




const logsMap = ()=>{

  const logss =[]
  logs.map(log =>logss.push(
    <div className='liList'>
      <ul key={log.reason}>
        
          <li  key={log.date}> {log?.reason +"    "+ log?.money +"  "+ log?.date}</li>
        
      </ul>
      </div>
   
  ))
  
  
  return logss
}

const addLogs =()=>{
  
  const reason = prompt("for what reason do you want to take money")
  var reg = /[A-Z a-z]/g;
  if(!reason.match(reg) || reason.length < 15){
    alert("მიუთითეთ მიზეზი და არა სიმბოლოები და ასევე მიზეზი მინიმუმ უნდა შედგებოდეს 15 ასოსგან")
    setMoney(Money)
  }else{
    const date = new Date();
    let arrayOfLogs =[]
    const newLogs ={
      reason: reason,
      money:withdraw +"$" ,
      date: date.toLocaleDateString(),
      
    }
    arrayOfLogs = [...logs,newLogs]
    setLogs(arrayOfLogs)
    
  }


}








 return(
  
      <div className="container">
        
        <div className="counter">{Money} $</div>
        <div className="Display">
        
       

        </div>
        
        <div className="Methods">
          <div className='OnMoneyAdd'>
            <div className='toCurrecy'>
              <span>To Rate</span> <select className='select-selected' value={toCurrecy}  onChange={(e)=>setToCurrecy(e.target.value)}>{rates}</select> 
              <input onChange={handleToAmountChange} value={toAmount} placeholder="To Amount"></input>
            </div>
            <div className='fromCurrecy'>
              <span>From Rate </span> <select className='select-selected' value={fromCurrecy} onChange={(e)=>{setFromCurrecy(e.target.value)}} >{rates}</select>   
              <input onChange={handleFromAmountChange} value={fromAmount} placeholder="from Amount"></input>
             
              <button onClick={addMoney}  id='AddBtn'>Add Money</button>
            </div>
           </div>
           <div className='bottomRow'>
              <div className='home'>
              <button><i className="fa-solid fa-house-user fa-xl"></i>Home</button>
              </div>
              <div className='Checkout'>
              <button><i class="fa-solid fa-money-check-dollar fa-xl"></i>Checkout</button>
              </div>
              <div className='Checkout'>
              <button><i class="fa-solid fa-money-bill-transfer fa-xl"></i>Transfer</button>
              </div>
              <div className='Checkout'>
              <button><i class="fa-solid fa-clover fa-xl"></i>Luck</button>
              </div>
              <div className='Checkout'>
              <button><i class="fa-solid fa-circle-dollar-to-slot fa-xl"></i>Spents</button>
              </div>
          </div>
          <div className='onWithdraw'>
           <input onChange={(e)=>setWithdraw(e.target.value)} placeholder="Enter Amount To Wothdraw" ></input>
            <button onClick={withdrawMoney} id='drawBtn'>Withdraw</button>
          </div>
          
        </div>
        <hr/>
        <div className='Logs'>
        {logsMap()}
        </div>
     
      </div>

  )

}

export default Background