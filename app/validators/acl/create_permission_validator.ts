import vine from '@vinejs/vine'

export const createPermissionValidator = vine.compile(
  vine.object({
    permissions: vine
      .array(
        vine.object({
          slug: vine.string(),
          title: vine.string().optional(),
        })
      )
      .notEmpty(),
  })
)
