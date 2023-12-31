import { FC } from 'react';
import { Stack } from '@mui/material';
import { AccentButton } from '~/shared/ui';
import {
  IBasicField,
  IPopupProps,
  Input,
  api,
  validationLengths,
  validationSchemes,
} from '~/shared';
import { ActivateEmailPopup } from '~/entities';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IApiError } from '~/shared/errors';
import { handleFormFieldsErrors } from '../errors';
import { useUser } from '~/shared/store/useUser';
import { useMessages } from '~/shared/store';
import { checkEmail } from '..';

interface IReactivateEmail extends IPopupProps {
  afterSubmit: () => void;
}

interface IFields extends IBasicField {
  email: string;
}

export const ReactivateEmail: FC<IReactivateEmail> = ({
  open,
  onClose,
  afterSubmit,
}) => {
  const setUser = useUser((state) => state.setUser);
  const user = useUser((state) => state.user);
  const addErrorMessage = useMessages((state) => state.addErrorMessage);
  const schema = z.object({
    email: validationSchemes.email,
  });

  const preValidateEmail = () => {
    const email = getValues('email');
    const { error, isDirty, invalid } = getFieldState('email');
    typeof email === 'string' &&
      (!invalid ||
        error?.message === 'Пользователь с таким email уже существует.') &&
      isDirty &&
      checkEmail(email).catch(
        (err) =>
          err?.detail?.email?.[0] ===
            'Пользователь с таким email уже существует.' &&
          setError('email', { type: 'exists', message: err.detail.email[0] })
      );
  };

  const {
    control,
    handleSubmit,
    setError,
    getValues,
    getFieldState,
    formState: { isSubmitting },
  } = useForm<IFields>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      email: user?.email || '',
    },
  });

  const handleError = (err: IApiError) => {
    const fields = Object.keys(getValues());
    if (err.status === 400 && err.detail && !err.detail.non_field_errors) {
      handleFormFieldsErrors(err, fields, setError);
    } else {
      addErrorMessage(
        err.detail?.non_field_errors?.join(' ') ||
          err.message ||
          'Ошибка сервера'
      );
    }
  };

  const onSubmit: SubmitHandler<IFields> = (data) => {
    const request = {
      email: typeof data.email === 'string' ? data.email : '',
    };
    const promise =
      request.email === user?.email
        ? api.reactivateEmail()
        : api.editUser(request).then((res) => setUser(res));
    promise
      .then(() => {
        afterSubmit();
      })
      .catch(handleError);
  };

  return (
    <ActivateEmailPopup open={open} onClose={onClose}>
      <Stack
        useFlexGap
        spacing={2}
        component="form"
        autoComplete="on"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          name="email"
          defaultHelperText=""
          control={control}
          hideAsterisk={true}
          label="Email"
          type="email"
          autoComplete="no"
          required={true}
          maxLength={validationLengths.email}
          preValidator={preValidateEmail}
          preValidate={true}
        />
        <AccentButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Подождите...' : 'Далее'}
        </AccentButton>
      </Stack>
    </ActivateEmailPopup>
  );
};
