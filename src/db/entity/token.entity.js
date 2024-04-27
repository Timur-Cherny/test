const { EntitySchema } = require('typeorm');

const TokenEntity = new EntitySchema({
  name: 'Token',
  tableName: 'tokens',
  columns: {
    id: {
			type: 'int',
			primary: true,
      generated: true,
    },
    refreshToken: {
      type: 'varchar',
      nullable: true,
      exclude: true
		},
		accessToken: {
      type: 'varchar',
      nullable: true,
      exclude: true
		}
	},
  relations: {
    user: {
      type: 'one-to-one',
      target: 'User',
      joinColumn: true,
			exclude: true,
			onDelete: 'CASCADE'
    }
  }
});

module.exports = TokenEntity;