
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
    getWorkOrders: getWorkOrders
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

function getWorkOrders(userId, limit) {
    return new Promise(function (resolve, reject) {
        
        if (!userId){
            logger.error("userid query parameter is mandatory");
            reject("userid query parameter is mandatory");
        }
        else
            logger.error("OOOPS");
        
        var workOrderMapping = workOrderFile.workOrderMapping;
        if (workOrderMapping != undefined && workOrderMapping != null) {
            var workOrders = _.where(workOrderMapping, {userId: userId });
            if (workOrders.length > 0) {
                var sortedWorkOrders = _.sortBy(workOrders, function(data) { return data.createddate; }).reverse();
                logger.info("Work Order fetched for user with userId : " + userId + " fetched successfully {{IN SERVICE}}")
                if (!limit)
                    resolve(sortedWorkOrders);
                else
                    resolve(_.first(sortedWorkOrders, limit));
            } else {
                logger.error("No work orders with UserId found {{IN SERVICE}}");
                reject("No work orders for user '" + userId + "' found");
            }
        }
        else {
            logger.error("Some error in fetching the Work Order for user {{IN SERVICE}}");
            reject("Some error in fetching the Work Order for user");
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

//Exporting all the methods in an object
module.exports = workOrderService;