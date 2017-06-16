
/**
 * This file contains the controller methods related to manipulation of item documents.
 */

//Importing the order service.
var workOrderService = require("../services/work-order.service.js");
var logger = require("../../logger.js");

//Importing the response object
var Response = require("../response.js");
var Promise = require("bluebird");

//Creating the object to be exported.
function init(router) {
    router.route('/wo/associate')
        .post(mapUserAndWorkOrder);
    router.route('/wo/:userId')
        .get(getWorkOrdersByUserId);
};

function mapUserAndWorkOrder(req, res) {
    var response = new Response();
    var workOrderMapping = req.body;
    workOrderService.mapUserAndWorkOrder(workOrderMapping).then(function (result) {
        response.data.order = result;
        response.status.code = "200";
        response.status.message = "Order Placed Successfully";
        logger.info("Order Placed Successfully");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while placing order {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Order was not placed";
        res.status(500).json(response);
    });
}


function getWorkOrdersByUserId(req, res) {
    var response = new Response();
    var userId = req.params.userId;
    workOrderService.getWorkOrdersByUserId(userId).then(function (result) {
        response.data.order = result;
        response.status.code = "200";
        response.status.message = "work orders for user with id :" + userId + " fetched successfully.";
        logger.info("work orders for user with id :" + userId + " fetched successfully.");
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