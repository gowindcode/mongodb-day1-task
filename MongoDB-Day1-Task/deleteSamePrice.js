// please note if same price repeats in out products, we can delete the same price more than 1, we can get results this way

var duplicatePrices = db.taskProduct.aggregate([
    {
      $group: {
        _id: { product_price: "$product_price" },
        count: { $sum: 1 },
        ids: { $push: "$_id" }
      }
    },
    {
      $match: {
        count: { $gt: 1 }
      }
    }
  ]);
  
  duplicatePrices.forEach(function(duplicate) {
    duplicate.ids.shift();
    db.taskProduct.deleteMany({ _id: { $in: duplicate.ids } });
  });
  

   // Keep one document and delete the rest