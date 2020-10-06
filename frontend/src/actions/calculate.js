const roundTo =require('round-to')
const calculate = {
    calculateTax: function(taxValue, tempTotal, tempDiscount){
        return roundTo((taxValue*(tempTotal-tempDiscount))/100.00, 2)
    },
    calculateDiscount: function(discountValue,tempTotal){
        return roundTo((discountValue*tempTotal)/100.00, 2)
    },
    addQuantityItem: function(quantity, price){
        return roundTo(quantity*price, 2)
    },
    calculateTotal: function(tax, total, discount){
        return roundTo(tax+total-discount,2)
    }


}
export default calculate