const { rolesMiddleware } = require("../middlewares/roleMiddleware");
const db = require("../models");
const Messages = db.chanelMessage;
const Group = db.group;


/* 
  PUBLIC : 
  GROUPES LIST 
*/
async function getAllMessages(req, res){
  const id = req.params.id;

  return Messages.findAll({
    attributes: ['message', 'created_at'],
    where: { 
      channel_id: id
    }
  })
  .then(msg => {
    res.json(msg);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving messages."
    });
  });
}