const express = require('express')
const path = require('path')
const db = require('../mysql/db')
const bodyParser = require("body-parser")


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join('./dist/my-pizza-app-sql')))


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.get('/', function(req, res) {
  console.log("YES HEROKUMaster")
  res.sendFile(path.join(__dirname,'/dist/my-pizza-app-sql/index.html'));
 // res.sendFile( path.resolve('src/index.html') )
  //res.sendFile(`/src/index.html`)

});


app.get('/createNewTable', (req,res) => {
  let sql = 'CREATE TABLE FireMan (' +
    'Personid int NOT NULL AUTO_INCREMENT,' +
   ' LastName varchar(255) NOT NULL,' +
    'FirstName varchar(255),' +
    'Age int,'  +
    'PRIMARY KEY (Personid)' +
');';
  db.query(sql, (err,result) => {
    if(err){
      throw err
    }
    console.log(result)
    res.send('posted...!')

  })
})

app.get('/insertItems', (req,res) => {
  let post = {firs_name: 'dani' , last_name:'Berman'}
  let sql = 'INSERT INTO Users SET ?'
  db.query(sql,post, (err,result) => {
    if(err){
      throw err
    }
    console.log(result)
    res.send('posted 1,2,3!')

  })
})


app.get('/meals',  (req,res) =>{
  let sql = 'select * from menu'
  db.query(sql, (err,result) => {
    if(err){
      throw err
    }
    console.log(result)
    res.status(201).send(result)
  })


})

app.post('/users',  (req, res) => {
  let sql ='INSERT INTO Users SET ?'
  console.log(req.body)
  db.query(sql,{user_id: req.body.user_id,email: req.body.email,phone: req.body.phone,
                street: req.body.street, num_home: req.body.homeNumber}, (err,result) => {
    if(err){
      throw err
    }
    res.status(201).send(result)
  })

})

app.post('/orders',  (req,res) => {
  let sql = 'INSERT INTO Orders SET ?'
  db.query(sql,{user_id: req.body.user_id,
    num_order: req.body.num_order,
    branch_id: req.body.branch,
    o_time: req.body.time,
    o_date: req.body.date,
    o_type: req.body.o_type,
    pick_time: req.body.pick_time,
    o_status: req.body.status,
    price: req.body.price}, (err,result) => {
if(err){
throw err
}
res.status(201).send(result)
})
})

app.get('/num_order', (req,res) => {
  let sql ='select num_order from orders where num_order >=all (select num_order from orders)'
  db.query(sql, (err,result) => {
    if(err){
      throw err
    }
    console.log(result)
    res.status(201).send(result)
  })
})

app.get('/branch', (req,res) => {
  let sql = 'select * from branch'
  db.query(sql, (err,result) => {
    if(err){
      throw err
    }
    console.log(result)
    res.status(201).send(result)

  })
})

app.post('/ordersItem',(req,res) => {
  let topping_id,name_id
  let order_id
  findMenu_id(req.body.name_id,req).then( (result) =>{
    console.log('i want id' + '' + result.oi_id)
    //console.log('MY ORDER ID.... ' + result[0].oi_id)
    res.status(201).send(result)
  }
)





// db.query(sql,{oi_id: req.body.oi_id,
//   order_num: req.body.order_num,
//   m_id: id,
//   topping_id: req.body.topping_id},(err,result) => {
//     if(err){
//       throw err
//     }
//     console.log(result)
//     console.log('its my value1!!!!!' + id)
//     res.status(201).send(result)
//   })


})

app.post('/pizzaOrder',async (req,res) => {
  name_id = await findMenuNameToId(req.body.name_id)
  topping_id = await findMenuNameToId(req.body.topping_id,)
  insertPizzaOrderDb(req.body.oi_id,name_id,topping_id)
 // res.status(201).send({res: 'secsess insert to PIZZA ORDER table'})
})






const findM_id = (m_menu, callback) => {
let sql = `select m_name, menu_id from menu where m_name = '${m_menu}'`;
  let q =  db.query(sql, (err,result) => {
  if(err){
    throw err
  }
  console.log(result)


    console.log('Myyyyyyyyyyyy id' + result[0].menu_id)
    callback(result[0].menu_id);

  // return result.menu_id
})

}


const findMenu_id = async (m_menu,req) =>{
  let topping_id
  //let orderItemId = await getOrderItemIdDb()
  let orderItemId = Math.random().toString(36).substr(2, 6)
  //orderItemId += Math.floor(Math.random()*40)
  let name_id = await findMenuNameToId(m_menu)
  insertOrderItemDb(req, name_id,orderItemId)

  return {res: 'sucsess to insert to DB', oi_id: orderItemId}
}


// const findMenu_id = async (m_menu,req) =>{
//    let orderItemId = await getOrderItemIdDb()
//    let t = 0;
//    orderItemId++
//    console.log( 'my orderItem is!!!!!' + orderItemId)

//   let q = await findMenuNameToId(m_menu)
//   console.log('my QQQQQQQ!!!!!!' + q)
//   if(req.body.topping_id){
//   t = await findMenuNameToId(req.body.topping_id)
//   }else {
//     orderItemId += Math.floor(Math.random()*40)
//   }
//   insertOrderItemDb(req, q, t , orderItemId)

//   return {res: 'sucsess to insert to DB'}
// }

// const findMenu_id = (m_menu,req) =>{
//   return new Promise((resolve,reject) => {
//  let sql = `select m_name, menu_id from menu where m_name = '${m_menu}'`;
//   let q =  db.query(sql, (err,result) => {
//   if(err){
//     throw err
//   }
//     console.log('Myyyyyyyyyyyy id' + result[0].menu_id)
//    insertOrderItemDb(req,result[0].menu_id)
//    resolve({res: 'sucess to insert to db' })

// })

//   })
// }


const insertOrderItemDb = (req,menu_id, orderItemId) => {
  let insert = 'INSERT INTO Order_item SET ?'
  db.query(insert,{oi_id: orderItemId,
    order_num: req.body.order_num,
    m_id: menu_id,
    },(err,result) => {
      if(err){
        throw err
      }
      console.log(result)


    })

}

const insertPizzaOrderDb = (oi_id,pizza_id,topping_id) => {
  let insert = 'insert into pizza_order SET ?'
  db.query(insert, {oi_id: oi_id,
                    m_id: pizza_id,
                    topping_id: topping_id},(err,result) => {
                      if(err){
                        throw err
                      }
                      console.log(result)
                    })
}

 findMenuNameToId = (m_menu) => {
   console.log(m_menu);
    return new Promise( (resolve, reject) =>{
      let sql = `select m_name, menu_id from menu where m_name = '${m_menu}'`;
      let q =  db.query(sql, (err,result) => {
      if(err){
        throw err
      }
       console.log('Myyyyyyyyyyyy id' + result[0].menu_id)
       resolve( result[0].menu_id)

    })
    })
 }

 getOrderItemIdDb = () => {
   return new Promise ( (resolve,reject) => {
   let sql = 'select oi_id from order_item where oi_id>=all (select oi_id from order_item)'
   db.query(sql, (err,result) => {
    if(err){
      throw err
    }
    console.log(result)
    resolve(result[0].oi_id)
  })
})
 }

 app.delete('/deleteItemMenu/:menu_id', (req,res) => {
   let sql = `delete from menu where menu_id = '${req.params.menu_id}'`
   console.log(req.params.name)
   db.query(sql, (err,result) => {
    if(err){
      throw err
    }
    console.log(result)
    res.status(201).send({res:'the delete successed'})
  })
 } )

 app.patch('/editItemMenu', (req,res) => {
   console.log(req.body.menu_id)
   let sql =`update menu set m_name='${req.body.m_name}',
             m_description='${req.body.m_description}',
             imagePathFront='${req.body.imagePathFront}',
             imagePathBack='${req.body.imagePathBack}',
             category='${req.body.category}',
             price='${req.body.price}',
             menu_id='${req.body.menu_id}' where menu_id='${req.body.menu_id}'`
             db.query(sql, (err,result) => {
              if(err){
                throw err
              }
              console.log(result)
              res.status(201).send({res:'the edit successed'})
            })
 })

 app.post('/add-item', (req,res) => {
   let sql = `insert into menu (m_name, m_description ,imagePathFront,imagePathBack,category,price)
                value('${req.body.m_name}','${req.body.m_description}','${req.body.imagePathFront}',
                      '${req.body.imagePathBack}','${req.body.category}','${req.body.price}')`

      db.query(sql,(err,result) => {
        if(err){
          throw err
        }
        console.log(result)
        res.status(201).send({res:'the add successed'})
      })
 })

 app.get('/order-details',(req,res) => {
   let sql = `select o.num_order,o.o_type,CONVERT(o.o_date,CHAR) o_date,o.pick_time,o.price,b.city, o.o_status
              from orders as o
              inner join branch as b
              on  b.b_id=o.branch_id`

   db.query(sql, (err,result) => {
    if(err){
      throw err
    }
    console.log(result)
    res.status(201).send(result)
  })
 })

 app.get('/order-details/:id',(req,res) => {
  console.log('hiiiiiii!!!!!!!!!!!!!!!');
  let sql = `select m.m_name,oi.oi_id,oi.order_num,u.phone,m.category,mm.m_name as topping from menu as m
             inner join order_item as oi
             on m.menu_id=oi.m_id
             inner join orders as o
             on o.num_order = oi.order_num
             inner join users as u
             on u.user_id = o.user_id
             left join pizza_order as po
             on po.oi_id = oi.oi_id
             left join menu as mm
             on mm.menu_id = po.topping_id
             where oi.order_num = '${req.params.id}'
             group by oi.oi_id`


  db.query(sql, (err,result) => {
   if(err){
     throw err
   }
   console.log(result)
   res.status(201).send(result)
 })
})


app.get('/order-topping/:id',(req,res) => {
  let sql = `select oi.oi_id,mm.m_name as topping from menu as m
              inner join order_item as oi
              on m.menu_id=oi.m_id
              inner join orders as o
              on o.num_order = oi.order_num
              inner join users as u
              on u.user_id = o.user_id
              inner join pizza_order as po
              on po.oi_id = oi.oi_id
              left join menu as mm
              on mm.menu_id = po.topping_id
              where oi.order_num='${req.params.id}'`

  db.query(sql, (err,result) => {
   if(err){
     throw err
   }
   console.log(result)
   res.status(201).send(result)
 })
})

app.patch('/update-status' ,(req,res) => {
  console.log(req.body.menu_id)
  let sql =`update orders set o_status='${req.body.status}'
            where num_order= ${req.body.numOrder}`
            db.query(sql, (err,result) => {
             if(err){
               throw err
             }
             console.log(result)
             res.status(201).send({res:'the update successed'})
           })
})

app.get('/searchNumOrder/:id',(req,res) => {
  let sql = `select o.num_order,o.o_type,CONVERT(o.o_date,CHAR) o_date,o.pick_time,o.price,b.city, o.o_status
             from orders as o
             inner join branch as b
             on  b.b_id=o.branch_id
             where o.num_order='${req.params.id}' `

  db.query(sql, (err,result) => {
   if(err){
     throw err
   }
   console.log(result)
   res.status(201).send(result)
 })
})

app.get('/filterStatus/:id', (req, res) => {
  let sql = `select o.num_order,o.o_type,CONVERT(o.o_date,CHAR) o_date,o.pick_time,o.price,b.city, o.o_status
  from orders as o
  inner join branch as b
  on  b.b_id=o.branch_id
  where o.o_status='${req.params.id}'`
  console.log('helloo ' + req.params.id)
  db.query(sql, (err,result) => {
        if(err) {
          throw err
        }
        console.log(result)
        res.status(201).send(result)
  })
})

app.get('/filterOrderData/:id',(req, res) => {
  const queryParameter = req.query;
  console.log(queryParameter.fromDate);
  let sql = `select o.num_order,o.o_type,CONVERT(o.o_date,CHAR) o_date,o.pick_time,o.price,b.city, o.o_status
  from orders as o
  inner join branch as b
  on  b.b_id=o.branch_id
  where o.o_status='${req.params.id}' and o.o_type='${queryParameter.type}' and o.o_date between '${queryParameter.fromDate}' and '${queryParameter.toDate}'`
  console.log('helloo ' + req.params.id)
  db.query(sql, (err,result) => {
        if(err) {
          throw err
        }
        console.log(result)
        res.status(201).send(result)
  })
} )

app.get('/filterOrderDataByType/:id',(req, res) => {
  const queryParameter = req.query;
  console.log(queryParameter.fromDate);
  let sql = `select o.num_order,o.o_type,CONVERT(o.o_date,CHAR) o_date,o.pick_time,o.price,b.city, o.o_status
  from orders as o
  inner join branch as b
  on  b.b_id=o.branch_id
  where o.o_type='${req.params.id}' and o.o_date between '${queryParameter.fromDate}' and '${queryParameter.toDate}'`
  console.log('helloo ' + req.params.id)
  db.query(sql, (err,result) => {
        if(err) {
          throw err
        }
        console.log(result)
        res.status(201).send(result)
  })
} )

app.get('/filterOrderDataByStatus/:id',(req, res) => {
  const queryParameter = req.query;
  console.log(queryParameter.fromDate);
  let sql = `select o.num_order,o.o_type,CONVERT(o.o_date,CHAR) o_date,o.pick_time,o.price,b.city, o.o_status
  from orders as o
  inner join branch as b
  on  b.b_id=o.branch_id
  where o.o_status='${req.params.id}' and o.o_date between '${queryParameter.fromDate}' and '${queryParameter.toDate}'`
  console.log('helloo ' + req.params.id)
  db.query(sql, (err,result) => {
        if(err) {
          throw err
        }
        console.log(result)
        res.status(201).send(result)
  })
} )

module.exports = app
