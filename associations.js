module.exports = function(db) {
  db.Post.belongsTo(db.Author, { foreignKey: { allowNull: false } });
  db.Author.hasMany(db.Post, { onDelete: "cascade" });
};
