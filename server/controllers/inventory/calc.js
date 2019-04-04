const db = require("../../db/models");
const validate = require("./validation");

function toNumber(inputs) {
    return inputs.map(parseFloat);
}

const calc = {
    remainingInBottle: function (measuredWeight, emptyBottleWeight, gramsPerOunce) {
        [measuredWeight, emptyBottleWeight, gramsPerOunce] = toNumber([measuredWeight, emptyBottleWeight, gramsPerOunce])
        return ((measuredWeight - emptyBottleWeight) / gramsPerOunce);
    },
    percentageLeft: function (remainingInBottle, bottleSizeOz) {
        [remainingInBottle, bottleSizeOz] = toNumber([remainingInBottle, bottleSizeOz])
        return (remainingInBottle / bottleSizeOz)
    },
    pricePerOunce: function (costPerBottle, bottleSizeOz) {
        [costPerBottle, bottleSizeOz] = toNumber([costPerBottle, bottleSizeOz])
        return (costPerBottle / bottleSizeOz)
    },
    valueOfBottle: function (pricePerOunce, remainingInBottle) {
        [pricePerOunce, remainingInBottle] = toNumber([pricePerOunce, remainingInBottle])
        return (pricePerOunce * remainingInBottle)
    },
    totalInventory: function (valueOfBottle, costPerBottle, numOfBottles) {
        [valueOfBottle, costPerBottle, numOfBottles] = toNumber([valueOfBottle, costPerBottle, numOfBottles])
        return (valueOfBottle + costPerBottle * numOfBottles)
    }
}

function alcohol(brandStyle, bottleSizeML) {
    return new Promise((resolve, reject) => {
        db.Alcohol.findOne({
            attributes: ['type', 'brandStyle', 'sizeML', 'sizeOZ', 'emptyBottleWeight', 'gramsPerOunce'],
            where: {
                brandStyle: brandStyle,
                sizeML: parseFloat(bottleSizeML)
            }
        }).then(res => {
            if (res) {
                resolve(res.dataValues);
                console.log(res.dataValues);
            } else {
                reject({errors: { dataError: `No match found for ${brandStyle}, ${bottleSizeML}mL`} });
            }
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
}

// async function userInputs(data) {
function userInputs(req, res) {
    const data = req.body;

    let check = validate(data)
    if (!check.isValid) {
        return res.status(404).json(check);
    }

    alcohol(data.brandStyle, data.sizeML)
    .then(alcoholInfo => {
        console.log("alcoholInfo: ", alcoholInfo);
        // alcoholInfo.type = data.type;
        // alcoholInfo.brandStyle = data.brandStyle;

        check = validate(alcoholInfo, checkUserId = null)
        if (!check.isValid) {
            return res.status(404).json(check);
        } 
    
        const sizeOunces = alcoholInfo.sizeOZ;
        const emptyBottleWeight = alcoholInfo.emptyBottleWeight;
    
        const remainingInBottle = calc.remainingInBottle(data.measuredWeight, emptyBottleWeight, alcoholInfo.gramsPerOunce);
        const percentBottleLeft = calc.percentageLeft(remainingInBottle, sizeOunces);
        const pricePerOunce = calc.pricePerOunce(data.costPerBottle, sizeOunces);
        const valueOfBottle = calc.valueOfBottle(pricePerOunce, remainingInBottle);
        const totalInventory = calc.totalInventory(valueOfBottle, data.costPerBottle, data.totalBottles);
                        
        const userInventory = {};
        userInventory.userId = data.userId
        userInventory.type = alcoholInfo.type;
        userInventory.brandStyle = alcoholInfo.brandStyle;
        userInventory.costPerBottle = parseFloat(data.costPerBottle);
        userInventory.sizeML = parseFloat(alcoholInfo.sizeML);
        userInventory.sizeOZ = parseFloat(sizeOunces);
        userInventory.percentBottleRemaining = parseFloat(percentBottleLeft);
        userInventory.currentValueOfBottle = parseFloat(valueOfBottle);
        userInventory.totalBottles = parseFloat(data.totalBottles);
        userInventory.totalInventoryValue = parseFloat(totalInventory);
    
        console.log("INVENTORY CONTROLLER PRINTOUT", userInventory);
    
        // db.UserInventory.create(userInventory);
        db.UserInventory
            .create(userInventory)
            .then(result => {
                return res.json(result);
            })
            .catch(err => res.status(500).json(err));
        // return userInventory;    
    })
    .catch(err => {
        console.log(JSON.stringify(err));
        return res.status(400).json(err);
    })
}

module.exports = userInputs;
