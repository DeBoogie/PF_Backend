interface IConfiguration {
    postgresql: {
        host: string,
        port: number,
        user: string,
        password: string,
        database: string
    }
}

export { IConfiguration };