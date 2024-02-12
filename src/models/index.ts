import Package from "./Package";
import User from "./User";

User.hasMany(Package, {});
Package.belongsTo(User, {});

export { User, Package };
