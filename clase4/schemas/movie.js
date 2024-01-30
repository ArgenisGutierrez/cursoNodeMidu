import z from 'zod';
//Esquema de validaciones facil gracias a zod
const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid url'
  }),
  genre: z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Crime']).array()
});

export function validateMovie(object) {
  return movieSchema.safeParse(object);
};

export function partialValidation(object) {
  //partial hace que las opciones se vuelvan opcionales
  return movieSchema.partial().safeParse(object);
}

