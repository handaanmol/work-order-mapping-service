
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
    router.route('/workorder/associate').post(associateWorkOrderToUser);
    router.route('/workorder/user/:userId').get(getWorkOrderByUserId);
    router.route('/workorders/user/:userId').get(getWorkOrdersByUserId);
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

function getWorkOrderByUserId(req, res) {
    var response = new Response();
    var userId = req.params.userId;
    workOrderService.getWorkOrderByUserId(userId).then(function (result) {
        response.data = result;
        response.status.code = "200";
        response.status.message = "Work Order for User with id :" + userId + " fetched successfully.";
        logger.info("Work Order for User with id :" + userId + " fetched successfully.");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching Work Order with User id :" + userId + " {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Work Orders for User with id : " + userId + " were not fetched successfully";
        res.status(500).json(response);
    });
}

function getWorkOrdersByUserId(req, res) {
    var response = new Response();
    var userId = req.params.userId;
    workOrderService.getWorkOrdersByUserId(userId).then(function (result) {
        response.data = result;
        response.status.code = "200";
        response.status.message = "Work Orders for User with id :" + userId + " fetched successfully.";
        logger.info("Work Orders for User with id :" + userId + " fetched successfully.");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching Order with id :" + userId + " {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "work orders for user with id : " + userId + " were not fetched successfully";
        res.status(500).json(response);
    });
}


//Finally exporting the employee controller methods as an object.
module.exports.init = init;