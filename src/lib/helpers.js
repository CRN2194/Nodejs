const bcryptjs= require('bcryptjs');
const helpers =  {};
helpers.encryp = async (password) =>{
    const salt = await bcryptjs.genSalt(10);
    const ps = await bcryptjs.hash(password, salt);
    return ps;
};

helpers.matchPassword = async (password, savePassword) =>{
  return await bcryptjs.compare(password, savePassword);
};
module.exports =helpers;