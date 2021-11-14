const express = require('express');
const memAndMovBL = require('./BL/membersAndMoviesBL')

const subscriptionsRouter = require('./routers/subscriptionsRouter')
const membersRouter = require('./routers/membersRouter')
const moviesRouter = require('./routers/moviesRouter')


let app = express();

require('./configs/database');


//const dbURI = "mongodb+srv://liorsas:*****@cluster0.80kdp.mongodb.net/test?authSource=admin&replicaSet=atlas-mncsto-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

memAndMovBL.saveMemberTODB()
memAndMovBL.saveMoviesTODB()

app.use(express.json());

app.use('/api/sub', subscriptionsRouter);
app.use('/api/members', membersRouter);
app.use('/api/movies', moviesRouter);

app.listen(3001,()=>{console.log(`Node listens at port ${process.env.PORT}`)
console.log(process.env.DEV_MODE)
})