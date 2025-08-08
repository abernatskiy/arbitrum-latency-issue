module.exports = class Data1754664671469 {
    name = 'Data1754664671469'

    async up(db) {
        await db.query(`CREATE TABLE "dummy" ("id" character varying NOT NULL, CONSTRAINT "PK_8a7fd4e47344e8cfa61be2098af" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "dummy"`)
    }
}
