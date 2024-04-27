const { EntitySchema } = require('typeorm');

const UserEntity = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      generated: false,
    },
    hashPassword: {
      type: 'varchar',
      nullable: false,
      exclude: true
    }
  }
});

module.exports = UserEntity;