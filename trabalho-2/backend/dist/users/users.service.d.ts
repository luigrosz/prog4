import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findByUsername(username: string): Promise<User | null>;
    create(username: string, hashedPassword: string): Promise<User>;
}
