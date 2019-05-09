import router from '../controllers/routes';

const parcels = router;

parcels.route("/")
    .get((req, res) => {
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