const { sequelize } = require("../connection");
const { ThemePropertyModel } = require("../model/theme_properties.model");

const listar = async function (textoBuscar) {
  console.log("listar propiedades de temas");
  try {
    const themesProperties = await sequelize.query(`SELECT *
                                          FROM themes_properties
                                          WHERE 1=1
                                            AND property_name LIKE '%${textoBuscar}%'
                                            AND deleted IS false
                                          ORDER BY id`);
    if (themesProperties && themesProperties[0]){
      return themesProperties[0];
    } else {
      return [];
    }
  } catch (error) {
    console.log(error)
  }
};

const consultarPorCodigo = async function (codiBuscar) {
  console.log("consultar propiedad de tema por código ");
  try {
    const themesProperties = await sequelize.query(`SELECT * 
                                            FROM themes_properties 
                                            WHERE 1=1
                                            AND id = ${codiBuscar}
                                            AND deleted IS false`);
    console.log("themesProperties", themesProperties);
    if (themesProperties && themesProperties[0] && themesProperties[0][0]) {
      return themesProperties[0]
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
  }
};

const consultarRegTheme = async function (codiBuscar) {
  console.log("consultar registros de un tema ");
  try {
    const themes = await sequelize.query(`
    SELECT tp.id AS id_propiedad,
          t.name AS nombre_del_Tema,
          t.description AS descripcion_del_tema,
          tp.property_name AS nombre_de_la_propiedad,
          tp.property_value AS valor_de_la_propiedad
    FROM themes t,themes_properties tp
    WHERE 1=1 AND t.id = ${codiBuscar} and tp.theme_id=t.id AND t.deleted IS false`);

    console.log("themes", themes);
    if (themes && themes[0] && themes[0][0]) {
      return themes[0]
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
  }
};

const actualizar = async function (id, theme_id, property_name, property_value, deleted) {
  console.log("actualizar propiedades de temas");
  //res.send("actualizción de temas");
  //Variables
  let temaPropiedadRetorno = null; //Guarda la propiedad de tema que se va a incluir o editar.
  const data = {id, theme_id, property_name, property_value, deleted}
  try {
    let tmProExiste = null;
    if (id) {
      tmProExiste = await ThemePropertyModel.findByPk(id);
    }
    if (tmProExiste) {
      //Asegurar que el tema existe, entonces actualizar
      temaPropiedadRetorno = await ThemePropertyModel.update(data, { where: { id: id }});
      temaPropiedadRetorno = data;
    } else {
      //Incluir
      temaPropiedadRetorno = await ThemePropertyModel.create(data);
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
};

const eliminar = async function (codiBorrar) {
  console.log("eliminar propiedades de temas");
  //res.send("eliminar de temas");

  await sequelize.query(
    "DELETE FROM themes_properties WHERE id = " + codiBorrar
  );
};

module.exports = {
  listar,
  actualizar,
  eliminar,
  consultarPorCodigo,
  consultarRegTheme
};