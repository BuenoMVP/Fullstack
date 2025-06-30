import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../components/Header';
import Footer from '../components/Footer';

const validationSchema = Yup.object({
  titulo: Yup.string()
    .required('Título é obrigatório')
    .min(3, 'Título deve ter pelo menos 3 caracteres')
    .max(100, 'Título deve ter no máximo 100 caracteres'),
  data: Yup.string()
    .required('Data é obrigatória')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Data deve estar no formato DD/MM/YYYY'),
  link: Yup.string()
    .required('Link é obrigatório')
    .url('Link deve ser uma URL válida'),
  imagem: Yup.string()
    .required('URL da imagem é obrigatória')
    .url('URL da imagem deve ser válida'),
  descricao: Yup.string()
    .required('Descrição é obrigatória')
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres'),
  lingua: Yup.string()
    .required('Idioma é obrigatório')
    .oneOf(['pt', 'en'], 'Idioma deve ser português ou inglês')
});

const CreateNews = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = getToken();
      const url = import.meta.env.VITE_API_URL + '/api/news';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Notícia criada com sucesso!' });
        resetForm();
      } else {
        setMessage({ type: 'error', text: data.msg || 'Erro ao criar notícia' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/news');
  };

  return (
    <>
      <Header />
      <Box component="main" sx={{ flex: 1, py: 4 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                sx={{ mr: 2 }}
              >
                Voltar
              </Button>
              <Typography variant="h4" component="h1" sx={{ flex: 1 }}>
                Criar Nova Notícia
              </Typography>
            </Box>

            {message.text && (
              <Alert severity={message.type} sx={{ mb: 3 }}>
                {message.text}
              </Alert>
            )}

            <Formik
              initialValues={{
                titulo: '',
                data: '',
                link: '',
                imagem: '',
                descricao: '',
                lingua: ''
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched, values, setFieldValue }) => (
                <Form>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Field
                      name="titulo"
                      as={TextField}
                      label="Título"
                      fullWidth
                      error={touched.titulo && Boolean(errors.titulo)}
                      helperText={touched.titulo && errors.titulo}
                    />

                    <Field
                      name="data"
                      as={TextField}
                      label="Data (DD/MM/YYYY)"
                      fullWidth
                      placeholder="DD/MM/YYYY"
                      error={touched.data && Boolean(errors.data)}
                      helperText={touched.data && errors.data}
                    />

                    <FormControl fullWidth error={touched.lingua && Boolean(errors.lingua)}>
                      <InputLabel>Idioma</InputLabel>
                      <Select
                        name="lingua"
                        value={values.lingua}
                        label="Idioma"
                        onChange={(e) => setFieldValue('lingua', e.target.value)}
                      >
                        <MenuItem value="pt">Português</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                      </Select>
                      {touched.lingua && errors.lingua && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                          {errors.lingua}
                        </Typography>
                      )}
                    </FormControl>

                    <Field
                      name="link"
                      as={TextField}
                      label="Link da Notícia"
                      fullWidth
                      error={touched.link && Boolean(errors.link)}
                      helperText={touched.link && errors.link}
                    />

                    <Field
                      name="imagem"
                      as={TextField}
                      label="URL da Imagem"
                      fullWidth
                      error={touched.imagem && Boolean(errors.imagem)}
                      helperText={touched.imagem && errors.imagem}
                    />

                    <Field
                      name="descricao"
                      as={TextField}
                      label="Descrição"
                      multiline
                      rows={4}
                      fullWidth
                      error={touched.descricao && Boolean(errors.descricao)}
                      helperText={touched.descricao && errors.descricao}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading || isSubmitting}
                      sx={{ mt: 2 }}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Criar Notícia'
                      )}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default CreateNews; 