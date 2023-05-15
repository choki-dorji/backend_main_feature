exports.dynamicToken = (req, res) => {
  const token = req.cookies.tokenABC;
  const notificationCount = await Request.countDocuments({ clicked: false });
  const username = req.cookies.userData;
  res.render("/required/header", {token: token, notificationCount: notificationCount, username: username.name})
   
};
