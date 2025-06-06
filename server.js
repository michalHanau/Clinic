const mongooseConnect = require('./db/mongoConnect');

const appointmentsRoute = require('./routes/appointmentsRoutes');
const customersRoute = require('./routes/customersRoutes');
const treatmentsRoute = require('./routes/treatmentsRoutes');
const loginRoute = require('./routes/loginRoutes');
const authRoutes = require('./routes/authRoutes'); 


const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());
  
app.use('/appointments', appointmentsRoute);
app.use('/customers', customersRoute);
app.use('/treatments', treatmentsRoute);
app.use('/login', loginRoute);
app.use('/auth', authRoutes);


const path = require('path');
// שמש את קבצי ה-Build של React
app.use(express.static(path.join(__dirname, 'build')));

// כל בקשה שלא מתאימה ל-API תחזיר את index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;



(async function() {
    try {
        await mongooseConnect();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})();

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('An error in app, please try later.')
})

app.listen(port, '0.0.0.0', () => {
    console.log(`app is listening at http://localhost:${port}`)
})
