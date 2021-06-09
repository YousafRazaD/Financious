const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Joi = require('joi');
const registrationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});
const options = {
    abortEarly: false, 
    allowUnknown: true, 
    stripUnknown: true 
};
const users = [
    
];
const history = [
    {
        month:1,
        totalIn:20000,
        totalOut:15000
    },
    {
        month:2,
        totalIn:30000,
        totalOut:17000
    }
]
const transactions = [
    {
        month:1,
        trans_no:1,
        amount:10000,
        desc:"Motorbike"
    },
    {
        month:1,
        trans_no:2,
        amount:5000,
        desc:"rent"
    },
    {
        month:2,
        trans_no:1,
        amount:7000,
        desc:"fee"
    },
    {
        month:2,
        trans_no:2,
        amount:4000,
        desc:"bill"
    },
    {
        month:2,
        trans_no:3,
        amount:6000,
        desc:"rent"
    }
]

router.get('/history',function(req,res){
    res.send(history);
});
router.get('/transactions/:no',function(req,res){
    const transToSend = [];
    for(let trans of transactions){
        if(trans.month==req.params.no){
            transToSend.push(trans);
        }
    }
    res.send(transToSend);
});
router.delete('/deletehistory/:month',function(req,res){
    const month = history.find(h=>h.month ===parseInt(req.params.month));
    const index = history.indexOf(month);
    history.splice(index,index+1);
    let trans = transactions.find(t=>t.month === month.month);
    while(trans){
        const transindex = transactions.indexOf(trans);
        transactions.splice(transindex,transindex+1);
        trans = transactions.find(t=>t.month === month.month);
    }
    const toSend = [history,transactions];
    res.send(history);
});

router.post('/register',function(req,res){
    const result = registrationSchema.validate(req.body,options);
    var duplicate = users.find(obj => {
        return obj.email === req.body.email
    });
    if(duplicate!=undefined){
        return res.status(409).send({
            message:"Duplicate email"
        })
    }
    if(result.error){
        return res.status(400).send({
            message:result.error
        })
    }
    users.push({name:req.body.name,email:req.body.email,password:req.body.password});
    res.send(req.body);
});

router.post('/login',function(req,res){
    found = false;
    index = 0;
    for(let user of users){
        if(user.email == req.body.email){
            found = true;
            break;
        }
        index++;
    }
    const user = users[index];
    if(!found){
        return res.status(404).send({
            message:"user not found"
        })
    }
    if(users[index].password != req.body.password){
        return res.status(400).send({
            message:"invalid credentials"
        })
    }
    const token = jwt.sign({email:user.email},'secret');
    res.cookie('jwt',token,{
        httpOnly:true,
        maxAge:24*60*60*1000,
    })
    res.send({
        message:"success"
    });
});

router.get('/user',function(req,res){
    try{
        const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie,'secret');
    if(!claims){
        return res.status(401).send({
            message:"unauthenticated"
        })
    }
    index = 0;
    for(let user of users){
        if(user.email==claims.email){
            userSend = {
                name:user.name,
                email:user.email
            }
            res.send(userSend);
            break;
        }
        index++;
    }
    }
    catch(e){
        return res.status(401).send({
            message:"unauthenticated"
        });
    }
});

router.post('/logout',function(req,res){
    res.cookie('jwt','',{maxAge:0})
    res.send({
        message:"success"
    });
});
module.exports = router;