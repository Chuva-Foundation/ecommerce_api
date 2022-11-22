const publicModel = require('./../../model/publicmodel');


//geting products for home page
exports.getitems = async (req,res) =>{
    const items = await  publicModel.getitems();
    //console.log(items)
    res.status(200).json(items);

}