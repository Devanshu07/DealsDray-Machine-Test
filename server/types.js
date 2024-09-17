const zod = require("zod");


const createAdmin= zod.object({
    title: zod.string().min(3),
    description: zod.string().min(3)
})

const createEmployee= zod.object({
    id: zod.string()
})

module.exports = {
    createAdmin,
    createEmployee
}