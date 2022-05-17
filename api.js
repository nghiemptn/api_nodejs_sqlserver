var  Db = require('./controller');
var  express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');
const res = require('express/lib/response');
var  app = express();
var  router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('middleware');
    next();
  });
   
   
  router.route('/locations').get((request, response) => {
    Db.getLocations().then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/locations/:id').get((request, response) => {
    Db.getLocation(request.params.id).then((data) => {
      response.json(data[0]);
    })
  })
  
  router.route('/locations').post((request, response) => {
    let  location = { ...request.body }
    Db.addLocation(location).then(data  => {
      response.status(201).json(data);
    })
  })

var  port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log('Server is runnning at ' + port);
});
