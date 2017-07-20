
/**
 * This file contains the controller methods related to manipulation of item documents.
 */

/**
 * Importing required
 */
var workOrderService = require("./work-order.service.js");
var logger = require("../common/logger.js");
var Response = require("../common/response.js");
var Promise = require("bluebird");

//Creating the object to be exported.
function init(router) {
    router.route('/user-workorders').post(associateWorkOrderToUser);
    router.route('/user-workorders').get(getWorkOrders);
};

function associateWorkOrderToUser(req, res) {
    var response = new Response();
    var workOrderData = req.body;
    workOrderService.associateWorkOrderToUser(workOrderData).then(function (result) {
        response.data = result;
        response.status.code = "201";
        response.status.message = "Order Placed Successfully";
        logger.info("Order Placed Successfully");
        res.status(201).json(response);
    }).catch(function (error) {
        logger.error("error while Placing Order {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Order was not Placed";
        res.status(500).json(response);
    });
}

function getWorkOrders(req, res) {
    var response = new Response();
    var userId = req.query.userid;
    var limit = req.query.limit;
    workOrderService.getWorkOrders(userId, limit).then(function (result) {
        response.data = result;
        response.status.code = "200";
        response.status.message = "Work Order for User with id :" + userId + " fetched successfully.";
        logger.info("Work Order for User with id :" + userId + " fetched successfully.");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching Work Order with User id :" + userId + " {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Error in fetching Work Orders: " + error;
        res.status(500).json(response);
    });
}

//Finally exporting the methods
module.exports.init = init;