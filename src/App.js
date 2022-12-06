
import React , {useState,useEffect} from 'react'
import Background from './Components/Background';
import Display from './Components/Display';



function App() {

  const [Money,setMoney] = useState(0)
  const[rates,setRates]=useState([]);

  const[toCurrecy,setToCurrecy] = useState()
  const[fromCurrecy,setFromCurrecy]=useState()
  const[exchangeRate, setExchangeRate] = useState()
  const[amount,setAmount]= useState(1)
  const[amountInFromCurrecny,setAmountInFromCurrecny] = useState(true)
  const[withdraw,setWithdraw] = useState(1)
  var toAmount,fromAmount
  if(amountInFromCurrecny){
    
   fromAmount = amount
    toAmount = amount * exchangeRate
   
  
  }else{
    toAmount = amount
    fromAmount = amount /exchangeRate
   
  }


  const handleFromAmountChange =(event)=>{
    setAmount(event.target.value)
    setAmountInFromCurrecny(true)
   
  }
  const handleToAmountChange= (event)=>{
    
    setAmount(event.target.value)
    setAmountInFromCurrecny(false)
   
   
  }
  const addMoney =() =>{
  
    if(amountInFromCurrecny){
      setMoney(Money=> Money + toAmount)
    
    }else{
      setMoney(Money=> Money + fromAmount)
 
    }

   
   
   
    
   }

  const requestURL = 'https://api.exchangerate.host/latest';

  useEffect(()=>{
     fetch(requestURL)
    .then(data => data.json())
    .then(res=> {
      const firstcurrecy = Object.keys(res.rates)[0]
      setExchangeRate(res.rates[firstcurrecy])
      setToCurrecy(firstcurrecy)
      setFromCurrecy(res.base)
      setRates([res.base, ...Object.keys(res.rates)])})
   },[])
  
  useEffect(()=>{
    if(fromCurrecy !=null && toCurrecy !=null){
      fetch(`${requestURL}?base=${fromCurrecy}&symbols=${toCurrecy}`)
      .then(res=>res.json())
      .then(data=> setExchangeRate(data.rates[toCurrecy]))
    }
    console.log(exchangeRate)
  
  },[fromCurrecy,toAmount])
  useEffect(()=>{
    
  const MyMoney = JSON.parse(localStorage.getItem('money-data'));
    if(MyMoney){
      setMoney(Money => Money + MyMoney)
     
        
    }
   
  },[])

  useEffect(()=>{
 
    localStorage.setItem('money-data',JSON.stringify(Money));
    
  },[Money]);



    const makeSelect = ()=>{
      const push =[]
      for(const rate in rates){
        push.push( <option value={rates[rate]} key={rate} >{rates[rate]}</option>)
       
       }
       return push
    }
  
   
    
 

 return (
  
    <div className="App">
    
    
    <Display/>
     
     <Background  Money={Money} 
     setMoney={setMoney} 
     rates={makeSelect()}  
     fromCurrecy={fromCurrecy}  
     toCurrecy={toCurrecy} 
    setToCurrecy={setToCurrecy}  
    setFromCurrecy={setFromCurrecy}
    handleToAmountChange={handleToAmountChange}
    handleFromAmountChange={handleFromAmountChange}
    toAmount={toAmount}
    fromAmount={fromAmount}
    addMoney={addMoney}
    setWithdraw={setWithdraw}
    withdraw={withdraw}
    />
   
   
    </div>
  );
}

export default App;
