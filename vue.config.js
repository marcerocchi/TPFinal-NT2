module.exports = {
    publicPath: process.env.NODE_ENV === 'production'? '/api' /*PRODUCCION*/ : '/' /*DESARROLLO*/ 
}