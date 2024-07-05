const moment = require("moment-timezone");

module.exports = function (schema) {
  schema.pre("save", function (next) {
    // Adjust createdAt if it's a new document
    if (this.isNew && this.createdAt) {
      this.createdAt = moment(this.createdAt).add(3, "hours").toDate();
    }

    // Update updatedAt if the document is being modified
    if (this.isModified()) {
      this.updatedAt = moment(new Date()).add(3, "hours").toDate();
    }

    next();
  });
};
