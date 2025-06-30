import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { LanguageContext } from '../contexts/LanguageContext';
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

const content = {
  back: { en: "Back", pt: "Voltar" },
  createNews: { en: "Create News", pt: "Criar Nova Notícia" },
  title: { en: "Title", pt: "Título" },
  date: { en: "Date (DD/MM/YYYY)", pt: "Data (DD/MM/YYYY)" },
  language: { en: "Language", pt: "Idioma" },
  portuguese: { en: "Portuguese", pt: "Português" },
  english: { en: "English", pt: "English" },
  newsLink: { en: "News Link", pt: "Link da Notícia" },
  imageUrl: { en: "Image URL", pt: "URL da Imagem" },
  description: { en: "Description", pt: "Descrição" },
  createButton: { en: "Create News", pt: "Criar Notícia" },
  successMessage: { en: "News created successfully!", pt: "Notícia criada com sucesso!" },
  errorMessage: { en: "Error creating news", pt: "Erro ao criar notícia" },
  connectionError: { en: "Connection error. Try again.", pt: "Erro de conexão. Tente novamente." },
  titleRequired: { en: "Title is required", pt: "Título é obrigatório" },
  titleMin: { en: "Title must have at least 3 characters", pt: "Título deve ter pelo menos 3 caracteres" },
  titleMax: { en: "Title must have at most 100 characters", pt: "Título deve ter no máximo 100 caracteres" },
  dateRequired: { en: "Date is required", pt: "Data é obrigatória" },
  dateFormat: { en: "Date must be in DD/MM/YYYY format", pt: "Data deve estar no formato DD/MM/YYYY" },
  linkRequired: { en: "Link is required", pt: "Link é obrigatório" },
  linkValid: { en: "Link must be a valid URL", pt: "Link deve ser uma URL válida" },
  imageRequired: { en: "Image URL is required", pt: "URL da imagem é obrigatória" },
  imageValid: { en: "Image URL must be valid", pt: "URL da imagem deve ser válida" },
  descriptionRequired: { en: "Description is required", pt: "Descrição é obrigatória" },
  descriptionMin: { en: "Description must have at least 10 characters", pt: "Descrição deve ter pelo menos 10 caracteres" },
  descriptionMax: { en: "Description must have at most 500 characters", pt: "Descrição deve ter no máximo 500 caracteres" },
  languageRequired: { en: "Language is required", pt: "Idioma é obrigatório" },
  languageValid: { en: "Language must be Portuguese or English", pt: "Idioma deve ser português ou inglês" },
};

const CreateNews = () => {
  const { language } = useContext(LanguageContext);
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const validationSchema = Yup.object({
    titulo: Yup.string()
      .required(content.titleRequired[language])
      .min(3, content.titleMin[language])
      .max(100, content.titleMax[language]),
    data: Yup.string()
      .required(content.dateRequired[language])
      .matches(/^\d{2}\/\d{2}\/\d{4}$/, content.dateFormat[language]),
    link: Yup.string()
      .required(content.linkRequired[language])
      .url(content.linkValid[language]),
    imagem: Yup.string()
      .required(content.imageRequired[language])
      .url(content.imageValid[language]),
    descricao: Yup.string()
      .required(content.descriptionRequired[language])
      .min(10, content.descriptionMin[language])
      .max(500, content.descriptionMax[language]),
    lingua: Yup.string()
      .required(content.languageRequired[language])
      .oneOf(['pt', 'en'], content.languageValid[language])
  });

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
        setMessage({ type: 'success', text: content.successMessage[language] });
        resetForm();
      } else {
        setMessage({ type: 'error', text: data.msg || content.errorMessage[language] });
      }
    } catch (error) {
      setMessage({ type: 'error', text: content.connectionError[language] });
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
                {content.back[language]}
              </Button>
              <Typography variant="h4" component="h1" sx={{ flex: 1 }}>
                {content.createNews[language]}
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
                      label={content.title[language]}
                      fullWidth
                      error={touched.titulo && Boolean(errors.titulo)}
                      helperText={touched.titulo && errors.titulo}
                    />

                    <Field
                      name="data"
                      as={TextField}
                      label={content.date[language]}
                      fullWidth
                      placeholder="DD/MM/YYYY"
                      error={touched.data && Boolean(errors.data)}
                      helperText={touched.data && errors.data}
                    />

                    <FormControl fullWidth error={touched.lingua && Boolean(errors.lingua)}>
                      <InputLabel>{content.language[language]}</InputLabel>
                      <Select
                        name="lingua"
                        value={values.lingua}
                        label={content.language[language]}
                        onChange={(e) => setFieldValue('lingua', e.target.value)}
                      >
                        <MenuItem value="pt">{content.portuguese[language]}</MenuItem>
                        <MenuItem value="en">{content.english[language]}</MenuItem>
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
                      label={content.newsLink[language]}
                      fullWidth
                      error={touched.link && Boolean(errors.link)}
                      helperText={touched.link && errors.link}
                    />

                    <Field
                      name="imagem"
                      as={TextField}
                      label={content.imageUrl[language]}
                      fullWidth
                      error={touched.imagem && Boolean(errors.imagem)}
                      helperText={touched.imagem && errors.imagem}
                    />

                    <Field
                      name="descricao"
                      as={TextField}
                      label={content.description[language]}
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
                        content.createButton[language]
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