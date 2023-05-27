import bcrypt from "bcrypt";

/* HashSync para aplicar proceso de Hasheo */
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));


/* Compare password con compareSync */

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);