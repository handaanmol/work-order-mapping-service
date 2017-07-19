
/**
 * This service file contains the service layer methods for manipulating the workorder objects.
 */
var logger = require("../common/logger.js");
var Promise = require('bluebird');
var _ = require('underscore');
var fs = require('fs');
var workOrderFile = require('../data/work-order-mapping.json')

//Creating the object which will finally be exported
var workOrderService = {
    associateWorkOrderToUser: associateWorkOrderToUser,
    getWorkOrdersByUserId: getWorkOrdersByUserId,
    getWorkOrderByUserId: getWorkOrderByUserId
};

/**
 * This method prepares the actual employee document to be stored in database.
 * @param {*order} order
 */
function associateWorkOrderToUser(workOrderData) {
    return new Promise(function (resolve, reject) {
        if(workOrderData.userId != undefined && workOrderData.workOrderId != undefined) {
            var currentDateTimeStamp = getCurrentDateTimeStamp();
            var obj = {
                userId: workOrderData.userId,
                workOrderId: workOrderData.workOrderId,
                createdDate: currentDateTimeStamp
            }
            workOrderFile.workOrderMapping.push(obj);
            fs.writeFile(__dirname + "/../data/work-order-mapping.json", JSON.stringify(workOrderFile), function (err) {
                if (err) {
                    logger.error("Error while associating Work Order to User in the work-order-mapping file");
                    reject(err);
                } else {
                    logger.info("Work Order associated successfully");
                    resolve(obj);
                }
            });
        } else {
            logger.error("Error with parameters passed for associating Work Order to User in the work-order-mapping file");
            reject(err);
        }
    })
};

function getWorkOrderByUserId(userId) {
    return new Promise(function (resolve, reject) {
        var workOrderMapping = workOrderFile.workOrderMapping;
        if (workOrderMapping != undefined && workOrderMapping != null) {
            var workOrders = _.where(workOrderMapping, {userId: userId });
            if (workOrders.length > 0) {
                var workOrder = _.sortBy(workOrders, function(data) { return data.createddate; });
                logger.info("Work Order fetched for user with userId : " + userId + " fetched successfully {{IN SERVICE}}")
                workOrder = workOrder.reverse()
                resolve(_.first(workOrder));
            } else {
                logger.error("No assocaition with UserId found {{IN SERVICE}}");
                reject("No assocaition with UserId found User");
            }
        }
        else {
            logger.error("Some error in fetching the Work Order for User {{IN SERVICE}}");
            reject("Some error in fetching the Work Order for User");
        }
    })
}

function getWorkOrdersByUserId(userId) {
    return new Promise(function (resolve, reject) {
        var workOrderMapping = workOrderFile.workOrderMapping;
        if (workOrderMapping != undefined && workOrderMapping != null) {
            var workorderMaps = _.where(workOrderMapping, {userId: userId });
            logger.info("Work Orders fetched for user with userId : " + userId + " fetched successfully {{IN SERVICE}}")
            resolve(workorderMaps);
        }
        else {
            logger.error("Some error in fetching the Work Orders for User {{IN SERVICE}}");
            reject("Some error in fetching the Work Orders for User");
        }
    })
}

function getCurrentDateTimeStamp() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + month + day + hour + min + sec;
}

//Exporting allthe methods in an object
module.exports = workOrderService;