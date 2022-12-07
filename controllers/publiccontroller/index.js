const publicModel = require('./../../model/publicmodel');


//geting products for home page
exports.getItems = async (req,res) =>{
    
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offSet = (page - 1) * limit;
    
    try {
    const items = await  publicModel.getitems(limit,offSet);
    const totalItems = await publicModel.itemsCount();
        res.status(200).json({
            "products":items,
            "totalItems":totalItems,
            "limit":limit
        });

    } catch (error) {
        res.status(500).json(error.message)
    }
}