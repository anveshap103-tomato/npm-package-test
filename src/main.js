const express = require("express");
const app = express();
const {Prisma} = require('../database/config');

app.use(express.json())


app.get('/health', (req, res) => {
  res.status(200).json({ "status": "OK" });
});

app.get('/users', async(req, res) => {
  const all_users = await Prisma.user.findMany();
  res.status(200).json(all_users);
})

app.post('/users', async(req, res) => {
  const {username, email, fullname, bio} = req.body();
  if (!username || !email || !fullname){
    res.status(400).json({ "error": "username, email and fullname are required" });
    return;
  }

  const already_exist = await Prisma.user.findUnique({
    where: { email: email , username: username},
  })

  if (already_exist) {
    res.status(409).json({ "error": "username or email already taken" });    
  }else{
    const new_user = await Prisma.user.create({
      data: {
        username: username,
        email: email,
        fullname: fullname,
        bio: bio
      }
    })
    res.status(201).json(new_user);
  }

})

app.get('/user/:id', async (req, res) => {
  const user = await Prisma.user.findUnique({
    where: { id: parseInt(req.params.id) }
  })

  if (user) {
    res.status(200).json(user);
  }else{
    res.status(404).json({ "error": "User not found" });
  }
})

app.listen(3000, ()=>{
    console.log("Server started on port 3000");
});