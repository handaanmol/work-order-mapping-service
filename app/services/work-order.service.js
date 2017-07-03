
/**
 * This service file contains the service layer methods for manipulating the workorder objects.
 */
var logger = require("../../logger.js");
var Promise = require('bluebird');
var _ = require('underscore');
var fs = require('fs');
var workOrderFile = require('../../work-order-mapping.json')

//Creating the object which will finally be exported
var workOrderService = {
    mapUserAndWorkOrder: mapUserAndWorkOrder,
    getWorkOrdersByUserId: getWorkOrdersByUserId
};

/**
 * This method prepares the actual employee document to be stored in database.
 * @param {*order} order
 */
function mapUserAndWorkOrder(workOrderMappingData) {
    return new Promise(function (resolve, reject) {
        // var orderNo = workOrderMappingData
        var obj = {
            userId: workOrderMappingData.userId,
            workOrderId: workOrderMappingData.workOrderId
        }
        workOrderFile.workOrderMapping.push(obj);
        fs.writeFile(__dirname + "/../../work-order-mapping.json", JSON.stringify(workOrderFile), function (err) {
            if (err) {
                logger.error("Some error while adding work order mapping in the work-order-mapping file");
                reject(err);
            } else {
                logger.info("work order associated successfully");
                resolve(obj);
            }
        });
    })
};


function getWorkOrdersByUserId(userId) {
    return new Promise(function (resolve, reject) {
        var workOrderMapping=workOrderFile.workOrderMapping;

        if (workOrderMapping!= undefined && workOrderMapping != null) {
            var workorderMaps = _.where(workOrderMapping, {userId: userId });
            var workOrders=_.pluck(workorderMaps,'workOrderId')
            logger.info("work orders fetched for user with userId : "+userId+"fetched successfully {{IN SERVICE}}")
            resolve(workOrders[workOrders.length-1]);
        }
        else {
            logger.error("Some error in fetching the workOrders for user {{IN SERVICE}}");
            reject("Some error in fetching the workOrders for user");
        }
    })
}



//Exporting allthe methods in an object
module.exports = workOrderService;