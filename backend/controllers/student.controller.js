
export const payFees = function(req,res){
    res.status(200).json({
        message:"fees payment by student"
    })
}

export const getPreviousTransactions = function(req,res){
    res.status(200).json({
        message:"previous transactions by student"
    })
}

export const printReciept = function(req,res){
    res.status(200).json({
        message:"print reciept by student"
    })
}