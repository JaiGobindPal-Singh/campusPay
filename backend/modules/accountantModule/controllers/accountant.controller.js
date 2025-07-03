export const payFees = async (req, res) => {
    try{
        res.status(200).json({
            message: "Fees payment by acc"})
    }catch(err){
        console.log('error in payFees controller', err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getPreviousTransactions = async (req, res) => {
    try{
        res.status(200).json({
            message: "Previous transactions fetched successfully"
        })
    }catch(err){
        console.log('error in getPreviousTransactions controller', err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const printReciept = async (req, res) => {
    try{
        res.status(200).json({
            message: "Reciept printed successfully"
        })
    }catch(err){
        console.log('error in printReciept controller', err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const addFine = async (req, res) => {
    try{
        res.status(200).json({
            message: "Fine added successfully"
        })
    }catch(err){
        console.log('error in addFine controller', err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const scholarship = async (req, res) => {
    try{
        res.status(200).json({
            message: "Scholarship processed successfully"
        })
    }catch(err){
        console.log('error in scholarship controller', err);
        return res.status(500).json({ message: "Internal server error" });
    }
}