
import {EntityRepository,Repository} from 'typeorm';
import Movie from '../entities/Movie';


@EntityRepository(Movie)
class MoviesRepository extends Repository<Movie>{
    public async findByName(name: string): Promise<Customer | undefined>{
        const movie = await this.findOne({
            where: {
                name,
            },
        })
        return movie;
    }

    public async findById(id: string): Promise< Movie| undefined>{
        const movie = await this.findOne({
            where: {
                id,
            },
        });
        return movie;
    }
}

export default MoviesRepository;