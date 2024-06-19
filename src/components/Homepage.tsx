import twitter from '../images/twitter.png'
import facebook from '../images/facebook.png'
import insta from '../images/insta.jpg'
import youtube from '../images/youtube.png'
function Homepage (){

    return(

        <div className="container">
    <body>
      <div className='welcome'>
      <h1>Välkommen till Städafint </h1>
      <p>Din lokala städfirma , vi erbjuder våra städtjänster i hela Kronoberg!</p>
      </div>
    </body>
  <footer>
    <div className="adress">
      <h4>Städafint AB</h4>
      <p>Storgatan 82 35245 Växjö</p>
    </div>
    <div className="telfon">
      <p>Epost:stadafint@stadafint.se</p>
      <p>Telfon: 0470-8880,0740-858585</p>
    </div>
    <img src={twitter} alt="twitter" />
    <img src={facebook} alt="facebook" />
    <img src={insta}alt="insta" />
    <img src={youtube}alt="youtube" />

  </footer>
</div>


    )
}

export default Homepage