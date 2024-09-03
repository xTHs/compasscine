export default class MoviesController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { image, name, description, actors, genre, release_date, sessions } =
      request.body;
    const { id } = request.params;

    const updateMovie = new UpdateMovieService();

    const movie = await updateMovie.execute({
      id,
      image,
      name,
      description,
      actors,
      genre,
      release_date,
      sessions,
    });

    return response.json(movie);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteMovie = new DeleteMovieService();
    await deleteMovie.execute({ id });

    //confirmar resposta com o time
    return response.status(204).send();
  }
}
