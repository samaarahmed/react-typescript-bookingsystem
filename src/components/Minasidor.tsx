import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import "../styles/minasidor.css"
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import {  IBooking } from '../interfaces';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase.config';


function Minasidor(){

    const [doneBookings,setDoneBookings] = useState<IBooking[]>([]);
    const [pendingBookings,setPendingBookings] = useState<IBooking[]>([]);


    const bookingsCollectionRef = collection(db,"bookings")

    const bookingSort = (a:IBooking,b:IBooking)=>{

      const date1 = new Date(a.date)
      const date2 = new Date(b.date)
      if(date1>date2) return 1
      else if(date1<date2) return -1
      else return 0
    }
  

    const getDoneBookings = async() =>{
      const condition = query(bookingsCollectionRef, where("status", "==",true))
      const data = await getDocs(condition);
      setDoneBookings(data.docs.map((doc)=>({...(doc.data()as IBooking), id:doc.id,})));


  };

  const getPendingBookings = async() =>{
    const condition = query(bookingsCollectionRef, where("status", "==",false))
    const data = await getDocs(condition);
    setPendingBookings(data.docs.map((doc)=>({...(doc.data()as IBooking), id:doc.id,})));

};


   
   
    useEffect(() => {
     getDoneBookings();
     getPendingBookings();
    },[]);



    const [formData,setFormData] = useState({
        date : "",
        time : "",
        cleaner: "",
        type :"",
        kund:"Messi"
    })

    const handleChange = (event:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
        setFormData({...formData,[event.target.name]:event?.target.value})
    }

    const createBooking = async()=>{

      await addDoc(bookingsCollectionRef,{date:formData.date,time:formData.time,cleaner:formData.cleaner,type:formData.type,status:false,kund:formData.kund})
      getPendingBookings()
    }

    const updateBooking = async (booking:IBooking)=>{

      await updateDoc (doc(bookingsCollectionRef,booking.id ),{

      }
      )

    }

    const deleteBooking = async(booking:IBooking) => {
      
    await deleteDoc(doc(bookingsCollectionRef,booking.id))  
    getPendingBookings()


    }


    const handleSubmit =(event : React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        createBooking()
        console.log(formData)
 }



return(
    <div className='container'>
            <h1>Välkommen Lionel {formData.kund} !</h1>

    <div className="mina-sidor">
        <div className='done'>
    <h2>Utförda Bokningar</h2>
    <Grid container spacing={1}>

    <Grid item xs={12} md={8} >

    <List>
        {doneBookings.map((booking)=>(
  <ListItem key={booking.id}>
    <ListItemText key={booking.id} primary = {"Date:" + booking.date+" "+",Time: "+booking.time+" "+"Type:"+ booking.type +" "+ ",Cleaner:" + booking.cleaner}    />
      <IconButton >
        <DeleteIcon />
      </IconButton>      
  </ListItem>
  ))}
</List>
    </Grid>
    </Grid>
    </div>
    <div className='pending'>
    <h2>Bokningar under behndling</h2>
    <Grid container spacing={1}>

    <Grid item xs={12} md={8} >

    <List>
    {pendingBookings.map((booking)=>(

  <ListItem key={booking.id}>
    <ListItemText key={booking.id} primary = {"Date:" + booking.date+" "+",Time: "+booking.time+" "+"Type:"+ booking.type +" "+ ",Cleaner:" + booking.cleaner}    />
      <IconButton  onClick={()=>deleteBooking(booking)}  >
        <DeleteIcon />
      </IconButton>      
  </ListItem>
    ))}

</List>
    </Grid>
    </Grid>
    </div>

    </div>
    
    <div className="booking">
    <h2>lägg till ny boking</h2>

    <div className="form-container">

      <form className='container' onSubmit={handleSubmit}>
        <div>
            <input type="radio" name="type" id="Hemstädning" value ="Hemstädning" onChange ={handleChange} /> Hemstädning
            <input type="radio" name="type" id="Kontorstädning" value= "Kontorstädning" onChange ={handleChange}/>Kontorstädning
            <input type="radio" name="type" id="Flytttädning" value="Flytttädning" onChange ={handleChange} />Flytttädning
            <input type="radio" name="type" id="Fönsterputsning" value="Fönsterputsning" onChange ={handleChange}/>Fönsterputsning
            <input type="radio" name="type" id="Trappstädning" value="Trappstädning" onChange ={handleChange}/>Trappstädning

          </div>

        <div>
          <p>datum</p>
          <label htmlFor="date"></label>
          <input type="date" name="date" id="date" value={formData.date} onChange={handleChange}/>
        </div>
        <div>
          <p>Tid</p>
          <label htmlFor="time"></label>
          <input type="time" name="time" id="time" value={formData.time} onChange = {handleChange} />
        </div>

        <div>
          <label htmlFor="cleaner">Städare</label>
          <select
            name="cleaner"
            id="cleaner"
            value={formData.cleaner}
            onChange = {handleChange}
          >
            <option disabled selected value="">Välj</option>

            <option value="James Bond">James Bond</option>
            <option value="Spiderman">Spiderman</option>
            <option value="Batman">Batman</option>
          </select>
        </div>
        <div>
            <Button variant="contained" type='submit'>Add</Button>
        </div>
      </form>

    </div>
</div>
    </div>

)


}

export default Minasidor