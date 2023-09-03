interface IPostgreSQLConnection {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string
}

export { IPostgreSQLConnection };