import {
  IconButton,
  InputAdornment,
  Alert,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { ButtonSubmit, InputWrapper, StyledForm } from './LoginForm.styled';
import { useFormik } from 'formik';
import { validationSchemaLogin } from 'helpers/validation/schemas';
import authOperations from '../../redux/auth/auth-operations';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      const res = await dispatch(authOperations.logIn(values));
      setIsLoading(false);
      if (res.error) {
        setIsError(true);
        return;
      }
      resetForm();
    },
  });

  return (
    <StyledForm autoComplete="off" onSubmit={formik.handleSubmit}>
      <p>Enter your email address and password.</p>
      {isError && (
        <Alert variant="outlined" severity="error">
          No user found for this email/password
        </Alert>
      )}

      <InputWrapper
        error={formik.touched.email && Boolean(formik.errors.email)}
        variant="outlined"
      >
        <InputLabel htmlFor="email">Email</InputLabel>
        <OutlinedInput
          id="email"
          name="email"
          label="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />

        <FormHelperText id="email">
          {formik.touched.email && formik.errors.email}
        </FormHelperText>
      </InputWrapper>

      <InputWrapper
        error={formik.touched.password && Boolean(formik.errors.password)}
        variant="outlined"
      >
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <FormHelperText id="password">
          {formik.touched.password && formik.errors.password}
        </FormHelperText>
      </InputWrapper>
      <ButtonSubmit
        disabled={isLoading}
        sx={{ mt: 2 }}
        type="submit"
        variant="contained"
      >
        Log in
      </ButtonSubmit>
    </StyledForm>
  );
};

export default LoginForm;
