import { BaseSchema } from '@adonisjs/lucid/schema'
import config from '@adonisjs/core/services/config'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('permissions', (table) => {
      table.increments('id')
      table.string('slug')
      table.string('title').nullable()
      table.string('entity_type').defaultTo('*')
      this.modelId(table, 'entity_id').nullable()
      table.string('scope').defaultTo('default')
      table.boolean('allowed').defaultTo(true)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.index(['scope', 'slug'])
      table.index(['entity_type', 'entity_id'])
    })

    this.schema.createTable('roles', (table) => {
      table.increments('id')
      table.string('slug')
      table.string('title').nullable()
      table.string('entity_type').defaultTo('*')
      this.modelId(table, 'entity_id').nullable()
      table.string('scope').defaultTo('default')
      table.boolean('allowed').defaultTo(true)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.index(['scope', 'slug'])
      table.index(['entity_type', 'entity_id'])
    })

    this.schema.createTable('model_roles', (table) => {
      table.bigIncrements('id')

      table.string('model_type')
      this.modelId(table, 'model_id')
      this.modelId(table, 'role_id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.index(['model_type', 'model_id'])

      table.foreign('role_id').references('roles.id').onDelete('CASCADE')
    })

    this.schema.createTable('model_permissions', (table) => {
      table.bigIncrements('id')

      table.string('model_type')
      this.modelId(table, 'model_id')
      this.modelId(table, 'permission_id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.index(['model_type', 'model_id'])

      table.foreign('permission_id').references('permissions.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(config.get('permissions.permissionsConfig.tables.modelRoles'))
    this.schema.dropTable(config.get('permissions.permissionsConfig.tables.roles'))
    this.schema.dropTable(config.get('permissions.permissionsConfig.tables.modelPermissions'))
    this.schema.dropTable(config.get('permissions.permissionsConfig.tables.permissions'))
  }

  private primaryKey(table: any, columnName: string) {
    return config.get('permissions.permissionsConfig.uuidSupport')
      ? table.string(columnName).primary()
      : table.bigIncrements(columnName)
  }

  private modelId(table: any, columnName: string) {
    return config.get('permissions.permissionsConfig.uuidSupport')
      ? table.string(columnName)
      : table.bigint(columnName).unsigned()
  }
}
