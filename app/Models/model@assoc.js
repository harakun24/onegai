/** @format */

// pass by reference
export default (models) => {
  const { Kategori, Subkategori } = models;

  Kategori.hasMany(Subkategori, {
    foreignKey: "fk_kategori",
    constraints: false,
    onDelete: "cascade",
  });
  Subkategori.belongsTo(Kategori, {
    foreignKey: "fk_kategori",
    constraints: false,
  });
  // console.log(`   :`);
  // console.log(`   └---> Associating tables`);
};
