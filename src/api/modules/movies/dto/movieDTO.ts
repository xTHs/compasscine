import SessionDTO from '../../sessions/dto/SessionDTO';
import Movie from '../typeorm/entities/Movie';

export default class movieDTO {
  id: number;
  name: string;
  description: string;
  actors: string[];
  genre: string;
  release_date: Date;
  sessions: SessionDTO[];

  constructor(movie: Movie) {
    this.id = movie.id;
    this.name = movie.name;
    this.description = movie.description;
    this.genre = movie.genre;
    this.release_date = movie.release_date;
    this.sessions = SessionDTO.convertSessionInSessionDTO(movie.sessions);
  }
}


