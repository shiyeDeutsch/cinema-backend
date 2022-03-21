let express=require('express');
let app=express();
require('./configs/database');
let moviesRouter=require('./routes/moviesRouter')
let membersRouter=require('./routes/membersRouter')
let subscriptionsRouter=require('./routes/subscriptionsRouter')
let usersRouter=require('./routes/usersRouter')
let cors=require('cors')

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors())
app.use('/api/movies',moviesRouter)
app.use('/api/members',membersRouter)
app.use('/api/subscriptions',subscriptionsRouter)
app.use('/api/users',usersRouter)

app.listen(8000)