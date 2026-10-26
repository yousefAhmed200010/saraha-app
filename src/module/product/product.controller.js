import { Router } from "express";
import { productdetails } from "./product.service.js";   // ← only this

const productcontroller = Router();

productcontroller.get("/product-data/:productid", (req, res) => {
  const result = productdetails(req.params.productid);
  res.status(200).json({
    msg: "done",
    data: result
  });
});

export default productcontroller;