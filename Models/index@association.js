export default (Models) => {
  const { User, Post } = Models;
  User.hasOne(Post, { foreignKey: "userKey" });
};
