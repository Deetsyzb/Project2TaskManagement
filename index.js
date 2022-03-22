const express = require('express')
const method = require(`method-override`)
const cookieParser = require('cookie-parser')
const app = express()
const pool = require("./db");
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
require(`dotenv`).config()
const { PORT }  = process.env
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

const UserRouter = require(`./routers/userRouter`);
const { header } = require('express/lib/request');

app.get('/', (req,res)=>res.render('index'))

// Login route --

app.post('/',async (req,res)=>{
try{
 const {email,user_password} = req.body
 console.log(req.body,email,user_password)
 const userLogin = await pool.query("SELECT * FROM users WHERE email=$1",[email])
//currently, if email is found and password is wrong, user is redirected to signup. Intention is to redirect to signup if email is not found
 console.log(userLogin.rows[0])
 console.table(userLogin.rows)
 if (user_password === userLogin.rows[0].user_password && email === userLogin.rows[0].email){
  // move to app if true.
  res.cookie(`id=${userLogin.rows[0].id};`)
  res.cookie(`username=${userLogin.rows[0].user_name};`)
  res.cookie(`loggedIn=${userLogin.rows[0].id};`)
  res.redirect('/app')
 //  move to signup if false
 } else {
   res.redirect('/signup')
  }}
 catch (error)  {
   console.error(error.message)
 }
} )


// .post/signup works to insert values into the users table
app.get('/signup', (req,res)=>res.render('signup'))
app.post('/signup', async (req,res) => {
  try{
const {user_name,email,user_password} = req.body
const userSignup = await pool.query("INSERT INTO users (user_name, email, user_password) VALUES ($1, $2, $3)",[user_name,email,user_password])
res.redirect("/")
  }
  catch(error){
    console.error(error.message)
  }
})

app.get('/app', async (req,res)=> {

  try {   
    const{username} = req.cookies
    headerArray = ["task","Duration"]
    tableHeaderArray = ["Project","Task","Duration"]
    const userQuery = await pool.query (`SELECT user_name,task_duration,project_id,task FROM TASKS WHERE user_name = '${username}'`)
    
    let result = userQuery.rows.map(a =>a.project_id);
    let resultb= userQuery.rows.map(b =>b.task_duration)
    let resultc = userQuery.rows.map(c =>c.task)
    
    var userArray = result.map((e, i) => [e ,resultb[i]]);
    console.log("userArray",userArray);
    
    var userTaskArray = resultc.map((e, i) => [e ,resultb[i]]);
    var projTaskArray = result.map((e, i) => [e ,resultc[i]]);
    console.log("projTaskArray",projTaskArray)
    var tableArray = projTaskArray.map((e, i) => [...e ,resultb[i]])
    
    

    console.log("tableArray",tableArray)
     const myObj = {
    gBarData :
    [[...headerArray],...userArray],
     gPieData :
    [[...headerArray],...userTaskArray],
    gTableData :
    [[...tableHeaderArray],...tableArray],
    username,
    

     }
  

  
  
  res.render('app',myObj)
}  catch(error){
    console.error(error.message)
  }
})

app.post('/app', async (req,res)=> {
  try {
  const{username} = req.cookies
  const {task,task_duration,task_priority,project_id,blocker,blocker_duration} = req.body

  const taskUpdate = await pool.query ("INSERT INTO tasks (task, task_duration,task_priority,project_id,user_name) VALUES ($1,$2,$3,$4,$5) RETURNING *", [task,task_duration,task_priority,project_id,username])

  const blockerUpdate = await pool.query ("INSERT INTO blockers (blocker,blocker_duration,project_id,user_name) VALUES ($1,$2,$3,$4) RETURNING *", [blocker,blocker_duration,project_id,username])

  

    
    headerArray = ["task","Duration"]
    tableHeaderArray = ["Project","Task","Duration"]
    const userQuery = await pool.query (`SELECT user_name,task_duration,project_id,task FROM TASKS WHERE user_name = '${username}'`)
    
    let result = userQuery.rows.map(a =>a.project_id);
    let resultb= userQuery.rows.map(b =>b.task_duration)
    let resultc = userQuery.rows.map(c =>c.task)
    
    var userArray = result.map((e, i) => [e ,resultb[i]]);
    console.log("userArray",userArray);
    
    var userTaskArray = resultc.map((e, i) => [e ,resultb[i]]);
    var projTaskArray = result.map((e, i) => [e ,resultc[i]]);
    console.log("projTaskArray",projTaskArray)
    var tableArray = projTaskArray.map((e, i) => [...e ,resultb[i]])
    
    

    console.log("tableArray",tableArray)
     const myObj = {
    gBarData :
    [[...headerArray],...userArray],
     gPieData :
    [[...headerArray],...userTaskArray],
    gTableData :
    [[...tableHeaderArray],...tableArray],
    username,
    

     }
  

  
  

  res.render('app',myObj)
}  catch(error){
    console.error(error.message)
  }
})


app.get('/overview', async (req,res)=>{
  try{
   headerArray = ["task","Duration"]
   
  const alphaQuery = await pool.query ("SELECT user_name,task_duration,project_id,task FROM TASKS WHERE project_id = 'Alpha' ")

    let result = alphaQuery.rows.map(a =>a.task);
    let resultb= alphaQuery.rows.map(b =>b.task_duration)
   
    var alphaArray = result.map((e, i) => [e ,resultb[i]]);
 
   const partyQuery = await pool.query ("SELECT user_name,task_duration,project_id,task FROM TASKS WHERE project_id = 'Party' ")

    let resultParty = partyQuery.rows.map(a =>a.task);
    let resultPartyb= partyQuery.rows.map(b =>b.task_duration)
   
    var partyArray = resultParty.map((e, i) => [e ,resultPartyb[i]]);
      
    const tripQuery = await pool.query ("SELECT user_name,task_duration,project_id,task FROM TASKS WHERE project_id = 'Fieldtrip' ")

    let tripResult = tripQuery.rows.map(a =>a.task);
    let tripResultb= tripQuery.rows.map(b =>b.task_duration)
   
    var tripArray = tripResult.map((e, i) => [e ,tripResultb[i]]);

     const myObj2 = {
    gPieData1 :
    [[...headerArray],...alphaArray],
    gPieData2 :
    [[...headerArray],...partyArray],
    gPieData3 :
    [[...headerArray],...tripArray]
     }
  res.render('overview',myObj2)
 
}  catch (error){
    console.error("isthisit",error.message)
  }
})
app.use('/users',UserRouter())
app.listen(PORT, ()=> console.log(`App is listening on port ${PORT}`))





// ===============================Tallied blocker and tasks =============================


  // console.log(taskUpdate.rows[0])
  // console.log(blockerUpdate.rows[0])
//   blockertally = {}
//   const blockerQuery = await pool.query ("SELECT user_name,blocker_duration FROM BLOCKERS")
//   console.log("blockerQuery",blockerQuery.rows)
//   blockerQuery.rows.forEach((element,id)=>{
//     if (blockertally[`${element.user_name}`]){
//       blockertally[`${element.user_name}`] = blockertally[`${element.user_name}`] + element.blocker_duration
//     }else {
//       blockertally[`${element.user_name}`] = element.blocker_duration

//     }
    
//   }) 

//   taskTally = {}
//   const taskQuery = await pool.query ("SELECT user_name,task_duration FROM TASKS")
//   console.log("taskQuery.rows",taskQuery.rows)
//   taskQuery.rows.forEach((element,id)=>{
//     if (taskTally[`${element.user_name}`]){
//       taskTally[`${element.user_name}`] = taskTally[`${element.user_name}`] + element.task_duration
//     }else {
//       taskTally[`${element.user_name}`] = element.task_duration

//     }
    
//   }) 

//   const headerArray = ['Username', 'Blocker', 'Task']
//   console.log("Blockertally",blockertally)
//   console.log("taskTally",taskTally)

//   const blockersArray = []
//   Object.keys(blockertally).forEach((user,index)=>{
//     blockersArray.push([user,Object.values(blockertally)[index]])
//   })
//  const tasksArray = []
//   Object.keys(taskTally).forEach((user,index)=>{
//     tasksArray.push([user,Object.values(taskTally)[index]])
//   })

//   const userBlockerTask = []
//   Object.keys(blockertally).forEach((user,index)=>{
//     userBlockerTask.push([user,Object.values(blockertally)[index],Object.values(taskTally)[index]])
    
//   })

//   const myObj = {
//     gBarData :
//     [[...headerArray],...userBlockerTask],
//     username


//   }

//   // console.log('blockersarray',blockersArray)
//   console.log("userBlockerTask",userBlockerTask)
//   console.log("headerArray",headerArray)
//   console.log("myObj",myObj)
//   res.render('app',myObj)

  // Todos
  // Add more routes for more charts 
  // Admin access or all user access
  // Styling

// ====================================== conditional =================================
  // for (let i = 0; i < userQuery.rows.length; i++) {
  //   alphaQuery.rows[i].user_name
  //   console.log("alphaQuery.rows[i].user_name",alphaQuery.rows[i].user_name)
  //   }

// =========================== Non- responsive ===========================================
  // const alphaQuery = await pool.query ("SELECT user_name,task_duration,project_id,task FROM TASKS WHERE project_id = 'Alpha' ")
  //   console.log("alphaQuery.Rows",alphaQuery.rows)
  //   console.log("alphaQuery.rows Object.keys",Object.keys(alphaQuery.rows))
  //   console.log("alphaQuery.rows Object.values",Object.values(alphaQuery.rows))
  //    for (let i = 0; i < alphaQuery.rows.length; i++) {
  //   alphaQuery.rows[i].project_id
  //   console.log("alphaQuery.rows[i].user_name",alphaQuery.rows[i].project_id)
  //   }
  //   let result = alphaQuery.rows.map(a =>a.task);
  //   let resultb= alphaQuery.rows.map(b =>b.task_duration)
  //   console.log(result)
  //   console.log(resultb)
  //   var alphaArray = result.map((e, i) => [e ,resultb[i]]);
  //   console.log("alphaArray",alphaArray);
   
  //    const myObj2 = {
  //   gPieData :
  //   [[...headerArray],...alphaArray],
  //    }


  // ================== Attempt to responsive ========================================
    // const projectQuery = await pool.query ("SELECT user_name,task_duration,project_id,task FROM TASKS")
    // console.log("projectQuery.Rows",projectQuery.rows)
    // console.log("projectQuery.rows Object.keys",Object.keys(projectQuery.rows))
    // console.log("projectQuery.rows Object.values",Object.values(projectQuery.rows))
    //  for (let i = 0; i < projectQuery.rows.length; i++) {
    // projectQuery.rows[i].project_id
    // console.log("projectQuery.rows[i].project_id",projectQuery.rows[i].project_id)
    // }
    // let result = projectQuery.rows.map(a =>a.task);
    // let resultb= projectQuery.rows.map(b =>b.task_duration)
    // console.log(result)
    // console.log(resultb)
    // var projectArray = result.map((e, i) => [e ,resultb[i]]);
    // console.log("projectArray",projectArray);
   
    //  const myObj2 = {
    // gPieData :
    // [[...headerArray],...projectArray],
    


  // }