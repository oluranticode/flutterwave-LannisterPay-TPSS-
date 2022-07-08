// const Payment = require('../models/Payment');

    const createTransaction = async(req, res) => {
        
        try{
            // const payment = await Payment.create({...req.body});
            const { ID, Amount, Currency, CustomerEmail, SplitInfo } = req.body;

 let Balance = Amount;
 let currentBalance = 0
 let SplitBreakdown = [];
 let sortInfo = [];

 const sortItems = (items) => {
 const price = [{value:"FLAT",index: 1},{value: "PERCENTAGE",index: 2} , {value:"RATIO", index: 3}]
 let totalRatio = 0;
   for(let i = 0; i < items.length; i++){
       if(items[i].SplitType === price[0].value){
           items[i].index = price[0].index
       }
       if(items[i].SplitType === price[1].value){
         items[i].index = price[1].index
       }
         if(items[i].SplitType === price[2].value){
         items[i].index = price[2].index
         totalRatio = totalRatio + Number(items[i].SplitValue);
       }
   }

   items.sort((x,y) =>  x.index - y.index)
   return { items, totalRatio };
 }

sortInfo = sortItems(SplitInfo);
// console.log(sortInfo);

const {items, totalRatio}= sortInfo;

 for (let i = 0; i < items.length; i++) {
  const { SplitType, SplitValue, SplitEntityId } = items[i];
    if(SplitType === 'FLAT'){
       Balance  =  Balance - SplitValue;
       SplitBreakdown.push({SplitEntityId, Amount: SplitValue});
    }
    if(SplitType === 'PERCENTAGE'){
         const percentageValue = Balance * SplitValue / 100;
         Balance = Balance - percentageValue;
         SplitBreakdown.push({SplitEntityId, Amount: percentageValue});
    }
    if(SplitType === 'RATIO'){
        currentBalance = currentBalance === 0? Balance : currentBalance;
        const ratioValue = currentBalance * SplitValue / totalRatio;
        Balance = Balance - ratioValue;
        SplitBreakdown.push({SplitEntityId, Amount: ratioValue})   
    }
 }

res.status(200).json({
    ID,
    Balance: Balance,
    SplitBreakdown
    });
         
           
        }catch(err){
            res.status(200).json({msg:err});
        }
    }

    module.exports = {createTransaction};