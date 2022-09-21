const authorize = (req,res,next) => {
  const {user} = req.query
  if (user === 'john') {
    req.user = {user: 'john', id: 3}
    
    next()
  } else {
    res.status(401).send("You are not authorized")
  }
}
module.exports = authorize