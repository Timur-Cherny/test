const { EntitySchema } = require('typeorm');

const FileInfoEntity = new EntitySchema({
  name: 'FileInfo', // Имя сущности
  tableName: 'file_info', // Имя таблицы в базе данных
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      nullable: false,
    },
    mimetype: {
      type: 'varchar',
      nullable: false,
    },
    extension: {
      type: 'varchar',
      nullable: false,
    },
    size: {
      type: 'int',
      nullable: false,
    },
    uploadDate: {
      type: 'timestamp',
      nullable: false,
		},
		originalname: {
      type: 'varchar',
      nullable: false,
    },
  },
});

module.exports = FileInfoEntity;