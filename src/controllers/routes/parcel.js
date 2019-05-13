import router from '../controllers/routes';
import client from '../controllers/dbConnector';

const parcels = router;

parcels.route("/")
    .get((req, res) => {
        // Select for all delivery order as an admin
        // As a single user selects all the delivery order of that user 
        // Use the token generated to detect if admin or user
        // if (tokenization id == admin) {SELECT * FROM parcels} else {SELECT * FROM parcels where userid = this current user}
        // client.query('SELECT * FROM users')
        //     .then(data => {
        //         console.table(data);
        //     })
        //     .catch(err => console.log(err));
        res.send("Fetch all parcel delivery orders.");
    })
    .post((req, res) => {
        res.send("Create a parcel delivery order.");
    });

parcels.get('/:parcelId', (req,res) => {
    res.send('Fetch a specific delivery order.')
});

parcels.patch('/:parcelId/cancel', (req,res) => {
    res.send('Cancel a specific parcel delivery order.')
});

parcels.patch('/:parcelId/destination', (req,res) => {
    res.send('Change the destination of a specific parcel delivery order.');
});

parcels.patch('/:parcelId/status', (req,res) => {
    res.send('Change the status of a specific parcel delivery order.');
});

parcels.patch('/:parcelId/currentlocation', (req,res) => {
    res.send('Change the present location of a specific parcel delivery order.');
});

export default parcels;