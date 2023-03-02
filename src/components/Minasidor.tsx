import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import "../styles/minasidor.css"
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { IBooking } from '../interfaces';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import { async } from '@firebase/util';


function Minasidor(){

    const [bookings,setBookings] = useState<IBooking[]>([]);

    const bookingsCollectionRef = collection(db,"bookings")

    useEffect(() => {

        const getBookings = async() =>{
            const data = await getDocs(bookingsCollectionRef)
            setBookings(data.docs.map((doc)=>({...(doc.data()as IBooking), id:doc.id})))

        }
        getBookings()
    })



    const [formData,setFormData] = useState({
        date : "",
        time : "",
        cleaner: ""
    })

    const handleChange = (event:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
        setFormData({...formData,[event.target.name]:event?.target.value})
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        console.log(formData)

    }

return(
    <div className='container'>
    <div className="mina-sidor">
        <div className='done'>
    <h2>Utförda Bokningar</h2>
    <Grid container spacing={1}>

    <Grid item xs={12} md={8} >

    <List>
        {bookings.map((booking)=>(
  <ListItem key={booking.id}>
    <ListItemText key={booking.id} primary = {booking.date+booking.time+booking.cleaner}
    />
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
  <ListItem >
    <ListItemText 
    />
      <IconButton >
        <DeleteIcon />
      </IconButton>      
  </ListItem>
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
            <label htmlFor="Hemstädning">Hemstädning</label>
            <input type="radio" name="startdate" id="Hemstädning" />
            <label htmlFor="Kontorstädning">Kontorstädning</label>
            <input type="radio" name="startdate" id="Kontorstädning" />
            <label htmlFor="Flytttädning">Flytttädning</label>
            <input type="radio" name="startdate" id="Flytttädning" />
            <label htmlFor="Fönsterputsning">Fönsterputsning</label>
            <input type="radio" name="startdate" id="Fönsterputsning" />
            <label htmlFor="Trappstädning">Trappstädning</label>
            <input type="radio" name="startdate" id="Trappstädning" />

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

            <option value="James">James Bond</option>
            <option value="Spider">Spiderman</option>
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