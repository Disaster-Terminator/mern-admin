const express = require("express");
const { catchErrors } = require("../handlers/errorHandlers");

const router = express.Router();

const adminController = require("../controllers/adminController");
const clientController = require("../controllers/clientController");

const leadController = require("../controllers/leadController");
const productController = require("../controllers/productController");
const courseController = require("../controllers/courseController");
const taskController = require("../controllers/taskController");
const noteController = require("../controllers/noteController");
const reviewPlanController = require("../controllers/reviewPlanController");
const aiLogController = require("../controllers/aiLogController");
const studyhubController = require("../controllers/studyhubController");

//_______________________________ Admin management_______________________________

router.route("/admin/create").post(catchErrors(adminController.create));
router.route("/admin/read/:id").get(catchErrors(adminController.read));
router.route("/admin/update/:id").patch(catchErrors(adminController.update));
router.route("/admin/delete/:id").delete(catchErrors(adminController.delete));
router.route("/admin/search").get(catchErrors(adminController.search));
router.route("/admin/list").get(catchErrors(adminController.list));

router
  .route("/admin/password-update/:id")
  .patch(catchErrors(adminController.updatePassword));
//list of admins ends here

//_____________________________________ API for clients __________________________
router.route("/client/create").post(catchErrors(clientController.create));
router.route("/client/read/:id").get(catchErrors(clientController.read));
router.route("/client/update/:id").patch(catchErrors(clientController.update));
router.route("/client/delete/:id").delete(catchErrors(clientController.delete));
router.route("/client/search").get(catchErrors(clientController.search));
router.route("/client/list").get(catchErrors(clientController.list));

//_____________________________________ API for leads ___________________________
router.route("/lead/create").post(catchErrors(leadController.create));
router.route("/lead/read/:id").get(catchErrors(leadController.read));
router.route("/lead/update/:id").patch(catchErrors(leadController.update));
router.route("/lead/delete/:id").delete(catchErrors(leadController.delete));
router.route("/lead/search").get(catchErrors(leadController.search));
router.route("/lead/list").get(catchErrors(leadController.list));

//_____________________________________ API for products ___________________________
router.route("/product/create").post(catchErrors(productController.create));
router.route("/product/read/:id").get(catchErrors(productController.read));
router
  .route("/product/update/:id")
  .patch(catchErrors(productController.update));
router
  .route("/product/delete/:id")
  .delete(catchErrors(productController.delete));
router.route("/product/search").get(catchErrors(productController.search));
router.route("/product/list").get(catchErrors(productController.list));

//_____________________________________ API for courses ___________________________
router.route("/course/create").post(catchErrors(courseController.create));
router.route("/course/read/:id").get(catchErrors(courseController.read));
router.route("/course/update/:id").patch(catchErrors(courseController.update));
router
  .route("/course/delete/:id")
  .delete(catchErrors(courseController.delete));
router.route("/course/search").get(catchErrors(courseController.search));
router.route("/course/list").get(catchErrors(courseController.list));

//_____________________________________ API for tasks ___________________________
router.route("/task/create").post(catchErrors(taskController.create));
router.route("/task/read/:id").get(catchErrors(taskController.read));
router.route("/task/update/:id").patch(catchErrors(taskController.update));
router.route("/task/delete/:id").delete(catchErrors(taskController.delete));
router.route("/task/search").get(catchErrors(taskController.search));
router.route("/task/list").get(catchErrors(taskController.list));
router
  .route("/task/toggle-status/:id")
  .patch(catchErrors(taskController.toggleStatus));

//_____________________________________ API for notes ___________________________
router.route("/note/create").post(catchErrors(noteController.create));
router.route("/note/read/:id").get(catchErrors(noteController.read));
router.route("/note/update/:id").patch(catchErrors(noteController.update));
router.route("/note/delete/:id").delete(catchErrors(noteController.delete));
router.route("/note/search").get(catchErrors(noteController.search));
router.route("/note/list").get(catchErrors(noteController.list));

//_____________________________________ API for review plans ___________________________
router
  .route("/reviewplan/create")
  .post(catchErrors(reviewPlanController.create));
router.route("/reviewplan/read/:id").get(catchErrors(reviewPlanController.read));
router
  .route("/reviewplan/update/:id")
  .patch(catchErrors(reviewPlanController.update));
router
  .route("/reviewplan/delete/:id")
  .delete(catchErrors(reviewPlanController.delete));
router
  .route("/reviewplan/search")
  .get(catchErrors(reviewPlanController.search));
router.route("/reviewplan/list").get(catchErrors(reviewPlanController.list));

//_____________________________________ API for AI logs ___________________________
router.route("/ai-log/create").post(catchErrors(aiLogController.create));
router.route("/ai-log/read/:id").get(catchErrors(aiLogController.read));
router.route("/ai-log/update/:id").patch(catchErrors(aiLogController.update));
router.route("/ai-log/delete/:id").delete(catchErrors(aiLogController.delete));
router.route("/ai-log/search").get(catchErrors(aiLogController.search));
router.route("/ai-log/list").get(catchErrors(aiLogController.list));

//_____________________________________ StudyHub statistics & AI ___________________________
router
  .route("/studyhub/statistics")
  .get(catchErrors(studyhubController.statistics));
router
  .route("/studyhub/ai-assistant")
  .post(catchErrors(studyhubController.aiAssistant));

module.exports = router;
