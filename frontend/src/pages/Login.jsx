import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Container,
  CardMedia,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../logo.svg";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  senha: Yup.string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setError("");

    const result = await login(values.email, values.senha);

    if (result.success) {
      navigate("/news");
    } else {
      setError(result.error);
      resetForm();
    }

    setSubmitting(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              height: "56px",
              width: "auto",
              objectFit: "contain",
              margin: '0 auto 24px'
            }}
            image={Logo}
            alt="UTFPR Logo"
          />
          <Typography
            variant="h4"
            component="h1"
            fontWeight={700}
            gutterBottom
            align="center"
          >
            Login
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Faça login para acessar as notícias
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Formik
            initialValues={{ email: "", senha: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              handleChange,
              handleBlur,
            }) => (
              <Form>
                <Field name="email">
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      type="email"
                      margin="normal"
                      variant="outlined"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  )}
                </Field>

                <Field name="senha">
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Senha"
                      type="password"
                      margin="normal"
                      variant="outlined"
                      error={touched.senha && Boolean(errors.senha)}
                      helperText={touched.senha && errors.senha}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.senha}
                    />
                  )}
                </Field>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
