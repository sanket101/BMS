const Joi = require("joi");

const movieValidationSchema = Joi.object({
    title: Joi.string().min(1).max(100).required()
      .messages({
        'string.base': 'Title must be a string.',
        'string.min': 'Title must be at least 1 characters long.',
        'string.max': 'Title cannot exceed 100 characters.',
        'any.required': 'Title is required.',
      }),
    description: Joi.string().min(20).max(500).required()
      .messages({
        'string.base': 'Description must be a string.',
        'string.min': 'Description must be at least 20 characters long.',
        'string.max': 'Description cannot exceed 500 characters.',
        'any.required': 'Description is required.',
      }),
    duration: Joi.number().required()
      .messages({
        'number.base': 'Duration must be a number',
        'any.required': 'Duration is required',
      }),
    genre: Joi.string().alphanum().min(3).max(30).required()
      .messages({
        'string.base': 'Genre must be a string.',
        'string.alphanum': 'Genre can only contain letters.',
        'string.min': 'Genre must be at least 3 characters long.',
        'string.max': 'Genre cannot exceed 30 characters.',
        'any.required': 'Genre is required.',
      }),
    language: Joi.string().alphanum().min(3).max(30).required()
      .messages({
        'string.base': 'Language must be a string.',
        'string.alphanum': 'Language can only contain letters.',
        'string.min': 'Language must be at least 3 characters long.',
        'string.max': 'Language cannot exceed 30 characters.',
        'any.required': 'Language is required.',
      }),
    releaseDate: Joi.date().greater("now").required()
      .messages({
        'date.base': 'Release date must be in date format',
        'date.greater': 'Release date must be greater than today',
        'any.required': 'Release date is required',
      }),
    poster: Joi.string().required()
      .messages({
        'string.base': 'Poster must be in string',
        'any.required': 'Poster is required',
    }),
    userId: Joi.optional()
});

const updateMovieSchema = movieValidationSchema.fork(Object.keys(movieValidationSchema.describe().keys), (field) => field.optional());

module.exports = { movieValidationSchema, updateMovieSchema };