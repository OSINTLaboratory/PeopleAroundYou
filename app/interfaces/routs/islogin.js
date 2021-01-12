const IsLogin = async (req, res) => {
  if(
    req.admin_perm ||
    req.moder_perm ||
    req.user_perm
  ){
    res.send("true").end();
  } else {
    res.send("false").end();
  }
};
module.exports = IsLogin;
