import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import "../styles/minasidor.css"
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import {  IBooking } from '../interfaces';
import { addDoc, collection,deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase.config';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';



function Minasidor(){

    const [doneBookings,setDoneBookings] = useState<IBooking[]>([]);
    const [pendingBookings,setPendingBookings] = useState<IBooking[]>([]);
    const [open,setOpen] = useState(false) // For update function 



    const bookingsCollectionRef = collection(db,"bookings")

  

    const getDoneBookings = async() =>{
      const condition = query(bookingsCollectionRef, where("status", "==",true) ,orderBy("date"))
      const data = await getDocs(condition);
      setDoneBookings(data.docs.map((doc)=>({...(doc.data()as IBooking), id:doc.id,})));


  };

  const getPendingBookings = async() =>{
    const condition = query(bookingsCollectionRef, where("status", "==",false), orderBy("date"))
    const data = await getDocs(condition);
    setPendingBookings(data.docs.map((doc)=>({...(doc.data()as IBooking), id:doc.id,})));

};


   
   
    useEffect(() => {
     getDoneBookings();
     getPendingBookings();
    },[getDoneBookings,getPendingBookings]);



    const [formData,setFormData] = useState({
        date : "",
        time : "",
        cleaner: "",
        type :"",
        kund:"Messi"
    })

    const [updateForm,setUpdateForm] = useState({
      date : "",
      time : "",
      cleaner: "",
      type :"",

    })


    const handleCheckbox = async (e:any) =>{
      const {value,checked} = e.target
      console.log(value)
      if(checked){
        
        await deleteDoc(doc(bookingsCollectionRef,value))  

      }
    }

    const deleteAll =async () => {

    console.log("button working")
        
        getDoneBookings()  

    }



    const handleChange = (event:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
        setFormData({...formData,[event.target.name]:event?.target.value})
        setUpdateForm({...updateForm,[event.target.name]:event.target.value})
    }

    const createBooking = async()=>{
     if( pendingBookings.find(item=>item.date === formData.date))
{
  console.log("Bokning finns redan med samma datum")
  alert("Bokning finns redan med samma datum")

}
else
      
      await addDoc(bookingsCollectionRef,{date:formData.date,time:formData.time,cleaner:formData.cleaner,type:formData.type,status:false,kund:formData.kund},)
      getPendingBookings()
    
    }
    const handleClickOpen = (bokning:IBooking) => {
      console.log(bokning.id)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

    const updateBooking = async (booking:IBooking)=>{
      console.log(booking.id)
      await updateDoc (doc(bookingsCollectionRef,booking.id ),{

        date:updateForm.date,
        time:updateForm.time,
        cleaner:updateForm.cleaner,
        type:updateForm.type

      })

      getPendingBookings()
      handleClose()
      
    }

    const deleteBooking = async(booking:IBooking) => {
      
    await deleteDoc(doc(bookingsCollectionRef,booking.id))  
    getPendingBookings()


    }


    const handleSubmit =(event : React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        if(formData.type==="" || formData.date === "" || formData.time === "" || formData.cleaner === ""){
          alert("All fields are mandatory!!")
        }
        else
        createBooking()
        alert("Booking added succesfully")
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
        <input type="checkbox" value={booking.id}  onChange = {(e) => handleCheckbox(e)}
        />
      </IconButton>      
  </ListItem>
  ))}
</List>
<IconButton  onClick={deleteAll}  >
        <DeleteIcon />
      </IconButton>      
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
    <ListItemText key={booking.id} primary = {"Date:" + booking.date+" "+",Time: "+booking.time+" "+"Type:"+ booking.type +" "+ ",Cleaner:" + booking.cleaner }    />
      <IconButton  onClick={()=>deleteBooking(booking)}  >
        <DeleteIcon />
      </IconButton>    
      <IconButton  onClick={()=>handleClickOpen(booking)}>
        <EditIcon/>
        </IconButton>  

        <Dialog  open ={open} onClose={handleClose}>
        <DialogTitle>Uppdatera Bokning</DialogTitle>
        <DialogContent >
        <form className='container' >
  <div>
      <input type="radio" name="type" id="Hemstädning" value ="Hemstädning" onChange ={handleChange} /> Hemstädning
      <input type="radio" name="type" id="Kontorstädning" value= "Kontorstädning" onChange ={handleChange}/>Kontorstädning
      <input type="radio" name="type" id="Flytttädning" value="Flyttstädning" onChange ={handleChange} />Flytttädning
      <input type="radio" name="type" id="Fönsterputsning" value="Fönsterputsning" onChange ={handleChange}/>Fönsterputsning
      <input type="radio" name="type" id="Trappstädning" value="Trappstädning" onChange ={handleChange}/>Trappstädning

    </div>

  <div>
    <p>datum</p>
    <label htmlFor="date"></label>
    <input type="date" name="date" id="date" value={updateForm.date} onChange={handleChange}/>
  </div>
  <div>
    <p>Tid</p>
    <label htmlFor="time"></label>
    <input type="time" name="time" id="time" value={updateForm.time} onChange = {handleChange} />
  </div>

  <div>
    <label htmlFor="cleaner">Städare</label>
    <select
      name="cleaner"
      id="cleaner"
      value={updateForm.cleaner}
      onChange = {handleChange}
    >
      <option  value=""> Välj </option>

      <option value="James Bond">James Bond</option>
      <option value="Spiderman">Spiderman</option>
      <option value="Batman">Batman</option>
    </select>
  </div>
</form>
        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>updateBooking(booking)}>Update</Button>
        </DialogActions>
      </Dialog>

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
            <input type="radio" name="type" id="Flytttädning" value="Flyttstädning" onChange ={handleChange} />Flytttädning
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
            <option  value=""> Välj </option>

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


