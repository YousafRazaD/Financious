module.exports = class user{
    constructor(id,name,email,password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }



    static find(email){
        async function run() {
            let connection;
            try {
                connection = await oracledb.getConnection(dbConfig);
                const sql =
                    `select * from users where users.email = ${email}`;
                let result;
                result = await connection.execute(
                  sql,
                  [],
                  {
                      outFormat: oracledb.OUT_FORMAT_OBJECT,
                  }
              );
              console.log(result.rows);
            } catch (err) {
                console.error(err);
            } finally {
                if (connection) {
                    try {
                        await connection.close();
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
        }
        run();
    }


    static save(user){
        async function run() {
            let connection;
            try {
                connection = await oracledb.getConnection(dbConfig);
                const sql =
                    `insert into users values(${user.id},${user.name},${user.email},${user.password})`;
                let result;
                result = await connection.execute(
                  sql,
                  [],
                  {
                      outFormat: oracledb.OUT_FORMAT_OBJECT,
                  }
              );
            } catch (err) {
                console.error(err);
            } finally {
                if (connection) {
                    try {
                        await connection.close();
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
        }
        run();
    }
};