import { FC, useContext } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Barcode from 'react-barcode';
import { Box, TextField, Button, Autocomplete, Card } from '@mui/material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { mockShopList, ShopListType } from '~/shared/mock';
import { cardFormErrors } from '~/shared/lib';
import { Input } from '~/shared/ui';
import {
  formStyle,
  helperTextStyle,
  listBoxStyle,
  buttonStyle,
  barcodeStyle,
} from './style';
import { AddCardFormModel } from './model';
import { CardsContext } from '~/app';
import { ICardContext } from '~/shared';

//NOTE: In case of clearing the field with the built in close-button, the value becomes NULL, so react-hook-form fires type error. That's why we use 'required' error text as invalid type eroor text in shopName field
const schema = z
  .object({
    shopName: z
      .string({
        required_error: cardFormErrors.required,
        invalid_type_error: cardFormErrors.required,
      })
      .max(30)
      .regex(/^[A-Za-zА-Яа-я0-9+.\-_,!@=\s]*$/, {
        message: cardFormErrors.wrongShopName,
      }),
    cardNumber: z
      .string({})
      .max(40, { message: cardFormErrors.wrongNumber })
      .regex(/^\d*$/, {
        message: cardFormErrors.wrongNumber,
      }),
    barcodeNumber: z
      .string({})
      .max(40, { message: cardFormErrors.wrongNumber })
      .regex(/^\d*$/, {
        message: cardFormErrors.wrongNumber,
      }),
  })
  .partial()
  .required({
    shopName: true,
  })
  .superRefine(({ barcodeNumber, cardNumber }, ctx) => {
    if (!barcodeNumber && !cardNumber) {
      ctx.addIssue({
        code: 'custom',
        message: cardFormErrors.requiredBarcodeOrNumber,
        path: ['cardNumber'],
      });
    }
  });

export interface AddCardFormType {
  shopList?: ShopListType[];
  buttonAddBarcode?: React.ComponentProps<typeof Button> & {
    label: string;
  };
  buttonSave?: React.ComponentProps<typeof Button> & {
    label: string;
  };
}

export const AddCardForm: FC<AddCardFormType> = ({
  buttonAddBarcode = {
    label: 'Добавить штрихкод',
    onClick: () => {},
  },
  buttonSave = {
    label: 'Сохранить',
    onClick: () => {},
  },
  shopList = mockShopList,
}) => {
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<{ [key: string]: string }>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
  });

  const { setCards, cards } = useContext(CardsContext);

  const onSubmit: SubmitHandler<{ [key: string]: string }> = (data) => {
    const shop = shopList.find((element) => element.name === data.shopName);
    if (shop !== undefined) {
      data = { ...data, shopId: shop.id.toString() };
      new AddCardFormModel(data)
        .createNewCard()
        .then((res) => {
          const newCard: ICardContext = {
            card: res,
            owner: true,
            favourite: false,
          };
          setCards && setCards([...cards, newCard]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      data = { ...data, shopId: '' };
    }
    navigate('../../authorizedWithCards', { relative: 'path' });
  };

  const onBarcodeDetect = () => {
    setValue('barcodeNumber', '123456789123', { shouldTouch: true });
    trigger(['barcodeNumber', 'cardNumber']);
  };

  return (
    <Box
      component="form"
      sx={formStyle}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="shopName"
        control={control}
        render={({
          field: { value, onChange, onBlur, ref },
          fieldState: { error },
        }) => (
          <Autocomplete
            onChange={(_event: unknown, item: string | null) => {
              onChange(item);
            }}
            freeSolo
            fullWidth
            autoSelect
            value={value || null}
            options={shopList.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Название магазина"
                error={Boolean(error)}
                helperText={error ? error.message : ' '}
                FormHelperTextProps={{ sx: helperTextStyle }}
                onBlur={onBlur}
                inputRef={ref}
              />
            )}
            ListboxProps={{ sx: listBoxStyle }}
          />
        )}
      />
      <Input
        name="cardNumber"
        label="Номер карты"
        type="text"
        autoComplete="no"
        defaultHelperText=" "
        placeholder=""
        register={register}
        errors={errors}
      />
      {watch('barcodeNumber') && (
        <Box sx={{ paddingBottom: '1.25rem' }}>
          <Card sx={{ ...barcodeStyle }} variant="outlined">
            <Barcode
              displayValue={false}
              margin={0}
              value={watch('barcodeNumber')}
              format={'EAN13'}
            />
          </Card>
        </Box>
      )}
      {watch('barcodeNumber') && (
        <Input
          name="barcodeNumber"
          label="Номер штрихкода"
          type="text"
          autoComplete="no"
          defaultHelperText=" "
          placeholder=""
          register={register}
          errors={errors}
        />
      )}
      {!watch('barcodeNumber') && (
        <Button
          variant="outlined"
          fullWidth
          sx={buttonStyle}
          {...buttonAddBarcode}
          onClick={onBarcodeDetect}
          endIcon={<CameraAltOutlinedIcon />}
        >
          {buttonAddBarcode.label}
        </Button>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        fullWidth
        sx={buttonStyle}
        {...buttonSave}
      >
        {buttonSave.label}
      </Button>
    </Box>
  );
};
