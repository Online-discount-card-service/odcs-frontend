//NOTE: Validation schemes for Zod validation in forms

import * as z from 'zod';
import { authFormErrors, cardFormErrors } from '..';

export const validationLengths = {
  email: 256,
  name: 60,
  password_new: 256,
  card_number: 40,
  barcode_number: 256,
  shop_name: 30,
  shop_group: 30,
};

export const validationSchemes = {
  //NOTE: Sign Up, Sign In, User Profile Form, Change Email Form, Change Password Form, Delete User Form, Reset Password Form, Set New Password Form, Card Share Form
  email: z
    .string()
    .min(1, { message: authFormErrors.requiredEmail })
    .min(6, { message: authFormErrors.wrongEmail })
    .max(validationLengths.email, { message: authFormErrors.maxLengthEmail })
    .regex(
      /^(?!@)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/,
      { message: authFormErrors.wrongEmail }
    ),
  name: z
    .string()
    .min(1, { message: authFormErrors.requiredName })
    .max(validationLengths.name, {
      message: authFormErrors.maxLengthName,
    })
    .regex(/^[A-Za-zА-Яа-яЁё\s!@#$%^&*()_~`+\-=[\]{};:'",.<>?/\\|]*$/, {
      message: authFormErrors.wrongName,
    }),
  phone_number: z
    .string()
    .min(1, { message: authFormErrors.requiredPhone })
    .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
      message: authFormErrors.wrongPhone,
    }),
  phone_last_digits: z
    .string()
    .min(1, { message: authFormErrors.requiredPhone })
    .regex(/^\+7 \(XXX\) XXX-\d{2}-\d{2}$/, {
      message: authFormErrors.wrongPhone,
    }),
  password_new: z
    .string()
    .min(1, { message: authFormErrors.requiredPassword })
    .min(8, { message: authFormErrors.wrongPasswordNew })
    .max(validationLengths.password_new, {
      message: authFormErrors.maxLengthPassword,
    })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[\x20-\x7F]+$/, {
      message: authFormErrors.wrongPasswordNew,
    }),
  password_repeat: z
    .string()
    .min(1, { message: authFormErrors.requiredPassword }),
  password_old: z.string().min(1, { message: authFormErrors.requiredPassword }),

  //NOTE: Add Card Form, Edit Card Form
  card_number: z
    .string()
    .max(validationLengths.card_number, {
      message: cardFormErrors.maxLengthCardNumber,
    })
    .regex(/^[A-Za-zА-Яа-яЁё\d\s_-]*$/, {
      message: cardFormErrors.wrongCardNumber,
    }),
  barcode_number: z
    .string({})
    .max(validationLengths.barcode_number, {
      message: cardFormErrors.maxLengthBarcodeNumber,
    })
    .regex(/^[A-Za-zА-Яа-яЁё\d\s_-]*$/, {
      message: cardFormErrors.wrongBarcodeNumber,
    }),
  //NOTE: In case of clearing the field with the built in close-button,
  // the value becomes NULL, so react-hook-form fires type error.
  // That's why we use 'required' error text as invalid type error
  // text in shopName field
  shop_name: z
    .string({
      invalid_type_error: cardFormErrors.requiredShopName,
    })
    .min(1, { message: cardFormErrors.requiredShopName })
    .max(validationLengths.shop_name, {
      message: cardFormErrors.requiredShopName,
    })
    .regex(/^[A-Za-zА-Яа-яЁё\s\d!@#$%^&*~`()_+-=[\]{};:'",.<>?/\\|]*$/, {
      message: cardFormErrors.wrongShopName,
    }),
  //NOTE: This one is not required, so it is nullable
  shop_group: z.nullable(
    z
      .string()
      .max(validationLengths.shop_group)
      .regex(/^[A-Za-zА-Яа-яЁё\s\d!@#$%^&*()_+-=[\]{};:'",.<>?/\\|]*$/, {
        message: cardFormErrors.wrongShopGroup,
      })
  ),
};
