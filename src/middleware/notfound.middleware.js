// notfound.middleware.js
function notfoundmiddleware(req, res) {
  res.status(404).json({
    msg: `invalid url ${req.url} or method ${req.method}`
  });
}

export default notfoundmiddleware;   // ← this line is required/*  
