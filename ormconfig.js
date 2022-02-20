const { ConfigService } = require('./src/shared/config.service')
const configService = new ConfigService();
module.exports = configService.typeOrmConfig;
