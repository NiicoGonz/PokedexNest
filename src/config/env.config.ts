export const EnvConfiguration =() =>({
    enviroment: process.env.NODE_ENV || 'development',
    mongodb: process.env.MONGODB || 'mongodb://localhost:27017/pokemon',
    port: process.env.PORT || 3000,
    defaultLimit: process.env.DEFAULT_LIMIT || 8,
})