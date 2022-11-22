const express = require("express");
const { success, error } = require("consola");
const cors = require("cors");

const app = express();
const categoryRouter = require('./Routers/categoryRouter')
const placeRouter = require('./Routers/placeRouter')
const factureRouter = require('./Routers/factureRouter')
const lodgeRouter = require('./Routers/lodgeRouter')
const equipmentRouter = require('./Routers/equipmentsRouter')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("dotenv").config();
const DB = require("./Config/db");

const PORT = process.env.APP_PORT || 4000;
const DOMAIN = process.env.APP_DOMAIN;

const authRoute = require("./Routers/authenticationRoute");
const userRoute = require('./Routers/userRoute')
const reservationRoute = require('./Routers/reservationRoute')
const commentRoute = require('./Routers/commentaireRoute')
const adressRouter = require('./Routers/adressRouter')

app.use("/", authRoute);
app.use('/User', userRoute)
app.use('/Reservation', reservationRoute)
app.use('/Commentaire', commentRoute)

app.use('/category', categoryRouter)
app.use('/place', placeRouter)
app.use('/facture', factureRouter)
app.use('/lodge', lodgeRouter)
app.use('/eq', equipmentRouter)
app.use('/adress', adressRouter)

//display picture
app.get('/getfile/:image',function(req,res){
  res.sendFile(__dirname+'/Storages/'+req.params.image)
  //req.params.image:input picture name+extension(png,jpeg...) from Storages
})

app.listen(PORT, async () => {
  try {
    success({
      message: `server started on port ${PORT} ` + `URL ${DOMAIN}`,
      badge: true,
    });
  } catch (err) {
    error({ message: "error with server " + err.message, badge: true });
  }
});
