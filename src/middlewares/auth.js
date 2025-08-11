const adminAuth = (req, res, next) =>{
  console.log("Entering this");
  
  const token = "abc";
  const isAdminAuthorised = token === "abc";
    if (!isAdminAuthorised){
      res.status(401).send("unauthorised")
    }
    else{
      next();
    }
  };

const userAuth = (req, res, next) =>{
  console.log("Entering to user for validation ");
  
  const token = "abc";
  const isAdminAuthorised = token === "abc";
    if (!isAdminAuthorised){
      res.status(401).send("unauthorised")
    }
    else{
      next();
    }
  };

  module.exports = {adminAuth, userAuth};