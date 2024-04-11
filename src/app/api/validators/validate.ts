import Joi from 'joi';
export const create_user_schema = Joi.object({
  role: Joi.number().required(),

  password: Joi.string().pattern(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
  ),
  fullname: Joi.string().alphanum().min(8).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'nrw'] },
  }),
});

export const user_login_schema = Joi.object({
  password: Joi.string().pattern(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
  ),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
});

export const update_user_schema = Joi.object({
  role: Joi.number().required(),
  fullname: Joi.string().alphanum().min(3).max(30).required(),

  disable: Joi.boolean(),
});

export const category_schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
});

export const category_option_schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  category: Joi.string()
    .alphanum()
    .min(3)
    .max(100)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
});

export const reset_password_schema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().pattern(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
  ),
});
